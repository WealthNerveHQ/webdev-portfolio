import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './theme.css'
import Site from '@/gen/Site'
import business from '../../../businesses/apex-roofing.json'
import type { Business } from '@/gen/types'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Site b={business as Business} />
  </StrictMode>,
)
