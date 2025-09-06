# Navigation & Action Sheets Architecture

## Overview

This document provides a comprehensive guide to the application's navigation system, tab management, action sheet configuration, and child page integration. The architecture uses Zustand for state management, HeadlessUI for components, and a clean hook-based pattern for page context.

## Table of Contents

1. [Navigation Stack Overview](#navigation-stack-overview)
2. [Tab System Architecture](#tab-system-architecture)  
3. [Action Sheet System](#action-sheet-system)
4. [Child Page Navigation](#child-page-navigation)
5. [Store Integration](#store-integration)
6. [Hook Patterns](#hook-patterns)
7. [Configuration Guide](#configuration-guide)
8. [Best Practices](#best-practices)

## Navigation Stack Overview

The application uses a multi-layer navigation system:

```
┌─────────────────────────────────────────┐
│                App Layout               │
├─────────────────────────────────────────┤
│              Tab Navigation             │
├─────────────────────────────────────────┤
│              Page Content               │
│  ┌───────────────────────────────────┐  │
│  │         Child Pages               │  │
│  │    (dragtest, uiaudiotest)        │  │
│  └───────────────────────────────────┘  │
├─────────────────────────────────────────┤
│             Action Sheets               │
└─────────────────────────────────────────┘
```

### Key Components

- **App Store** (`appStore.ts`) - Central state management with Zustand
- **Tab Bar** (`TabBar.tsx`) - Main navigation interface
- **Action Sheets** (`ActionSheetContainer.tsx`) - Context-sensitive actions
- **Page Instructions** (`usePageInstructions.ts`) - Automated instruction loading
- **Child Page Navigation** - Store-integrated sub-page system

## Tab System Architecture

### Tab Configuration

Tabs are defined in `src/components/layout/types.ts`:

```typescript
export type TabId = 'layout' | 'worker' | 'uitests' | 'slots' | 'play' | 'splash'
```

### Tab Flow

```
User Click → TabBar → onTabChange → setSelectedTab (store) → App re-renders
```

**Code Path:**
1. `TabBar.tsx` - User clicks tab button
2. `onTabChange(tab.id)` - Callback to App.tsx
3. `setSelectedTab()` - Updates Zustand store
4. `App.tsx` - Re-renders with new selectedTab
5. Page routing renders appropriate component

### Tab State Management

```typescript
// Store state
interface AppState {
  selectedTab: TabId
  currentChildPage: string | null
}

// Usage in components
const selectedTab = useSelectedTab()
const setSelectedTab = useAppStore((state) => state.setSelectedTab)
```

## Action Sheet System

### Architecture Overview

Action sheets provide context-sensitive actions for each page using HeadlessUI Dialog components.

```
┌──────────────────┐    ┌─────────────────┐    ┌──────────────────┐
│   Page Actions   │───▶│  Action Sheet   │───▶│   HeadlessUI     │
│   Constants      │    │   Container     │    │    Dialog        │
└──────────────────┘    └─────────────────┘    └──────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌──────────────────┐    ┌─────────────────┐    ┌──────────────────┐
│   useXActions    │    │  Action Mapping │    │  User Interface  │
│     Hooks        │    │   & Execution   │    │                  │
└──────────────────┘    └─────────────────┘    └──────────────────┘
```

### Action Configuration

Actions are defined in `src/constants/actions/page-actions.constants.ts`:

```typescript
export const PAGE_ACTIONS: Record<string, ActionSheetAction[]> = {
  uitests: [
    {
      id: 'run-ui-tests',
      label: 'Run UI Tests',
      icon: TestTube,
      variant: 'default'
    },
    {
      id: 'go-to-drag-test',
      label: 'Go to Drag Test',
      icon: Navigation,
      variant: 'secondary'
    }
  ]
}
```

### Action Handler Mapping

```typescript
// ActionSheetContainer.tsx
const actionMap: Record<string, Record<string, Fn>> = {
  uitests: {
    'run-ui-tests': uiTestsActions.runUITests,
    'go-to-drag-test': uiTestsActions.goToDragTest,
  }
}
```

### Page Context Resolution

```typescript
// Determine which actions to show
const currentChildPage = useAppStore((state) => state.currentChildPage)
const actionSheetPage = currentChildPage || currentPage

// Show actions for child page or main tab
const actions = PAGE_ACTIONS[actionSheetPage] || []
```

## Child Page Navigation

### Problem Solved

Traditional tab-based navigation doesn't support hierarchical pages. Our solution enables:

- Navigate to child pages without changing tabs
- Child pages have their own instructions and actions
- Proper back navigation to parent page
- State persistence across app reloads

### Implementation

#### 1. Store State

```typescript
interface AppState {
  selectedTab: TabId          // Main tab (uitests, worker, etc.)
  currentChildPage: string | null  // Child page (dragtest, uiaudiotest)
}
```

#### 2. Navigation Actions

```typescript
// Navigate to child page
const goToDragTest = useCallback(() => {
  setCurrentChildPage('dragtest')
  playMove(false)
}, [setCurrentChildPage, playMove])

// Return to main page
const backToMain = useCallback(() => {
  setCurrentChildPage(null)
}, [setCurrentChildPage])
```

#### 3. Page Rendering

```typescript
// UITestPage.tsx
const currentChildPage = useAppStore((state) => state.currentChildPage)

let CurrentPageComponent = UITestsMainPage

if (currentChildPage === 'dragtest') {
  CurrentPageComponent = DragTestPageWrapper
} else if (currentChildPage === 'uiaudiotest') {
  CurrentPageComponent = UIAudioTestPageWrapper
}

return <CurrentPageComponent />
```

#### 4. Context Switching

Child pages automatically load their own instructions and actions:

```typescript
// DragTestPageWrapper.tsx
export const DragTestPageWrapper: React.FC = () => {
  usePageInstructions('dragtest')  // Loads dragtest instructions
  usePageActions('dragtest')       // Loads dragtest actions
  
  return <DragTestPage />
}
```

### Navigation Flow

```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│ UI Tests    │───▶│ Action Sheet │───▶│ Child Page  │
│ Main Page   │    │ "Go to Drag" │    │ (dragtest)  │
└─────────────┘    └──────────────┘    └─────────────┘
       ▲                                       │
       │            ┌──────────────┐          │
       └────────────│ Click Tab    │◀─────────┘
                    │ "UI Tests"   │
                    └──────────────┘
```

## Store Integration

### Zustand Configuration

```typescript
export const useAppStore = create<AppStore>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        // Navigation state
        selectedTab: 'layout',
        currentChildPage: null,
        
        // Actions
        setSelectedTab: (tab) => set({ selectedTab: tab }),
        setCurrentChildPage: (childPage) => set({ currentChildPage: childPage }),
      }),
      {
        name: 'chess-app-store',
        partialize: (state) => ({
          selectedTab: state.selectedTab,
          currentChildPage: state.currentChildPage, // Persisted!
          // ... other state
        })
      }
    )
  )
)
```

### Persistence Benefits

- **App reloads**: Child page state survives refresh
- **Browser navigation**: Back/forward works correctly  
- **Session continuity**: User returns to same child page
- **Development**: Hot reload preserves navigation state

## Hook Patterns

### usePageInstructions

Automatically loads page-specific instructions:

```typescript
export const usePageInstructions = (pageId: string) => {
  const { setInstructions } = useInstructions()

  useEffect(() => {
    const pageInstructions = instructionsService.getInstructions(pageId)
    if (pageInstructions) {
      setInstructions(pageInstructions.title, [...pageInstructions.instructions])
    }
  }, [pageId, setInstructions])
}
```

### usePageActions

Sets page context for action sheets:

```typescript
export const usePageActions = (pageId: string) => {
  const setCurrentChildPage = useAppStore((state) => state.setCurrentChildPage)
  
  useEffect(() => {
    setCurrentChildPage(pageId)
    
    return () => {
      setCurrentChildPage(null) // Cleanup on unmount
    }
  }, [pageId, setCurrentChildPage])
}
```

### Wrapper Component Pattern

Child pages use wrapper components for context:

```typescript
export const DragTestPageWrapper: React.FC = () => {
  usePageInstructions('dragtest')  // Instructions context
  usePageActions('dragtest')       // Actions context
  
  return <DragTestPage />          // Actual page content
}
```

## Configuration Guide

### Adding a New Tab

1. **Update types:**
```typescript
// src/components/layout/types.ts
export type TabId = 'layout' | 'worker' | 'uitests' | 'slots' | 'play' | 'splash' | 'newtab'
```

2. **Add tab configuration:**
```typescript
// src/components/layout/TabBar.tsx
const tabs: Tab[] = [
  // existing tabs...
  {
    id: "newtab",
    label: "New Tab",
    icon: YourIcon,
    description: "Description",
  }
]
```

3. **Add routing:**
```typescript
// src/App.tsx
{selectedTab === 'newtab' && <NewTabPage />}
```

4. **Add actions:**
```typescript
// src/constants/actions/page-actions.constants.ts
export const PAGE_ACTIONS: Record<string, ActionSheetAction[]> = {
  newtab: [
    {
      id: 'new-action',
      label: 'New Action',
      icon: ActionIcon,
      variant: 'default'
    }
  ]
}
```

### Adding a Child Page

1. **Create page wrapper:**
```typescript
// src/components/ChildPageWrapper.tsx
export const ChildPageWrapper: React.FC = () => {
  usePageInstructions('childpage')
  usePageActions('childpage')
  
  return <ChildPage />
}
```

2. **Add navigation action:**
```typescript
// Parent page actions hook
const goToChildPage = useCallback(() => {
  setCurrentChildPage('childpage')
  playMove(false)
}, [setCurrentChildPage, playMove])
```

3. **Update parent page rendering:**
```typescript
// Parent page component
if (currentChildPage === 'childpage') {
  CurrentPageComponent = ChildPageWrapper
}
```

4. **Add child page actions:**
```typescript
// src/constants/actions/page-actions.constants.ts
export const PAGE_ACTIONS: Record<string, ActionSheetAction[]> = {
  childpage: [
    {
      id: 'child-action',
      label: 'Child Action',
      icon: ChildIcon,
      variant: 'default'
    }
  ]
}
```

### Adding Instructions

1. **Create instruction file:**
```typescript
// src/services/instructions/pages/newpage.instructions.ts
export const newpageInstructions: InstructionsConfig = {
  title: "New Page Instructions",
  instructions: [
    "Step 1: Do something",
    "Step 2: Do something else",
  ]
}
```

2. **Register instructions:**
```typescript
// src/services/instructions/InstructionsService.ts
const instructionsMap: Record<string, InstructionsConfig> = {
  newpage: newpageInstructions,
  // ... existing instructions
}
```

## Best Practices

### State Management

1. **Always use the store** - Never bypass with global variables
2. **Clean up effects** - Clear state on component unmount
3. **Persist navigation state** - Include in store persistence
4. **Use type-safe actions** - Leverage TypeScript for action IDs

### Component Architecture

1. **Wrapper pattern** - Use wrappers for child pages
2. **Single responsibility** - Each hook has one purpose
3. **Consistent naming** - Follow established patterns
4. **Clean imports** - Import only what you need

### Navigation UX

1. **Clear context** - Users should know where they are
2. **Easy back navigation** - Tab click returns to main
3. **Persistent state** - Don't lose user's place
4. **Audio feedback** - Provide sound feedback for actions

### Action Design

1. **Contextual actions** - Show relevant actions for current page
2. **Clear labeling** - Action labels should be descriptive
3. **Consistent icons** - Use appropriate Lucide icons
4. **Proper variants** - Use semantic button variants

## Debugging Tips

### Common Issues

1. **Actions not showing**: Check PAGE_ACTIONS configuration
2. **Wrong instructions**: Verify pageId in usePageInstructions
3. **State not persisting**: Ensure store partialize includes your state
4. **Child pages not rendering**: Check currentChildPage logic

### Debug Tools

1. **React DevTools** - Inspect Zustand store state
2. **Console logs** - Already in place for navigation events
3. **Store subscriptions** - Monitor state changes
4. **Component keys** - Add keys to debug re-renders

### Testing

1. **Reload testing** - Verify state persists across reloads
2. **Navigation flows** - Test all navigation paths
3. **Action execution** - Verify all actions work correctly
4. **Edge cases** - Test rapid navigation, back button, etc.

## Architecture Benefits

This navigation system provides:

- **Scalability** - Easy to add new tabs and child pages
- **Maintainability** - Clear separation of concerns
- **User Experience** - Smooth navigation with persistence
- **Developer Experience** - Consistent patterns and hooks
- **Performance** - Efficient re-renders and state updates
- **Accessibility** - Built on HeadlessUI primitives

The architecture successfully balances simplicity with flexibility, providing a robust foundation for complex navigation requirements while maintaining clean, maintainable code.