# Full-page capture that actually triggers scroll-reveals.
# whileInView needs the element to genuinely enter the viewport, so we scroll the
# whole page first; a bare --full screenshot leaves every revealed section at opacity 0.
param(
  [Parameter(Mandatory = $true)][string]$Url,
  [Parameter(Mandatory = $true)][string]$Out,
  [string]$Mode = 'light',
  [int]$Width = 1440,
  [int]$Height = 900,
  [switch]$FoldOnly
)

& agent-browser set media $Mode | Out-Null
& agent-browser set viewport $Width $Height | Out-Null
& agent-browser open $Url | Out-Null
Start-Sleep -Milliseconds 900

if (-not $FoldOnly) {
  1..10 | ForEach-Object {
    & agent-browser scroll down 800 | Out-Null
    Start-Sleep -Milliseconds 300
  }
  & agent-browser scroll up 12000 | Out-Null
  Start-Sleep -Milliseconds 600
  & agent-browser screenshot $Out --full | Out-Null
}
else {
  & agent-browser screenshot $Out | Out-Null
}

if (Test-Path $Out) { "saved $Out ($([math]::Round((Get-Item $Out).Length/1kb)) kB)" }
else { "FAILED $Out" }
