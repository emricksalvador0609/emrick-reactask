import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface Question {
  stimulus: string;
  feedback: string;
  correct_answer: boolean;
}

interface Round {
  order: number;
  round_title: string;
  questions: Question[];
}

interface AnswerRecord {
  round: string;
  question: string;
  correct: boolean;
  stimulus: string;
  feedback: string;
}

interface RouteParams {
  round: string | undefined;
}

const ActivityTwo: React.FC = () => {
  const [rounds, setRounds] = useState<Round[]>([]);
  const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<AnswerRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { round } = useParams<{ round?: string }>();


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/error-find`);
        const activityTwo = response.data.activities.find((activity: any) => activity.order === 2);
        setRounds(activityTwo.questions);

        if (round) {
          const roundIndex = activityTwo.questions.findIndex((r: Round) => r.order === parseInt(round));
          if (roundIndex >= 0) {
            setCurrentRoundIndex(roundIndex);
          }
        }
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [round]);

  const currentRound = rounds[currentRoundIndex] || {} as Round;
  const currentQuestions = currentRound.questions || [];
  const currentQuestion = currentQuestions[currentQuestionIndex];

  const handleAnswerSelect = (isCorrect: boolean) => {
    const answerRecord: AnswerRecord = {
      round: currentRound.round_title || `ROUND ${currentRoundIndex + 1}`,
      question: `Q${currentQuestionIndex + 1}`,
      correct: isCorrect,
      stimulus: currentQuestion.stimulus.replace(/\*/g, ''),
      feedback: currentQuestion.feedback.replace(/\*/g, '')
    };

    setSelectedAnswer(isCorrect);
    setUserAnswers([...userAnswers, answerRecord]);

    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const isLastQuestion = currentQuestionIndex === currentQuestions.length - 1;
      const isLastRound = currentRoundIndex === rounds.length - 1;

      if (isLastQuestion && isLastRound) {
        navigate('/activity-two/results', {
          state: {
            results: [...userAnswers, answerRecord],
            score: isCorrect ? score + 1 : score,
            totalQuestions: rounds.reduce((total, round) => total + round.questions.length, 0)
          }
        });
      } else if (isLastQuestion) {
        setCurrentRoundIndex(currentRoundIndex + 1);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      }
    }, 1000);
  };

  const renderBoldedText = (text: string) => {
    const parts = text.split('*');
    return parts.map((part, index) =>
      index % 2 !== 0 ? <span key={index} className="font-bold">{part}</span> : <span key={index}>{part}</span>
    );
  };

  if (loading) return <div className="min-h-screen bg-[#F2FAFF] p-4 flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen bg-[#F2FAFF] p-4 flex items-center justify-center">Error: {error}</div>;
  if (!currentQuestion) return <div className="min-h-screen bg-[#F2FAFF] p-4 flex items-center justify-center">No questions found</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F2FAFF] p-4">
      <div className="bg-white p-4 border border-[#2599FB]/25 max-w-3xl mx-auto w-full">
        <h1 className="text-xl font-bold text-[#2599FB] uppercase text-start mb-9">
          ACTIVITY TWO / {currentRound.round_title || `ROUND ${currentRoundIndex + 1}`}
        </h1>
        <h2 className="text-5xl font-bold text-[#2599FB] mb-8">Q{currentQuestionIndex + 1}.</h2>

        <div className="p-6 rounded-md shadow-sm border border-[#e0e0e0] mt-10 mb-6">
          <p className="text-lg text-[#2599FB]">
            {renderBoldedText(currentQuestion.stimulus)}
          </p>
        </div>

        <div className="flex justify-center items-center space-x-8 p-4">
          <button
            onClick={() => handleAnswerSelect(true)}
            disabled={selectedAnswer !== null}
            className={`w-full px-8 py-3 rounded text-lg font-medium ${selectedAnswer === true ? 'text-[#2599FB]' : selectedAnswer === false ? 
            'bg-white text-[#2599FB] opacity-50' : 'bg-white text-[#2599FB]'}`}
          >
            CORRECT
          </button>
          <button
            onClick={() => handleAnswerSelect(false)}
            disabled={selectedAnswer !== null}
            className={`w-full px-8 py-3 rounded text-lg font-medium ${selectedAnswer === false ? ' text-#2599FB' : selectedAnswer === true ? 
            'bg-white text-[#2599FB] opacity-50' : 'bg-white text-[#2599FB]'}`}
          >
            INCORRECT
          </button>
        </div>

        {selectedAnswer !== null && (
          <div className={`mt-6 p-4 rounded-md text-center ${selectedAnswer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <p className="font-medium">
              {selectedAnswer ? '✓ Correct Answer!' : '✗ Incorrect Answer'}
            </p>
          </div>
        )}

        <button
          onClick={() => navigate('/')}
          className="mt-6 text-blue-600 hover:underline"
        >
          ← Back to main page
        </button>
      </div>
    </div>
  );
};

export default ActivityTwo;
