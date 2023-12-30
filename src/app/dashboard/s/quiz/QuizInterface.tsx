import React, { useState } from 'react'
import { QuizQuestion, QuizQuestionList } from '@/supabase/quiz'
import { Radio, RadioGroup } from '@nextui-org/radio'
import { Button } from '@/components/ui/button'
import QuizResults from './QuizResults'
import ShowQuestions from './ShowQuestions'
import { useUpdateQuiz } from '@/lib/react-query'
import QuizTimer from './QuizTimer'
import { toast } from 'sonner'

const QuizInterface = ({ questions, quizId }: { questions: QuizQuestionList, quizId: number}) => {

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record <string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const totalTimeInSeconds = questions?.length * 60;
  const [timer, setTimer] = useState<number>(totalTimeInSeconds);
  const elapsedSeconds = totalTimeInSeconds - timer;

  const {mutate: saveProgress, isPending} = useUpdateQuiz()

  const handleOptionSelect = (questionId: number | string, selectedOption: string) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: selectedOption,
    })
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions?.length)
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

    const score = questions?.reduce((totalScore, question) => {
        if (userAnswers[question?.id] === question.answer) {
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
    setHasFinished(true)
    saveProgress({
        quizId,
        answers: JSON.stringify(userAnswers),
        score: parseInt((score! / questions?.length * 100).toFixed(2)),
        duration: elapsedSeconds.toString(),
    }, {
      onSuccess: () => toast.success("Your progress have been saved successfully. You can reference it later on the `history page`.")
    })
    return
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

  return (
    <div className='py-4 min-w-[300px] max-w-4xl'
      onSelect={() => false}
      onCopy={() => false}
      onPaste={() => false}
      onMouseDown={() => false}
    >
      <QuizTimer 
        totalQuestions={questions.length} 
        showResults={checkAnswers}
        elapsedSeconds={elapsedSeconds}
        totalTimeInSeconds={totalTimeInSeconds} 
        setTimer={setTimer}
        timer={timer}
        hasFinished={hasFinished}
         />

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