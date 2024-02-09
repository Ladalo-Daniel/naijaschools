import React from 'react';
import processScholarshipContent from './ProcessScholarshipContent';

interface processScholarshipContentProps {
  content: string;
}

const ProcessedScholarship: React.FC<processScholarshipContentProps> = ({ content }) => {
  const processedContent = processScholarshipContent(content);

  return <>{processedContent}</>;
};

export default ProcessedScholarship;