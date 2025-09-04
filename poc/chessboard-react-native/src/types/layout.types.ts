// Layout types for React Native app
export type TabId = 'worker' | 'drag' | 'slots' | 'layout'

export interface LayoutSettings {
  selectedTab: TabId
  showInstructions: boolean
}