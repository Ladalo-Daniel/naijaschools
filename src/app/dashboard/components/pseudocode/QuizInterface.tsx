import { Question } from '@/supabase/questions';
import { QuizQuestionList } from '@/supabase/quiz';
import { useState } from 'react';

// Assuming 'fetchedQuestions' contains the fetched quiz data

const QuizInterface = ({ fetchedQuestions }: { fetchedQuestions: QuizQuestionList}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0); // State to keep track of the current question
  const [userAnswers, setUserAnswers] = useState({}); // State to store user's selected answers

  const handleOptionSelect = (questionId: number | string, selectedOption: string) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: selectedOption,
    });
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    // Perform any other necessary actions when moving to the next question
  };

  const renderOptions = (question: any) => {
    const options = ['option1', 'option2', 'option3', 'option4'];
    return options.map((option, index) => (
      <div key={index}>
        <input
          type="radio"
          id={`${question.id}-${index}`}
          name={`${question.id}`}
          value={question[option]}
          onChange={() => handleOptionSelect(question.id, question[option])}
          // @ts-ignore
          checked={userAnswers[question.id] === question[option]}
        />
        <label htmlFor={`${question.id}-${index}`}>{question[option]}</label>
      </div>
    ));
  }

  const renderQuestion = (question: any) => (
    <div key={question.id}>
      <h3>{question.question}</h3>
      <form>
        {renderOptions(question)}
      </form>
      <button onClick={handleNextQuestion}>Next</button>
    </div>
  );

  return (
    <div>
      {fetchedQuestions && fetchedQuestions.length > 0 && (
        renderQuestion(fetchedQuestions[currentQuestion])
      )}
    </div>
  );
};

export default QuizInterface;
