"use client"
import EditorBlockNote from '@/app/components/About/EditorBlockNote';
import { useEffect, useState } from 'react';

const WelcomePage = ({ }) => {
  const [welcomeMessage, setWelcomeMessage] = useState<string>('');

  // useEffect(() => {
  //   GetArticleById(294).then((response) => {
  //     console.log(response);
  //   })
  // }, []);

  return (
    <div>
      <h1>Welcome Page</h1>
      <EditorBlockNote />
    </div>
  );
};

export default WelcomePage;
