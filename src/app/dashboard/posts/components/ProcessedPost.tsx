import ProcessPostContent from './ProcessPostContent';
import React from 'react';

interface ProcessedPostProps {
  content: string;
}

const ProcessedPost: React.FC<ProcessedPostProps> = ({ content }) => {
  const processedContent = ProcessPostContent(content);

  return <>{processedContent}</>;
};

export default ProcessedPost;