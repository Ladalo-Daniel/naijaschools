import React from 'react';
import Link from 'next/link';

const processPostContent = (content: string): React.ReactElement => {
  const paragraphs = content?.split('\n\n')
  const processedContent = paragraphs?.map((paragraph, index) => {
    const words = paragraph?.split(' ');

    const processedParagraph = words?.map((word, wordIndex) => {
      if (word.startsWith('#')) {
        const hashTag = word?.slice(1);

        return (
          <Link href={`/dashboard/search?q=${hashTag}`} className='text-primary' key={wordIndex + hashTag}>
            {word}{' '}
          </Link>
        );
      } else if (word?.startsWith('@')) {
        const username = word?.slice(1);

        return (
          <Link href={`/dashboard/profile/${username}`} className='text-primary' key={wordIndex + username}>
            {word}{' '}
          </Link>
        );
      } else if (word.match(/^https?:\/\//)) {
        // Matching links starting with http:// or https://
        return (
          <Link href={word} target="_blank" className='text-primary-500' rel="noopener noreferrer" key={`link_${index}_${wordIndex}`}>
            {word}{' '}
          </Link>
        );
      } else {
        return <span key={wordIndex}>{word}{' '}</span>;
      }
    })

    const flattenedProcessedParagraph = processedParagraph?.flat();

    return (
      <p key={index} className='py-2'>
        {flattenedProcessedParagraph}
      </p>
    );
  });

  return <>{processedContent}</>;
};

export default processPostContent;