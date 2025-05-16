import React from 'react';

type Props = {
  content: string;
};

export default function SoftAlert({ content }: Props) {
  return (
    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10 bg-yellow-100 text-yellow-800 px-4 py-3 rounded-lg shadow-md border border-yellow-300">
      {content}
    </div>
  );
}
