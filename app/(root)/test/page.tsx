"use client"
import EditorBlockNote from '@/app/components/About/EditorBlockNote';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from '@nextui-org/react';
import { useEffect, useState } from 'react';

const rows = [
  {
      key: "1",
      name: "Tony Reichert",
      role: "CEO",
      status: "Active",
  },
  {
      key: "2",
      name: "Zoey Lang",
      role: "Technical Lead",
      status: "Paused",
  },
  {
      key: "3",
      name: "Jane Fisher",
      role: "Senior Developer",
      status: "Active",
  },
  {
      key: "4",
      name: "William Howard",
      role: "Community Manager",
      status: "Vacation",
  },
];

const columns = [
  {
      key: "name",
      label: "NAME",
  },
  {
      key: "role",
      label: "ROLE",
  },
  {
      key: "status",
      label: "STATUS",
  },
];

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
