import ChatMarkdown from '@/components/shared/ChatMarkdown'
import { Alert } from '@/components/ui/alert'
import { Button } from '@nextui-org/button'
import { SendHorizonal, Sparkle } from 'lucide-react'
import React from 'react'

const QuizExplanation = ({ response, isGetting, handleGetQuizExplanation,aiRes, setAiRes}: {
    response: string | null,
    isGetting: boolean,
    handleGetQuizExplanation: () => void,
    setAiRes: any,
    aiRes: boolean
}) => {
  return (
    <section className="py-4 px-2">
    {
        (response && aiRes) && (
            <Alert className='mb-3'>
                <div className="flex flex-row gap-1 py-2">
                    <Sparkle size={18} className={'animate-spin text-primary'} />
                    <span className="text-primary">Naijaschools AI</span>
                </div>
                <ChatMarkdown content={response} />
            </Alert>
        )
    }
    <Button 
        onClick={handleGetQuizExplanation} 
        isLoading={isGetting} 
        variant='flat' 
        color='success'
        title='Only use Naijaschools AI when the situation is critical or when not too confident of your self.'
        endContent={<SendHorizonal size={15} />}
    >Ask Naijaschools AI</Button>
    <Alert className='py-4 p-4 border mt-3'>
        We advise you only use Naijaschools AI when you want to `study while attempting`. It should not debase it's true purpose.
    </Alert>
    </section>
  )
}

export default QuizExplanation