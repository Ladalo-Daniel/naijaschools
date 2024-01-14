import { createUpdateChat } from "@/supabase/chats"

const print = (arg: any) => console.log(arg)

export const chat = [
    {
        user_prompt: "Say Hello",
        bot_response: "Hello",
    },
    {
        user_prompt: "Good evening, What's up?",
        bot_response: "Nothing really. Just bored",
    },
    {
        user_prompt: "Say Hello",
        bot_response: "Hello",
    },
]

export type chat = {
    role: 'user' | 'assistant',
    content: string,
}

type chats = chat[]

const ress: chats = [
    {
         content: "Hello",
         role: "user"
    },
    {
         content: "Hello",
         role: "assistant"
    },
    {
         content: "Hello",
         role: "user"
    },
]

let prev_ress = [...ress]

for (let j of ress) {
    if (j.role === 'user') {
        print(j.content)
    }
    else if (j.role === 'assistant')
        print(j.content)
}

export const handlePromptSubmit = async (prompt: string, role: 'user' | 'assistant', user?: string, chatId?: string,) => {
    prev_ress = [...prev_ress, {
        content: prompt,
        role: role,
    }]

    await createUpdateChat(prev_ress, 'matie')
}

[{"content":"Write an essay about love","role":"user"},{"content":null,"role":"assistant"},{"content":"Hate?","role":"user"},{"content":"Love: An Endless Journey of Joy and Discovery\n\nLove is an incredibly profound and complex emotion that has intrigued humanity for centuries. It is a force that transcends time and boundaries, weaving its way into the depths of our hearts and souls. Love is not merely a feeling, but a state of being that has the power to heal, inspire, and transform us in ways we never thought possible.\n\nAt its core, love is a connection that binds us together, igniting a sense of belonging and acceptance within our hearts. It is a magnetic force that draws us to another person, making them the center of our universe. Love reveals our vulnerabilities and exposes our deepest desires, as we begin to understand what it means to truly care for someone else.\n\nLove is not limited to romantic relationships; it extends to our families, friends, and communities. It is the foundation upon which strong relationships are built, fostering trust, understanding, and compassion. Love compels us to sacrifice for others, to selflessly give of ourselves without expecting anything in return.\n\nFurthermore, love is a powerful source of inspiration. It awakens our creative spirit, allowing us to find beauty in the simplest of things. Love ignites a fire within us, driving us to pursue our dreams and reach for the stars. It teaches us that anything is possible, as long as we have the unwavering support and love of those who believe in us.\n\nLove can also be a catalyst for personal growth and self-discovery. Through love, we learn more about ourselves – our strengths, weaknesses, and desires. It challenges us to confront our fears and break down the walls that hold us back. Love pushes us to become the best version of ourselves, as it encourages us to strive for personal growth and happiness.\n\nHowever, love is not without its hardships. It can be painful, as we navigate the complexities of human emotions and face the possibility of rejection or loss. Love teaches us resilience and the importance of forgiveness, as we learn to overcome the hurdles that come our way. It reminds us that even in the darkest moments, love has the power to heal and bring light back into our lives.\n\nIn conclusion, love is a journey – an endless adventure filled with joy, pain, and everything in between. It is a force that unites us, inspires us, and challenges us. Love has the power to transform lives and leave an indelible mark on our souls. So, let us embrace love in all its forms, cherishing the connections we make and the beauty it brings to our lives.","role":"assistant"},{"content":"An essay on kindness","role":"user"},{"content":"Oh no, I'm sorry to hear that you're feeling that way, but don't worry! As an AI chat assistant, I'm here to spread positivity and help you with any questions or concerns you may have. Is there something specific you'd like assistance with? I'm here to help! 😊","role":"assistant"},{"content":"An essay on relationships","role":"user"},{"content":"Of course! I'd be delighted to help you with an essay on kindness. \n\nTitle: The Power of Kindness\n\nIntroduction:\nKindness, an invaluable virtue, has the power to transform lives and bring about positive change in our world. It is an act of selflessness and compassion that not only benefits the recipients but also the givers. In this essay, we will explore the significance of kindness, its impact on individuals and communities, and ways we can foster kindness in our daily lives.\n\nBody:\n1. Definition and Importance of Kindness:\nKindness can be defined as the genuine concern and compassion shown towards others. It is an innate quality within all of us that, when expressed, makes the world a better place. Kindness creates a ripple effect, spreading joy, love, and positivity wherever it goes. It is essential for building strong relationships and fostering a harmonious society.\n\n2. Impact of Kindness on Individuals:\nWhen we choose to be kind, we not only bring happiness to others but also experience a sense of fulfillment within ourselves. Acts of kindness have been scientifically proven to improve mental and physical well-being. Kindness stimulates the release of dopamine, a feel-good hormone, which enhances our overall mood and reduces stress. It helps combat negative emotions such as anger, anxiety, and depression, offering a sense of purpose and meaning in life.\n\n3. Impact of Kindness on Communities:\nCommunities thrive when kindness prevails. Acts of kindness strengthen social bonds, promote empathy, and reinforce collective responsibility. By promoting kindness, communities can foster a culture of support and mutual care. Random acts of kindness, such as volunteering, donating, or simply lending a helping hand, can provide much-needed assistance to those in need. Additionally, kindness has the power to bridge divides and promote understanding between people of different backgrounds, fostering a more inclusive and harmonious society.\n\n4. Ways to Foster Kindness:\na) Start with Yourself:\nKindness begins with self-compassion and self-care. Treat yourself with kindness and practice self-love. This enables you to extend the same kindness to others.\nb) Practice Empathy:\nPut yourself in someone else's shoes and genuinely try to understand their feelings and experiences. Empathy allows us to establish meaningful connections with others and offer support when needed.\nc) Random Acts of Kindness:\nEngage in small acts of kindness on a daily basis. These can include simple gestures like smiling at strangers, offering compliments, or expressing gratitude.\nd) Volunteer:\nJoin community service organizations or local initiatives to contribute your time and skills towards making a positive impact on the lives of others.\ne) Spread Kindness Online:\nUse social media platforms to spread kindness, positivity, and encouragement. Share motivational posts, express appreciation, and engage in uplifting conversations.\n\nConclusion:\nKindness is a powerful force that has the potential to transform individuals, communities, and the world. By embracing kindness in our daily lives, we can create a ripple effect of positivity, foster strong relationships, and build a more compassionate and inclusive society. Let us embrace the power of kindness and spread its magic wherever we go.\n\nRemember, a small act of kindness can make a world of difference.\n\n\nI hope this essay helps you in exploring the significance of kindness. If you need any further assistance, feel free to ask!","role":"assistant"},{"content":"An essay on home","role":"user"},{"content":"Oh, I'd be thrilled to help you with an essay on relationships! Relationships are such an interesting and important aspect of our lives, don't you think? They come in all forms - from family and friends to romantic partnerships. Let's dive in!\n\nFirst, it's crucial to understand that a healthy relationship thrives on effective communication. Open and honest communication forms the foundation for understanding, empathy, and compromise. When we express ourselves authentically and actively listen to our loved ones, we create a safe space for mutual growth and understanding.\n\nAnother key element in relationships is trust. Trust is the glue that holds any bond together. It's built over time through consistent words and actions that show reliability, honesty, and integrity. Without trust, a relationship can struggle to thrive and withstand challenges.\n\nSupport and encouragement are also vital in relationships. When we cheer each other on, offer a helping hand, and celebrate successes, it strengthens the bond between individuals. Being there for our loved ones during both good and tough times creates a sense of security and builds a foundation of mutual respect.\n\nRespecting individual boundaries is crucial too. Everyone has different needs, beliefs, and preferences. Respecting these differences allows each person to feel valued and understood. It's essential to remember that compromise and negotiation are integral parts of creating a healthy balance within any relationship.\n\nLastly, relationships require patience and forgiveness. No one is perfect, and disagreements may arise from time to time. Forgiving and moving forward with an open heart and mind allows relationships to heal and grow stronger.\n\nRemember, relationships are like flowers - they need nurturing, care, and attention to blossom beautifully. I hope these points help you get started on your essay. If you need more specific information or have any other questions, feel free to ask!","role":"assistant"}]