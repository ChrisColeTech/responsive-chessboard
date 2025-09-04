import AsyncStorage from '@react-native-async-storage/async-storage'

// Persistence utilities for React Native AsyncStorage
export class PersistenceStore {
  private static readonly PREFIX = 'chess-app-'

  static async get<T>(key: string, defaultValue: T): Promise<T> {
    try {
      const stored = await AsyncStorage.getItem(this.PREFIX + key)
      return stored ? JSON.parse(stored) : defaultValue
    } catch {
      return defaultValue
    }
  }

  static async set<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(this.PREFIX + key, JSON.stringify(value))
    } catch {
      // Silently fail if AsyncStorage is not available
    }
  }

  static async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.PREFIX + key)
    } catch {
      // Silently fail if AsyncStorage is not available
    }
  }

  static async clear(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys()
      const filteredKeys = keys.filter(key => key.startsWith(this.PREFIX))
      await AsyncStorage.multiRemove(filteredKeys)
    } catch {
      // Silently fail if AsyncStorage is not available
    }
  }
}

// Convenience functions for common persistence patterns
export const persist = {
  theme: async (themeId: string) => await PersistenceStore.set('theme', themeId),
  getTheme: async (defaultTheme: string) => await PersistenceStore.get('theme', defaultTheme),
  
  tab: async (tabId: string) => await PersistenceStore.set('selected-tab', tabId),
  getTab: async (defaultTab: string) => await PersistenceStore.get('selected-tab', defaultTab),
  
  settings: async (settings: Record<string, any>) => await PersistenceStore.set('settings', settings),
  getSettings: async (defaultSettings: Record<string, any>) => await PersistenceStore.get('settings', defaultSettings),
}