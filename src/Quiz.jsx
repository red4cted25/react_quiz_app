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
      <div>
        <h2>{currentQuestion.text}</h2>
        {currentQuestion.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelection(index)}
            disabled={isAnswerSubmitted}
            className={`
              ${isAnswerSubmitted && index === currentQuestion.correct 
                ? 'bg-[rgba(255, 0, 0, 0.712)]' : ''}
              ${isAnswerSubmitted && selectedAnswer !== currentQuestion.correct 
                && selectedAnswer === index 
                ? 'bg-[rgba(43, 255, 0, 0.712)]' : ''}
            `}
          >
            {answer}
          </button>
        ))}

        {!isAnswerSubmitted && selectedAnswer !== null && (
          <button onClick={checkAnswer}>Submit Answer</button>
        )}

        {isAnswerSubmitted && (
          <div>
            {currentQuestionIndex < questions.length - 1 && (
              <button onClick={moveToNextQuestion}>Next Question</button>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderBonusQuestion = () => {
    const bonusQuestion = {
      text: "What is the capital of France?",
      answers: ["London", "Berlin", "Paris", "Rome"],
      correct: 2
    };

    return (
      <div>
        <h2>Bonus Question (Optional: +2 points, -1 if incorrect)</h2>
        <p>{bonusQuestion.text}</p>
        {bonusQuestion.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleBonusQuestion(index === bonusQuestion.correct)}
            disabled={bonusQuestionAnswered}
          >
            {answer}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      
      {!quizCompleted ? (
        <>
          {!showBonusQuestion ? (
            <>
              <p>Current Score: {score}</p>
              <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
              {renderQuestionContent()}
            </>
          ) : (
            renderBonusQuestion()
          )}
        </>
      ) : (
        <div>
          <h2>Quiz Completed!</h2>
          <p>Your final score: {score}</p>
          <button onClick={restartQuiz}>Restart Quiz</button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
