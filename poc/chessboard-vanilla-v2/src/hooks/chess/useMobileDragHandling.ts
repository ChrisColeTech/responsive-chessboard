// useMobileDragHandling.ts - Global mouse drag handling for mobile chess board
import { useEffect } from 'react';
import { useDrag } from '../../providers/DragProvider';
import type { ChessPosition } from '../../types';

/**
 * Hook to handle global mouse events for drag and drop
 * This must be used in a component that renders during drag operations
 */
export const useMobileDragHandling = () => {
  const { isDragging, updateCursor, endDrag, clearDrag } = useDrag();

  useEffect(() => {
    if (!isDragging) return;

    // Global mouse tracking during drag
    const handleGlobalMouseMove = (moveEvent: MouseEvent) => {
      updateCursor(moveEvent.clientX, moveEvent.clientY);
    };

    const handleGlobalMouseUp = (upEvent: MouseEvent) => {
      cleanup();

      // Temporarily hide dragged piece to detect element underneath
      const draggedElement = document.querySelector('[style*="position: fixed"][style*="z-index: 1000"]') as HTMLElement;
      const originalDisplay = draggedElement?.style.display;
      if (draggedElement) {
        draggedElement.style.display = 'none';
      }

      // Use elementFromPoint to find drop target
      const targetElement = document.elementFromPoint(upEvent.clientX, upEvent.clientY);
      const targetSquare = targetElement?.getAttribute('data-square');

      // Restore dragged piece visibility
      if (draggedElement && originalDisplay !== undefined) {
        draggedElement.style.display = originalDisplay;
      }

      console.log('🎯 [MOBILE DRAG] Drop detection:', {
        x: upEvent.clientX,
        y: upEvent.clientY,
        targetElement: targetElement?.tagName,
        targetSquare,
        elementClasses: targetElement?.className
      });

      if (targetSquare) {
        console.log(`🎯 [MOBILE DRAG] Drop target found: ${targetSquare}`);
        endDrag(targetSquare as ChessPosition);
      } else {
        console.log('🎯 [MOBILE DRAG] No valid drop target - checking parent elements');
        // Try checking parent elements in case we hit a child element
        let element = targetElement;
        while (element && element !== document.body) {
          const square = element.getAttribute('data-square');
          if (square) {
            console.log(`🎯 [MOBILE DRAG] Found square in parent: ${square}`);
            endDrag(square as ChessPosition);
            return;
          }
          element = element.parentElement;
        }
        console.log('🎯 [MOBILE DRAG] No valid drop target found');
        clearDrag();
      }
    };

    const cleanup = () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };

    // Add global listeners
    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);

    // Cleanup on unmount or when dragging stops
    return cleanup;
  }, [isDragging, updateCursor, endDrag, clearDrag]);
};