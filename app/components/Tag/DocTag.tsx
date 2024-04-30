"use client"
import { useState, useEffect } from 'react';

// Define an interface for the item structure
interface TagItem {
    id: number;
    title: string;
}

export default function DocTag() {
    const [options, setOptions] = useState<TagItem[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4545/api/v1/DocTag/getTagByDepId?dept_id=1');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const responseData = await response.json();
                if (responseData.error === false) {
                    // Access the "rec" property which holds the array of items
                    const data: TagItem[] = responseData.rec;
                    setOptions(data);
                } else {
                    console.error('Error in response:', responseData.message);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, []); // Empty dependency array ensures this effect runs only once on component mount
    
    return (
        <>
            <select className="select w-full max-w-xs">
                {options.map((option, index) => (
                    <option key={index} value={option.id}>{option.title}</option>
                ))}
            </select>
        </>
    );
}
