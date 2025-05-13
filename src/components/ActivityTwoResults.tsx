import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface AnswerRecord {
  round: string;
  question: string;
  correct: boolean;
  stimulus: string;
  feedback: string;
}

interface LocationState {
  results: AnswerRecord[];
  score: number;
  totalQuestions: number;
}

const ActivityTwoResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as LocationState | undefined;
  const results = state?.results ?? [];
  const score = state?.score ?? 0;
  const totalQuestions = state?.totalQuestions ?? 0;

  // Group results by round
  const resultsByRound: Record<string, AnswerRecord[]> = results.reduce((acc, result) => {
    if (!acc[result.round]) {
      acc[result.round] = [];
    }
    acc[result.round].push(result);
    return acc;
  }, {} as Record<string, AnswerRecord[]>);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F2FAFF] p-4">
      <div className="max-w-md mx-auto bg-white border border-[#2599FB]/25 w-full py-5">
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold uppercase p-6">ACTIVITY TWO</h1>
          <h2 className="text-4xl font-bold mt-2 p-5">Results</h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-[#e0e0e0] p-6 mb-6">
          {Object.entries(resultsByRound).map(([round, roundResults]) => (
            <div key={round} className="mb-6 last:mb-0">
              <h3 className="text-xl font-bold text-[#2599FB] mb-4">{round}</h3>
              {roundResults.map((result, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-[#2599FB]">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                    <span className={`text-lg font-bold`}>
                      {result.correct ? 'CORRECT' : 'FALSE'}
                    </span>
                  </div>
                  {index < roundResults.length - 1 && <hr className="my-3 border-[#e0e0e0]" />}
                </div>
              ))}
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

export default ActivityTwoResults;
