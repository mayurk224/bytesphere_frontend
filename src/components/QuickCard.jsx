import React from 'react'

const QuickCard = () => {
  return (
    <div>
        <div className="w-52 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-3 flex items-center gap-3">
        <div className="p-2 bg-indigo-500 rounded-full flex items-center justify-center">
          <svg 
            className="w-5 h-5 text-white" 
            aria-hidden="true" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" 
            />
          </svg>
        </div>
        <div className="flex flex-col">
          <h3 className="text-base font-bold text-white">Images</h3>
          <div className="flex items-center">
            <span className="text-indigo-300 text-sm font-medium">100</span>
            <span className="text-gray-400 ml-1 text-xs">items</span>
          </div>
        </div>
      </div>
      <div className="bg-gray-700 h-1 w-full">
        <div className="bg-indigo-500 h-1 w-2/3"></div>
      </div>
    </div>
    </div>
  )
}

export default QuickCard