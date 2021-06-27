import React from 'react';

interface HeadProps {
  title: string;
  description: string;
}

export const Head = ({ title, description }: HeadProps) => {
  React.useEffect(() => {
    document.title = 'Let Me Ask | ' + title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', description || '');
  }, [title, description]);
  return <></>;
};
