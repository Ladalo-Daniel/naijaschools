import React from 'react'
import { Card } from '../ui/card';

export default function Section3() {
    const data = [
        {
          sn: 1,
          title: "Blalalalalalalalalala",
          content: "Lorem blalalalalalalalalalalalalalalalalalal",
        },
        {
          sn: 2,
          title: "Blalalalalalalalalala",
          content: "Lorem blalalalalalalalalalalalalalalalalalal",
          isHighlighted: true,

        },
        {
          sn: 3,
          title: "Blalalalalalalalalala",
          content: "Lorem blalalalalalalalalalalalalalalalalalal",
        },
      ];
  return (
    <section className='flex flex-col gap-9 md:items-center px-4 md:px-20'>
       <div>Entry level and intermediate training and up-skill programs</div>
       {/* WHAT YOU STAND TO GAIN DIV */}
       <div className=' flex flex-col md:flex-row gap-2'>
       {data.map((item, index)=>(
        <Card key={index} className={`p-9 ${item.isHighlighted ? "is-highlighted-style bg-orange-100" : "is-not-highlighted bg-orange-50"}`}>
            <h1>0{item.sn}</h1>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
        </Card>
       ))}
       </div>
    </section>
  )
}
