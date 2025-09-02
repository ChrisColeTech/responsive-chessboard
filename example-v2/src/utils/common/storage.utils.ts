// localStorage utilities with error handling

export const getStorageItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Failed to get item from localStorage: ${key}`, error);
    return defaultValue;
  }
};

export const setStorageItem = <T>(key: string, value: T): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Failed to set item in localStorage: ${key}`, error);
    return false;
  }
};

export const removeStorageItem = (key: string): boolean => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`Failed to remove item from localStorage: ${key}`, error);
    return false;
  }
};

export const clearStorage = (): boolean => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.warn('Failed to clear localStorage', error);
    return false;
  }
};

export const getStorageKeys = (): string[] => {
  try {
    return Object.keys(localStorage);
  } catch (error) {
    console.warn('Failed to get localStorage keys', error);
    return [];
  }
};

export const isStorageAvailable = (): boolean => {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, 'test');
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

// Specific storage utilities for demo app
export const getDemoPreferences = () => {
  return getStorageItem('demoPreferences', {
    theme: 'classic',
    pieceSet: 'classic',
    showCoordinates: true,
    animationsEnabled: true,
  });
};

export const setDemoPreferences = (preferences: any): boolean => {
  return setStorageItem('demoPreferences', preferences);
};

export const getAuthTokens = () => {
  return {
    token: getStorageItem('token', null),
    refreshToken: getStorageItem('refreshToken', null),
  };
};

export const setAuthTokens = (token: string, refreshToken: string): boolean => {
  const tokenSet = setStorageItem('token', token);
  const refreshTokenSet = setStorageItem('refreshToken', refreshToken);
  return tokenSet && refreshTokenSet;
};

export const clearAuthTokens = (): boolean => {
  const tokenRemoved = removeStorageItem('token');
  const refreshTokenRemoved = removeStorageItem('refreshToken');
  return tokenRemoved && refreshTokenRemoved;
};