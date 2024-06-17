'use client'
import { useState } from "react"

function Page() {
    const [name, setName] = useState('Ek Sarayuth');
    const [department, setDepartment] = useState('Biz Web');
    const [position, setPosition] = useState('Software Engineer');
    const [score, setScore] = useState('0');
    const [comments, setComments] = useState('');

    return (
        <>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>
                <thead>
                    <tr>
                        <th colSpan={6} style={{ textAlign: 'left', backgroundColor: 'black', color: 'white', padding: '5px' }}>
                            <span style={{ fontWeight: 'normal' }}>Evaluator:</span> Ek Sarayuth
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={6} style={{ backgroundColor: '#ffcc00', padding: '10px' }}>
                            <strong>Evaluatee</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: '10px' }}>
                            <label><strong>Name</strong></label>
                        </td>
                        <td style={{ padding: '10px' }}>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ width: '100%', padding: '5px' }}
                            />
                        </td>
                        <td style={{ padding: '10px' }}>
                            <label><strong>Department</strong></label>
                        </td>
                        <td style={{ padding: '10px' }}>
                            <input
                                type="text"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                style={{ width: '100%', padding: '5px' }}
                            />
                        </td>
                        <td style={{ padding: '10px' }}>
                            <label><strong>Position</strong></label>
                        </td>
                        <td style={{ padding: '10px' }}>
                            <input
                                type="text"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                style={{ width: '100%', padding: '5px' }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={6} style={{ backgroundColor: '#ffcc00', padding: '10px' }}>
                            <strong>Evaluation Content</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ width: '20%', padding: '10px', textAlign: 'center', fontSize: '24px', backgroundColor: '#ffcc00' }}>
                            <label><strong>Score</strong></label>
                            <div style={{ marginTop: '10px' }}>
                                <input
                                    type="number"
                                    value={score}
                                    onChange={(e) => setScore(e.target.value)}
                                    style={{ width: '100%', padding: '10px', fontSize: '24px', textAlign: 'center', backgroundColor: '#d3d3d3', border: 'none' }}
                                />
                            </div>
                        </td>
                        <td colSpan={5} style={{ width: '80%', padding: '10px', verticalAlign: 'top' }}>
                            - Please evaluate yourself objectively and fairly by carefully thinking through and scoring each evaluation's items.
                            <br />
                            - Please write comments in the [Evaluation Reasoning / Other Comments] below.
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={5} style={{ padding: '10px', backgroundColor: '#ff9999' }}>
                            <strong style={{ color: 'red' }}>[Evaluation Reasoning / Other Comments]</strong>
                            <div style={{ marginTop: '5px' }}>
                                <textarea
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                    style={{ width: '100%', padding: '10px', color: 'grey', border: 'none', backgroundColor: '#ff9999' }}
                                />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={6} style={{ padding: '10px', backgroundColor: '#ffcc00' }}>
                            <strong style={{ color: 'red' }}>[Manager ONLY]</strong> I would recommend he/she be promoted this year
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default Page