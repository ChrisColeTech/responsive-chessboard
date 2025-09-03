// Layout.tsx - Main layout component with navbar and content area
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      {/* Top Navigation Bar */}
      <nav style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '12px 24px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              fontSize: '24px'
            }}>
              ♕
            </div>
            <h1 style={{
              margin: 0,
              fontSize: '20px',
              fontWeight: '600'
            }}>
              Responsive Chessboard
            </h1>
            <span style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              POC
            </span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '14px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#4ade80'
              }} />
              Document 20
            </div>
            <div style={{
              color: 'rgba(255,255,255,0.8)'
            }}>
              v2.0
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '80px', // Space for bottom tab bar
        minHeight: 'calc(100vh - 140px)' // Account for nav and tab bar
      }}>
        {children}
      </main>
    </div>
  );
};