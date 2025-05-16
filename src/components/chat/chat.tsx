import React from 'react'

interface ChatProps {
    title: string;
    content: string;
    className?: string;
}

export default function Chat({title, content, className}: ChatProps) {
  return (
    <div className={`bg-foreground text-background p-5 rounded-2xl max-w-100 ${className}`}>
        <h1 className="text-sm">{title}</h1>
        <p className='text-xs'>{content}</p>
    </div>
  )
}