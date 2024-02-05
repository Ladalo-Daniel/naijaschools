import React from 'react';
import Link from 'next/link';

const processScholarshipContent = (content: string): React.ReactElement => {
  const paragraphs = content?.split('\n\n')
  const processedContent = paragraphs?.map((paragraph, index) => {
    const words = paragraph?.split(' ');

    const processedParagraph = words?.map((word, wordIndex) => {
      if (word.startsWith('#')) {
        const h1Tag = word?.slice(1);

        return (
          <h1 className='text-primary font-semibold' key={wordIndex + h1Tag}>
            {word}{' '}
          </h1>
        );
      } else if (word?.startsWith('##')) {
        const h2Tag = word?.slice(2);

        return (
          <h2 className='text-primary font-semibold' key={wordIndex + h2Tag}>
            {word}{' '}
          </h2>
        );
      } else if (word?.startsWith('*')) {
        const pTag = word?.slice(1);

        return (
          <p className='text-primary' key={wordIndex + pTag}>
            {word}{' '}
          </p>
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

export default processScholarshipContent;