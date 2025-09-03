/**
 * Demo App - Shows proper usage of Chessboard component
 * Following Document 02 Architecture Guide - Clean separation
 */

import { Chessboard } from './components';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col">
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Tailwind Chessboard POC
        </h1>
        
        {/* Container-responsive chessboard - Document 18 Research */}
        <div className="flex-1 w-full min-h-0">
          <Chessboard 
            pieceSet="classic"
            boardTheme="classic"
            showCoordinates={true}
            allowDragAndDrop={true}
          />
        </div>
      </div>
    </div>
  );
}

export default App;