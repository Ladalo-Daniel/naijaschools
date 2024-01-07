import MarkdownPreview from '@/components/shared/MarkdownPreview'
import { Alert } from '@/components/ui/alert'
import { Button } from '@nextui-org/button'
import { Sparkles } from 'lucide-react'
import React from 'react'

const QuizExplanation = ({ response, isGetting, handleGetQuizExplanation,aiRes, setAiRes}: {
    response: string | null,
    isGetting: boolean,
    handleGetQuizExplanation: () => void,
    setAiRes: any,
    aiRes: boolean
}) => {
  return (
    <section className="p-4">
    {
        (response && aiRes) && (
            <Alert className='mb-3'>
                <div className="flex flex-row gap-1 py-2">
                    <Sparkles size={18} className={'animate-spin'} />
                    <span className="text-primary">Naijaschools AI</span>
                </div>
                <MarkdownPreview content={response} />
            </Alert>
        )
    }
    <Button 
        onClick={handleGetQuizExplanation} 
        isLoading={isGetting} 
        variant='flat' 
        color='success'
        title='Only use Naijaschools AI when the situation is critical or when not too confident of your self.'
    >Ask Naijaschools AI</Button>
    <Alert className='p-4 border-primary-500 mt-3'>
        We advise you only use Naijaschools AI when you want to `study while attempting`. It should not debase it's true purpose.
    </Alert>
    </section>
  )
}

export default QuizExplanation