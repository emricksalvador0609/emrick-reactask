import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorFind = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F2FAFF] p-4">
      <div className="max-w-3xl mx-auto  bg-white border border-[#2599FB]/25 pt-7">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-sm font-bold text-[#2599FB] p-8">CAE</h1>
          <h2 className="text-4xl font-bold text-[#2599FB] mt-1 p-8">Error Find</h2>
        </div>

        {/* Activities Section */}
        <div className="space-y-0">
          {/* Activity One Button */}
          <button 
            onClick={() => navigate('/activity-one')}
            className="w-full bg-white p-4 rounded-md shadow-sm border border-[#e0e0e0] hover:bg-gray-50 transition-colors text-left"
          >
            <h3 className="text-lg font-medium text-[#2599FB] uppercase text-center">ACTIVITY ONE</h3>
          </button>

          {/* Activity Two Button */}
          <button 
            onClick={() => navigate('/activity-two')}
            className="w-full bg-white p-4 rounded-md shadow-sm border border-[#e0e0e0] hover:bg-gray-50 transition-colors text-left"
          >
            <h3 className="text-lg font-medium text-[#2599FB] uppercase text-center">ACTIVITY TWO</h3>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFind;