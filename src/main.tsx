import React from 'react'
import ReactDOM from 'react-dom/client'
import posthog from 'posthog-js'
import App from './App'
import PostHogErrorBoundary from './components/PostHogErrorBoundary'
import './index.css'

const posthogKey = import.meta.env.VITE_POSTHOG_KEY?.trim()
const posthogHost = import.meta.env.VITE_POSTHOG_HOST?.trim()

if (!posthogKey || !posthogHost) {
  if (import.meta.env.DEV) {
    const missingVariable = posthogKey ? 'VITE_POSTHOG_HOST' : 'VITE_POSTHOG_KEY'
    throw new Error(
      `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`,
    )
  }
} else {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    defaults: '2026-05-30',
    capture_exceptions: true,
  })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PostHogErrorBoundary>
      <App />
    </PostHogErrorBoundary>
  </React.StrictMode>,
)
