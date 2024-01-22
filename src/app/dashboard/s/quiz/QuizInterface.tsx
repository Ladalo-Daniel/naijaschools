import React, { useState } from 'react'
import { QuizQuestion, QuizQuestionList } from '@/supabase/quiz'
import { Radio } from '@nextui-org/radio'
import QuizResults from './QuizResults'
import ShowQuestions from './ShowQuestions'
import { useUpdateQuiz } from '@/lib/react-query'
import QuizTimer from './QuizTimer'
import { toast } from 'sonner'
import ConfirmFinish from './ConfirmFinish'
import QuizTick from './QuizTick'

const QuizInterface = ({ 
  questions, 
  quizId, 
  institutionId, 
  courseId,
}: { 
  questions: QuizQuestionList, 
  quizId: number,
  institutionId?: string | number | undefined,
  courseId?: string | number | undefined,
}) => {

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record <string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)
  const [confirmFinished, setConfirmFinished] = useState(false)
  const [confirmFinishedModalOpen, setConfirmFinishedModalOpen] = useState(false)
  const [wasChecked, setWasChecked] = useState<{id?: number, idx?: number, checked?: boolean, option?: string}[]>([])

  const totalTimeInSeconds = questions?.length * 60
  const [timer, setTimer] = useState<number>(totalTimeInSeconds)
  const elapsedSeconds = totalTimeInSeconds - timer

  const {mutate: saveProgress, isPending} = useUpdateQuiz()

  const handleOptionSelect = (questionId: number | string, selectedOption: string) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: selectedOption,
    })
    setWasChecked(prev => [...prev, {
      id: questionId as number,
      checked: true,
      option: selectedOption
    }])
  }

    const handleNextQuestion = () => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        alert('Finished')
      }
    }
    
    const handlePrevQuestion = () => {
      if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1)
      } else {
        alert('Cannot go back further')
      }
    }

    function handleSkipToQuestion(idx: number) {
      setCurrentQuestion(idx)
    }

    const score = questions?.reduce((totalScore, question) => {
        if (userAnswers[question?.id] === question.answer) {
            return totalScore + 1
        }
        return totalScore
    }, 0)

  const checkAnswers = (duration?: string, type?: "elapse" | "other") => {

    if (type === "elapse") {
      setShowResults(true)
      setHasFinished(true)
      saveProgress({
          quizId,
          answers: JSON.stringify(userAnswers),
          score: parseInt((score! / questions?.length * 100).toFixed(2)),
          duration: elapsedSeconds.toString(),
      }, {
        onSuccess: () => toast.success("Your progress has been saved successfully. You can reference it later on the `history page`.")
      })
      return
    }

    if ((currentQuestion === questions.length - 1) || (Object.entries(userAnswers).length !== questions.length)) { 
      if (!confirmFinished) {
        setConfirmFinishedModalOpen(true)
        if ((!confirmFinished && confirmFinishedModalOpen)) {
          setConfirmFinished(true)
          return
        }
      }

      
    }
    if (confirmFinished) {
      setShowResults(true)
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
}


  const renderOptions = (question: QuizQuestion & typeof userAnswers) => {
    const options = ['option1', 'option2', 'option3', 'option4']

    return options.map((option, index) => (
      <Radio
        key={index}
        name={`${question.id}`}
        value={question[option]}
        onChange={() => handleOptionSelect(question.id, question[option])}
        checked={
          userAnswers[question.id] === question[option]
        }
      >
        {question[option]}
      </Radio>
    ))
  }
  
  return (
    <div className='p-4 min-w-[240px] max-w-5xl'
    onSelect={() => false}
    onCopy={() => false}
    onPaste={() => false}
    onMouseDown={() => false}
    >
    <QuizTick 
      handleSkipToQuestion={handleSkipToQuestion}
      questions={questions}
      userAnswers={userAnswers}
      checkAnswers={checkAnswers}
    />

      <QuizTimer 
        totalQuestions={questions.length} 
        showResults={checkAnswers}
        elapsedSeconds={elapsedSeconds}
        totalTimeInSeconds={totalTimeInSeconds} 
        setTimer={setTimer}
        timer={timer}
        hasFinished={hasFinished}
        totalAnswered={Object.values(userAnswers).length}
        />

        {
          confirmFinishedModalOpen && <ConfirmFinish 
            open={confirmFinishedModalOpen} 
            setOpen={setConfirmFinishedModalOpen} 
            confirmFinish={confirmFinished} 
            setConfirmFinish={setConfirmFinished} 
            checkAnswers={checkAnswers}
            />
        }

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
                        userAnswers={userAnswers}
                    />
                )}

            </section>
        </div>}
        {showResults && <QuizResults 
          questions={questions} 
          userAnswers={userAnswers} 
          score={score!} 
          courseId={courseId} 
          institutionId={institutionId}
          />}

    </div>
  )
}

export default QuizInterface