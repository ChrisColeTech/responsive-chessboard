import { useState, useEffect } from 'react'

export function useMenuDropdown() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const openMenu = () => {
    console.log('🔍 [MENU HOOK] openMenu called')
    setIsMenuOpen(true)
  }
  const closeMenu = () => {
    console.log('🔍 [MENU HOOK] closeMenu called')
    setIsMenuOpen(false)
  }
  const toggleMenu = () => {
    console.log('🔍 [MENU HOOK] toggleMenu called, current state:', isMenuOpen)
    setIsMenuOpen(prev => {
      console.log('🔍 [MENU HOOK] toggling from', prev, 'to', !prev)
      return !prev
    })
  }

  // Close menu when clicking outside
  useEffect(() => {
    if (isMenuOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Element
        if (!target.closest('[data-menu-button]') && !target.closest('[data-menu-dropdown]')) {
          closeMenu()
        }
      }
      
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isMenuOpen])

  return {
    isMenuOpen,
    openMenu,
    closeMenu,
    toggleMenu
  }
}