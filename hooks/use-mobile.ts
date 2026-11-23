import * as React from "react"

const MOBILE_BREAKPOINT = 768

// Subscription kept outside render so the store is stable across calls —
// useSyncExternalStore needs a consistent snapshot or it re-renders in a loop.
const subscribe = (onChange: () => void) => {
  const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
  mql.addEventListener("change", onChange)
  return () => mql.removeEventListener("change", onChange)
}

const getSnapshot = () => window.innerWidth < MOBILE_BREAKPOINT

// SSR has no window: report the desktop layout, the client corrects it on
// hydration. Avoids setState() inside an effect (react-hooks/set-state-in-effect).
const getServerSnapshot = () => false

export function useIsMobile() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
