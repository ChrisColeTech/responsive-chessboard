/// <reference types="vite/client" />

// Extend CSS Properties for WebKit-specific properties
declare module 'react' {
  interface CSSProperties {
    WebkitAppRegion?: 'drag' | 'no-drag';
  }
}
