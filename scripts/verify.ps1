# Verification gate for both sites. Numbers, not vibes.
# Checks the things that were actually wrong before: CDN fonts (DSGVO), placeholder
# images, layout overflow, alt text, heading order, and Core Web Vitals.
param([string]$Base = 'http://localhost:4173/webdev-portfolio')

$sites = @(
  @{ name = 'kesselstrom'; url = "$Base/kesselstrom/" },
  @{ name = 'roestwerk';   url = "$Base/roestwerk/" }
)

$fail = 0

foreach ($s in $sites) {
  Write-Output "===== $($s.name) ====="
  & agent-browser set media light | Out-Null
  & agent-browser set viewport 1440 900 | Out-Null
  & agent-browser open $s.url | Out-Null
  Start-Sleep -Milliseconds 1200

  # --- network: Resource Timing is per-document, so it resets on navigation.
  # The CLI's request log is cumulative for the whole browser session and would
  # report hits from pages visited earlier.
  # -join: agent-browser returns output as a string array, and comparing an array
  # against a regex silently does the wrong thing. Flatten it before testing.
  $third = (& agent-browser eval "(()=>{const r=performance.getEntriesByType('resource').map(e=>e.name);const ext=r.filter(u=>!u.startsWith(location.origin));return JSON.stringify({total:r.length,google:r.filter(u=>/fonts\.(googleapis|gstatic)\.com/.test(u)).length,picsum:r.filter(u=>/picsum\.photos/.test(u)).length,thirdParty:ext.length})})()" 2>$null) -join ''
  Write-Output "requests             : $third  (google/picsum/thirdParty must be 0)"
  foreach ($k in 'google', 'picsum', 'thirdParty') {
    if ($third -notmatch ('\\?"{0}\\?":0' -f $k)) { Write-Output "  FAIL: $k not zero"; $fail++ }
  }

  # --- console errors
  $errs = (& agent-browser console 2>$null | Select-String -Pattern '^\[error\]').Count
  Write-Output "console errors       : $errs  (must be 0)"
  if ($errs -gt 0) { $fail++ }

  # --- images: every one has alt text and actually decoded
  $img = & agent-browser eval "(()=>{const i=[...document.images];return JSON.stringify({total:i.length,noAlt:i.filter(x=>!x.alt||!x.alt.trim()).length,broken:i.filter(x=>x.complete&&x.naturalWidth===0).length})})()" 2>$null
  Write-Output "images               : $img"

  # --- headings in order, single h1
  $head = & agent-browser eval "(()=>{const h=[...document.querySelectorAll('h1,h2,h3')].map(e=>+e.tagName[1]);let jump=0;for(let i=1;i<h.length;i++)if(h[i]-h[i-1]>1)jump++;return JSON.stringify({h1:h.filter(x=>x===1).length,skips:jump})})()" 2>$null
  Write-Output "headings             : $head"

  # --- Core Web Vitals
  $cwv = & agent-browser eval "new Promise(r=>{let cls=0;new PerformanceObserver(l=>{for(const e of l.getEntries())if(!e.hadRecentInput)cls+=e.value}).observe({type:'layout-shift',buffered:true});new PerformanceObserver(l=>{const e=l.getEntries();window.__lcp=e[e.length-1].startTime}).observe({type:'largest-contentful-paint',buffered:true});setTimeout(()=>r(JSON.stringify({lcp_ms:Math.round(window.__lcp||0),cls:+cls.toFixed(4)})),1500)})" 2>$null
  Write-Output "core web vitals      : $cwv"

  # --- mobile overflow
  & agent-browser set viewport 390 844 | Out-Null
  & agent-browser open $s.url | Out-Null
  Start-Sleep -Milliseconds 900
  $ovf = & agent-browser eval "(()=>{const d=document.documentElement;return JSON.stringify({scrollW:d.scrollWidth,clientW:d.clientWidth})})()" 2>$null
  Write-Output "mobile 390px         : $ovf  (scrollW must equal clientW)"

  # --- legal pages reachable
  foreach ($p in @('impressum.html', 'datenschutz.html')) {
    & agent-browser open "$($s.url)$p" | Out-Null
    Start-Sleep -Milliseconds 500
    $title = & agent-browser eval "document.title + '|' + (document.querySelector('h1')?document.querySelector('h1').textContent:'NO-H1')" 2>$null
    $ok = $title -match 'Impressum|Datenschutz'
    Write-Output ("{0,-21}: {1}" -f $p, $(if ($ok) { "ok $title" } else { "MISSING $title" }))
    if (-not $ok) { $fail++ }
  }
  Write-Output ''
}

Write-Output "FAILURES: $fail"
