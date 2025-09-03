// TabBar.tsx - iPad-style bottom navigation tab bar
import React from 'react';

export type TabId = 'worker' | 'drag';

interface Tab {
  id: TabId;
  label: string;
  icon: string;
  description: string;
}

interface TabBarProps {
  currentTab: TabId;
  onTabChange: (tabId: TabId) => void;
}

const tabs: Tab[] = [
  {
    id: 'worker',
    label: 'Engine',
    icon: '🔧',
    description: 'Stockfish Worker Test'
  },
  {
    id: 'drag',
    label: 'Drag & Drop',
    icon: '🖱️',
    description: 'Document 20 Test'
  }
];

export const TabBar: React.FC<TabBarProps> = ({ currentTab, onTabChange }) => {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '84px',
      background: 'linear-gradient(180deg, rgba(248, 250, 252, 0.8) 0%, rgba(248, 250, 252, 0.95) 100%)',
      backdropFilter: 'blur(40px) saturate(180%)',
      borderTop: '0.5px solid rgba(0, 0, 0, 0.05)',
      zIndex: 1000,
      boxShadow: '0 -1px 30px rgba(0, 0, 0, 0.08), 0 -1px 1px rgba(0, 0, 0, 0.05)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: '0 20px',
        gap: '12px'
      }}>
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          
          return (
            <div
              key={tab.id}
              style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <button
                onClick={() => onTabChange(tab.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '10px 20px',
                  backgroundColor: isActive ? 'rgba(0, 122, 255, 0.1)' : 'transparent',
                  border: 'none',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
                  minWidth: '80px',
                  position: 'relative',
                  ...(isActive && {
                    backgroundColor: 'rgba(0, 122, 255, 0.15)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 20px rgba(0, 122, 255, 0.25), 0 0 0 0.5px rgba(0, 122, 255, 0.2)'
                  }),
                  ...(!isActive && {
                    ':hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                  })
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.target as HTMLElement).style.backgroundColor = 'rgba(0, 0, 0, 0.04)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.target as HTMLElement).style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={{
                  fontSize: '24px',
                  marginBottom: '4px',
                  filter: isActive ? 'brightness(1.1)' : 'brightness(0.8)',
                  transform: isActive ? 'scale(1.1)' : 'scale(1)',
                  transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)'
                }}>
                  {tab.icon}
                </div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: isActive ? '600' : '500',
                  color: isActive ? '#007AFF' : '#8E8E93',
                  textAlign: 'center',
                  lineHeight: '1.2',
                  letterSpacing: '-0.01em'
                }}>
                  {tab.label}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};