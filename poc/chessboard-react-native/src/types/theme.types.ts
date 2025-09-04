// Theme types for React Native app
export type ThemeId = 'light' | 'dark' | 'auto' | 'chess' | 'gaming' | 'minimal' | 'default' | 'chess-light' | 'gaming-light' | 'minimal-light'
export type BaseTheme = 'chess' | 'gaming' | 'minimal' | 'default'

export interface Theme {
  id: ThemeId
  name: string
  colors: {
    primary: string
    secondary: string
    background: string
    surface: string
    text: string
    accent: string
  }
}

export interface ThemeSettings {
  currentTheme: ThemeId
  baseTheme: BaseTheme
  isDarkMode: boolean
}