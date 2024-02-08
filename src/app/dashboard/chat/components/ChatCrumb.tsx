import { Avatar } from "@nextui-org/avatar";
import { chat } from "../types";
import { User } from "@/supabase/user";
import ChatMarkdown from "@/components/shared/ChatMarkdown";

export default function ChatCrumb({ message, profile }: { message: chat, profile: User }) {
    return (
        <div className="flex flex-col gap-4 w-full">
            {message.role === 'user' && (
            <div className="flex flex-row gap-1 py-2 p-2 pb-6 rounded-md">
                <div className="w-12 mr-1.5">
                  <Avatar src={profile?.image_url || '/default-avatar.png'} size="sm"/>
                </div>
                <section className='flex flex-col gap-2'>
                  <b className="pb-1.5">You</b>
                  <ChatMarkdown content={message.content} />
                </section>
            </div>
            )}
            {message.role === 'assistant' && (
            <div className="flex flex-row gap-2 py-2 p-2 pb-6 rounded-md">
                <div className="w-12 mr-2">
                  <Avatar src="/logos/logo.png" size="sm" />
                </div>
                <section className='flex flex-col gap-2'>
                  <b className="text-primary pb-1.5">Naijaschools AI</b>
                  <ChatMarkdown content={message.content!} />
                </section>
            </div>
            )}
        </div>
    )
}