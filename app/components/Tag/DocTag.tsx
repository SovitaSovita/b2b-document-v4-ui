"use client"
import { useState, useEffect } from 'react';

interface TagItem {
    id: number;
    title: string;
}

export default function DocTag() {
    const [options, setOptions] = useState<TagItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4545/api/v1/DocTag/getTagByDepId?dept_id=56');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const responseData = await response.json();
                if (responseData.error === false) {

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
    }, []);

    return (
        <>
            <select className="select w-full max-w-xs">
                {options.map((option, index) => (
                    <option key={index} value={option.id}>{option.title}</option>
                ))}
            </select>

            <li className='mb-2'>
                <details>
                    <summary className="border shadow font-semibold text-[15px]">
                        {/* <BookmarksOutlinedIcon /> */}

                    </summary>
                    <ul className='pt-1'>
                        <li><a>test</a></li>
                    </ul>
                </details>
            </li>
        </>
    );
}
