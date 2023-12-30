import React, { useState } from 'react'
import { QuizQuestion, QuizQuestionList } from '@/supabase/quiz'
import { Radio, RadioGroup } from '@nextui-org/radio'
import { Button } from '@/components/ui/button'
import QuizResults from './QuizResults'
import ShowQuestions from './ShowQuestions'
import { useUpdateQuiz } from '@/lib/react-query'

const QuizInterface = ({ questions, quizId }: { questions: QuizQuestionList, quizId: number}) => {

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record <string, string>>({})
  const [showResults, setShowResults] = useState(false)

  const {mutate: saveProgress, isPending} = useUpdateQuiz()

  const handleOptionSelect = (questionId: number | string, selectedOption: string) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: selectedOption,
    })
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length)
        setCurrentQuestion(currentQuestion + 1)
    else alert('finished')
    /** ==== TODO: Other logic here */
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0 && currentQuestion < questions.length)
        setCurrentQuestion(currentQuestion - 1)
    else alert('cant go back no more')
    /** ==== TODO: Other logic here */
    }

    const score = questions.reduce((totalScore, question) => {
        if (userAnswers[question.id] === question.answer) {
            return totalScore + 1;
        }
        return totalScore
    }, 0)

  const checkAnswers = () => {
    setShowResults(true);
    /** Logic to compare userAnswers with fetchedQuestions' correct answers
     * You'll need to adapt this logic based on how your data is structured
     * Here's an example assuming the correct answers are in the 'answer' property of each question object 
     * 
     * I had to modularize the example since it fitted well with my data structure.
     * */
    
    saveProgress({
        quizId,
        answers: JSON.stringify(userAnswers),
        score: parseInt((score! / questions.length * 100).toFixed(2))
    })
}


  const renderOptions = (question: QuizQuestion & typeof userAnswers) => {
    const options = ['option1', 'option2', 'option3', 'option4']
    return options.map((option, index) => (
        <Radio
            key={index}
            name={`${question.id}`}
            value={question[option]}
            onChange={() => handleOptionSelect(question.id, question[option])}
            checked={userAnswers[question.id] === question[option]}
        
        >{question[option]}</Radio>
    ))
  }

  const renderQuestion = (question: QuizQuestion) => (
    <div key={question.id} className='bg-background'>
      <div className='py-6 shadow-md w-full flex flex-col gap-3'>
        <h3 className='text-[18px] text-primary my-2'>{currentQuestion + 1}. {question.question}</h3>
        <RadioGroup className='flex flex-col gap-3'>
            {renderOptions(question as any)}
        </RadioGroup>

        <div className='flex items-center justify-between py-4'>
            {currentQuestion === 0 ? null : <Button onClick={handlePrevQuestion} variant={'outline'}>Previous</Button>}
            {currentQuestion === questions.length - 1 ? null : <Button onClick={handleNextQuestion} variant={'outline'}>Next</Button>}
            {currentQuestion === questions.length - 1 && <Button onClick={checkAnswers} variant={'outline'}>Finish</Button>}
        </div>
      </div>
    </div>
  )

  return (
    <div className='py-4 min-w-[320px] max-w-4xl'>
        {!showResults && <div>
            <p className='py-1 text-muted-foreground'>{currentQuestion + 1} of {questions.length}</p>
            <section>
                {questions && questions.length > 0 && (
                    <ShowQuestions
                        question={questions[currentQuestion]}
                        currentQuestion={currentQuestion}
                        questions={questions}
                        renderOptions={renderOptions as any}
                        handleNextQuestion={handleNextQuestion}
                        handlePrevQuestion={handlePrevQuestion}
                        checkAnswers={checkAnswers}
                    />
                )}

            </section>
        </div>}
        {showResults && <QuizResults questions={questions} userAnswers={userAnswers} score={score!}/>}
    </div>
  )
}

export default QuizInterface