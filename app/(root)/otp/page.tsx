"use client"
import { useEffect, useState } from 'react';

const WelcomePage = () => {
  const [welcomeMessage, setWelcomeMessage] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4545/api/v1/admin/welcome');
        if (!response.ok) {
          throw new Error('Failed to fetch welcome message');
        }
        const data = await response.text();
        setWelcomeMessage(data);
      } catch (error) {
        console.error('Error fetching welcome message:', error);
        setWelcomeMessage('Failed to fetch welcome message');
      }
    };

    fetchData(); 
  }, []);

  return (
    <div>
      <h1>Welcome Page</h1>
      <p>{welcomeMessage}</p>
    </div>
  );
};

export default WelcomePage;
