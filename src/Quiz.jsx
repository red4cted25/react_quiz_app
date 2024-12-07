import {useState, useEffect} from 'react'
import questions from './data/questions.json';

function Quiz() {
  //! Hooks
  // useStates
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showBonusQuestion, setShowBonusQuestion] = useState(false);
  const [bonusQuestionAnswered, setBonusQuestionAnswered] = useState(false);

  // useEffect hook to load questions
  useEffect(() => {
    // Check if we've reached the end of regular questions
    if (currentQuestionIndex === questions.length - 1 && !isAnswerSubmitted) {
      const timer = setTimeout(() => {
        setShowBonusQuestion(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentQuestionIndex, isAnswerSubmitted]);

  //! Functions
  // Answer Selection
  const handleAnswerSelection = (answerIndex) => {
    // Prevent re-selection after answer is submitted
    if (!isAnswerSubmitted) {
      setSelectedAnswer(answerIndex);
    }
  };

  // Check Answer Handler
  const checkAnswer = () => {
    // Mark answer as submitted
    setIsAnswerSubmitted(true);

    // Check if selected answer is correct
    if (selectedAnswer === questions[currentQuestionIndex].correct) {
      // Increment score for correct answer
      setScore(prevScore => prevScore + 1);
    }
  };

  // Move to Next Question
  const moveToNextQuestion = () => {
    // Ensure an answer has been submitted
    if (!isAnswerSubmitted) return;

    // Check if more questions exist
    if (currentQuestionIndex < questions.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);
      
      // Reset answer-related states
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      // Regular questions completed, show bonus question
      setShowBonusQuestion(true);
    }
  };

  // Bonus Question Handler
  const handleBonusQuestion = (isCorrect) => {
    // Prevent multiple submissions
    if (bonusQuestionAnswered) return;

    if (isCorrect) {
      // Add 2 points for correct bonus answer
      setScore(prevScore => prevScore + 2);
    } else {
      // Subtract 1 point for incorrect bonus answer
      setScore(prevScore => Math.max(0, prevScore - 1));
    }
    
    // Mark bonus question as answered
    setBonusQuestionAnswered(true);
    
    // Fully complete the quiz
    setQuizCompleted(true);
  };

  // Restart Quiz
  const restartQuiz = () => {
    // Reset all states to initial values
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsAnswerSubmitted(false);
    setQuizCompleted(false);
    setShowBonusQuestion(false);
    setBonusQuestionAnswered(false);
  };

  // Render Methods
  const renderQuestionContent = () => {
    // Get current question
    const currentQuestion = questions[currentQuestionIndex];

    return (
      <div className='h-full'>
        {/* Question */}
        <div className="h-[55%] flex items-center justify-center">
          <h2 className='text-center p-12 text-4xl font-bold '>{currentQuestion.text}</h2>
        </div>
        
        {/* Answers */}
        <div className="h-[30%] flex justify-center items-center space-x-4 m-4">
          {currentQuestion.answers.map((answer, index) => {
            const colors = [
              'bg-blue-400 border-blue-600 hover:bg-blue-400', 
              'bg-teal-400 border-teal-600 hover:bg-teal-400', 
              'bg-yellow-400 border-yellow-600 hover:bg-yellow-400', 
              'bg-red-400 border-red-600 hover:bg-red-400'
            ];

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelection(index)}
                disabled={isAnswerSubmitted}
                className={`h-full w-full flex-1 flex items-center justify-center cursor-pointer rounded-xl border-4 p-4 text-center text-dark-navy
                  // Box Color From colors Array
                  ${colors[index % colors.length]}
                  // Selected Answer Color (When Not Submitted)
                  ${selectedAnswer === index ? 'border-dark-navy' : ''}
                  // Correct Answer Color 
                  ${(isAnswerSubmitted) && (index === currentQuestion.correct) ? 'bg-correct bg-opacity-70' : ''}
                  // Incorrect Answer Color (When Submitted)
                  ${(isAnswerSubmitted) && (selectedAnswer !== currentQuestion.correct) && (selectedAnswer === index) ? 'bg-wrong bg-opacity-70' : ''}
                  ${(isAnswerSubmitted) && (!selectedAnswer) ? 'opacity-20' : ''}
                `}
              >
                {answer}
              </button>
            )
          })}
        </div>
        
        {/* Submit & Next Question Buttons */}
        {(!isAnswerSubmitted) && (selectedAnswer !== null) && (
          <div className="absolute bottom-[45%] right-4">
            <button onClick={checkAnswer} className='bg-blue-500 text-white px-4 py-2 rounded'>Submit Answer</button>
          </div>
        )}

        {isAnswerSubmitted && (
          <div>
            {currentQuestionIndex < questions.length - 1 && (
              <div className="absolute bottom-[45%] right-4">
                <button onClick={moveToNextQuestion} className='bg-blue-500 text-white px-4 py-2 rounded'>Next Question</button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderBonusQuestion = () => {
    const bonusQuestion = {
      "text": "Which of the following statements about useEffect is NOT true?",
      "answers": [
        "useEffect runs after every render unless an input array is provided.",
        "You can use a cleanup function in useEffect to remove event listeners.",
        "An empty input array in useEffect ensures the effect runs only once.",
        "useEffect can directly modify the DOM without a cleanup function."
      ],
      "correct": 3
    };

    return (
      <div className='h-full'>
        {/* Question */}
        <div className="h-[55%] flex items-center justify-center">
          <h2 className='text-center p-12 text-4xl font-bold '>{bonusQuestion.text}</h2>
        </div>
        
        {/* Answers */}
        <div className="h-[30%] flex justify-center items-center space-x-4 m-4">
          {bonusQuestion.answers.map((answer, index) => {
            const colors = [
              'bg-blue-400 border-blue-600 hover:bg-blue-400', 
              'bg-teal-400 border-teal-600 hover:bg-teal-400', 
              'bg-yellow-400 border-yellow-600 hover:bg-yellow-400', 
              'bg-red-400 border-red-600 hover:bg-red-400'
            ];

            return (
              <button
                key={index}
                onClick={() => handleBonusQuestion(index === bonusQuestion.correct)}
                disabled={bonusQuestionAnswered}
                className={`h-full w-full flex-1 flex items-center justify-center cursor-pointer rounded-xl border-4 p-4 text-center text-dark-navy
                  // Box Color From colors Array
                  ${colors[index % colors.length]}
                  // Selected Answer Color (When Not Submitted)
                  ${selectedAnswer === index ? 'border-dark-navy' : ''}
                  // Correct Answer Color 
                  ${(bonusQuestionAnswered) && (index === bonusQuestion.correct) ? 'bg-correct bg-opacity-70' : ''}
                  // Incorrect Answer Color (When Submitted)
                  ${(bonusQuestionAnswered) && (selectedAnswer !== bonusQuestion.correct) && (selectedAnswer === index) ? 'bg-wrong bg-opacity-70' : ''}
                  ${(bonusQuestionAnswered) && (!selectedAnswer) ? 'opacity-20' : ''}
                `}
              >
                {answer}
              </button>
            )
          })}
        </div>
      </div>
    );
  };

  return (
    <div className='h-screen flex flex-col'>
      {/* Header */}
      <header className="h-[10%] bg-gunmetal-grey w-full flex items-center px-4 text-white justify-between">
        {/* Left Content */}
        <a href="/" className="flex items-center rounded-2xl hover:bg-dark-navy hover:bg-opacity-70 p-2">
          <span className="text-2xl">&#8617;</span>
          <span className="ml-2">Home</span>
        </a>

        {/* Center Content*/}
        <div className="flex-grow text-center">
          <p className="text-lg font-medium">{showBonusQuestion ? 'Bonus Question (+2 points, -1 if incorrect)' : `Question ${currentQuestionIndex + 1} of ${questions.length}`}</p>
        </div>

        {/* Right Content*/}
        <div className="py-3 px-6 text-white flex flex-col items-center rounded-xl bg-dark-navy">
          <span>Score:</span>
          <span>{score}</span>
        </div>
      </header>

      {/* Render Quiz */}
      {!quizCompleted ? (
        <>
          {!showBonusQuestion ? (
            <>
              {renderQuestionContent()}
            </>
          ) : (
            renderBonusQuestion()
          )}
        </>
      ) : (
        <div className="h-[60%] flex flex-col justify-center items-center text-white space-y-4">
          <h2 className="text-4xl font-bold">Quiz Completed!</h2>
          <p className="text-xl">Your final score: {score}</p>
          <button onClick={restartQuiz} className="bg-blue-500 px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors">Restart Quiz</button>
        </div>
      )}

      {/* Footer */}
      <footer className='fixed bottom-0 h-[5%] bg-gunmetal-grey w-full'></footer>
    </div>
  );
}

export default Quiz;
