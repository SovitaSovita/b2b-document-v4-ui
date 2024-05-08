import React from 'react'

function NoProfileComponent({ username }: any) {
    const parts = username.split(" ");

    // Initialize result string
    let result = "";

    // Iterate over each part
    parts.forEach(part => {
        // Get the first letter of the part
        const firstLetter = part.charAt(0);

        // Concatenate the first letter to the result
        result += firstLetter;
    });

    return (
        <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-10">
                <span>{username}</span>
            </div>
        </div>
    )
}

export default NoProfileComponent