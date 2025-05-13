import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Interfaces
interface Question {
  stimulus: string;
  feedback: string;
}

interface Activity {
  order: number;
  questions: Question[];
}

interface AnswerRecord {
  question: string;
  correct: boolean;
  stimulus: string;
  feedback: string;
}

const ActivityOne: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<AnswerRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/error-find`);
        const activityOne = response.data.activities.find((activity: Activity) => activity.order === 1);
        setQuestions(activityOne.questions);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerSelect = (isCorrect: boolean) => {
    const answerRecord: AnswerRecord = {
      question: `Q${currentQuestionIndex + 1}`,
      correct: isCorrect,
      stimulus: questions[currentQuestionIndex].stimulus.replace(/\*/g, ''),
      feedback: questions[currentQuestionIndex].feedback.replace(/\*/g, '')
    };

    setSelectedAnswer(isCorrect);
    setUserAnswers([...userAnswers, answerRecord]);

    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const isLastQuestion = currentQuestionIndex === questions.length - 1;
      if (isLastQuestion) {
        navigate('/activity-one/results', {
          state: {
            results: [...userAnswers, answerRecord],
            score: isCorrect ? score + 1 : score,
            totalQuestions: questions.length
          }
        });
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      }
    }, 1000);
  };

  const renderBoldedText = (text: string) => {
    const parts = text.split('*');
    return parts.map((part, index) =>
      index % 2 !== 0 ? (
        <span key={index} className="font-bold">{part}</span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  if (loading) return <div className="min-h-screen bg-[#F2FAFF] p-4 flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen bg-[#F2FAFF] p-4 flex items-center justify-center">Error: {error}</div>;
  if (questions.length === 0) return <div className="min-h-screen bg-[#F2FAFF] p-4 flex items-center justify-center">No questions found</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F2FAFF] p-4">
      <div className="bg-white p-4 border border-[#2599FB]/25 max-w-3xl mx-auto w-full">
        <h1 className="text-xl font-bold text-[#2599FB] uppercase text-start mb-9">ACTIVITY ONE</h1>
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
            className={`w-full px-8 py-3 rounded text-lg font-medium ${selectedAnswer === false ? 'text-[#2599FB]' : selectedAnswer === true ?
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

export default ActivityOne;
