import React from 'react'

function NoProfileComponent({ username, size }: any) {
    const parts = username.split(" ");

    let result = "";

    parts.forEach((part: string) => {
        const firstLetter = part.charAt(0);
        result += firstLetter;
    });

    return (
        <div className="avatar placeholder">
            <div className={`bg-neutral text-neutral-content rounded-full ${size}`}>
                <span>{result}</span>
            </div>
        </div>
    )
}

export default NoProfileComponent