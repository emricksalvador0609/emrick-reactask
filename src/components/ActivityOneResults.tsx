import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Result {
  question: string;
  correct: boolean;
  stimulus: string;
  feedback: string;
}

interface LocationState {
  results: Result[];
  score: number;
  totalQuestions: number;
}

const ActivityOneResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { results = [], score = 0, totalQuestions = 0 } = (location.state || {}) as LocationState;

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F2FAFF] p-4">
      <div className="max-w-md mx-auto bg-white border border-[#2599FB]/25 w-full py-5">
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold uppercase p-6">ACTIVITY ONE</h1>
          <h2 className="text-4xl font-bold mt-2 p-5">Results</h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-[#e0e0e0] p-6 mb-6">
          {results.map((result, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-[#2599FB]">{result.question}</span>
                <span className={`text-lg font-bold`}>
                  {result.correct ? 'CORRECT' : 'INCORRECT'}
                </span>
              </div>

              {/* You can uncomment below if feedback is needed */}
              {/* 
              <div className="mt-2 text-sm text-[#2599FB]">
                <p><span className="font-medium">Feedback:</span> {result.feedback}</p>
              </div>
              */}

              {index < results.length - 1 && <hr className="my-3 border-[#e0e0e0]" />}
            </div>
          ))}

          <div className="mt-6 pt-4 text-center">
            <p className="text-xl font-bold">
              Final Score: {score}/{totalQuestions}
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="bg-[#2599FB] hover:bg-[#1a6bb0] text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            HOME
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityOneResults;
