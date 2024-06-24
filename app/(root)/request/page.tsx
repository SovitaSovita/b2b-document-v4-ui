"use client";
import React, { useState } from 'react'
import formimg from '../../../public/Picture1.png'
import Image from 'next/image';

function Page() {
  const [value, setValue] = useState("0");
  const handleChange = (e: any) => {
    const inputVal = e.target.value
    setValue(inputVal);
  };
  return (
      <div className="inset-0 overflow-auto">
        <table className="table table-xs">
          {/* head */}
          <thead >
            <tr >
              <th></th>
              <th></th>
              <th></th>
              <th style={{ background: "#efefef", color: "#e2e9ef" }} className="font-bold">
                <input type="text" style={{ background: "#efefef" }} className="font-bold" value={value} onChange={handleChange} />
              </th>

            </tr>
            <tr style={{ backgroundColor: "#212937" }}>
              <th>Section</th>
              <th>Max Score for Each Current Position </th>
              <th>Evaluation Content</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td style={{ background: "#efefef" }}>
                <div className="flex items-center gap-10" >
                  <div>

                  </div>
                </div>
              </td>
              <td style={{ background: "#dddddd" }}>
                <div className="flex items-center gap-9" >
                  <div>
                    <div className="font-bold">L-4</div>
                  </div>
                  <div>
                    <div className="font-bold">L-3</div>
                  </div>
                  <div>
                    <div className="font-bold">L-2</div>
                  </div>
                  <div>
                    <div className="font-bold">L-1</div>
                  </div>
                </div>
              </td>
              <td style={{ background: "#efefef" }}>
              </td>
              <td style={{ background: "#efefef" }}></td>
            </tr>
            <tr>
              <td className="font-bold" style={{ background: "#efefef" }}>1. Capacity / Technical Capacity</td>
              <td style={{ background: "#efefef" }}>
                <div className="flex items-center gap-10" >
                  <div>
                    <div className="font-bold">34</div>
                  </div>
                  <div>
                    <div className="font-bold">44</div>
                  </div>
                  <div>
                    <div className="font-bold">34</div>
                  </div>
                  <div>
                    <div className="font-bold">44</div>
                  </div>
                </div>
              </td>
              <td style={{ background: "#efefef" }}>

              </td>
              <td style={{ background: "#efefef" }}>
                <input type="text" style={{ background: "#efefef" }} className="font-bold" value={value} onChange={handleChange} />
              </td>
            </tr>
            {/* row 2 */}
            <tr>
              <td>
                <div className="font-bold">Work Ability</div>
              </td>
              <td>
                <div className="flex items-center gap-10">
                  <div>
                    <div className="font-bold"> 45</div>
                  </div>
                  <div>
                    <div className="font-bold"> 35</div>
                  </div>
                  <div>
                    <div className="font-bold"> 45</div>
                  </div>
                  <div>
                    <div className="font-bold"> 35</div>
                  </div>
                </div>
              </td>
              <td>  Agile/Fast Work Speed, Persistence regardless of works' difficulty, Efficiency in handling works</td>
              <td style={{ background: "#cadbca" }}>
                <input type="text" style={{ background: "#cadbca" }} className="font-bold" value={value} onChange={handleChange} />
              </td>
            </tr>
            {/* row 3 */}
            <tr>
              <td className="font-bold">Work Result</td>
              <td>
                <div className="flex items-center gap-10">
                  <div>
                    <div className="font-bold">55</div>
                  </div>
                  <div>
                    <div className="font-bold">51</div>
                  </div>
                  <div>
                    <div className="font-bold">55</div>
                  </div>
                  <div>
                    <div className="font-bold">51</div>
                  </div>
                </div>

              </td>
              <td> Handle works with attention to detail, deliver high quality result within deadline</td>
              <td style={{ background: "#cadbca" }}>
                <input type="text" className="font-bold" style={{ background: "#cadbca" }} value={value} onChange={handleChange} />
              </td>
            </tr>
            {/* row 4 */}
            <tr>
              <td className="font-bold">Problem Solving Ability</td>
              <td>
                <div className="flex items-center gap-10">
                  <div>
                    <div className="font-bold">24</div>
                  </div>
                  <div>
                    <div className="font-bold">74</div>
                  </div>
                  <div>
                    <div className="font-bold">24</div>
                  </div>
                  <div>
                    <div className="font-bold">74</div>
                  </div>
                </div>
              </td>
              <td> Ability to accurately understand the nature of the complex problems, and establish direction and countermeasures to make quick decisions</td>
              <td style={{ background: "#cadbca" }}>
                <input type="text" style={{ background: "#cadbca" }} className="font-bold" value={value} onChange={handleChange} />
              </td>
            </tr>

            {/* row 5 */}
            <tr>
              <td className="font-bold">Growth Potential</td>
              <td>
                <div className="flex items-center gap-10">
                  <div>
                    <div className="font-bold">24</div>
                  </div>
                  <div>
                    <div className="font-bold">74</div>
                  </div>
                  <div>
                    <div className="font-bold">24</div>
                  </div>
                  <div>
                    <div className="font-bold">74</div>
                  </div>
                </div>
              </td>
              <td >  Ability to learn and adapt quickly especially to new works, and possess high self-development efforts</td>
              <td style={{ background: "#cadbca" }}>
                <input type="text" style={{ background: "#cadbca" }} className="font-bold" value={value} onChange={handleChange} />
              </td>
            </tr>
            <br></br>
            <tr>
              <td className="font-bold" style={{ background: "#efefef" }}>2. Attitude</td>
              <td style={{ background: "#efefef" }}>
                <div className="flex items-center gap-10" >
                  <div>
                    <div className="font-bold">25</div>
                  </div>
                  <div>
                    <div className="font-bold">20</div>
                  </div>
                  <div>
                    <div className="font-bold">10</div>
                  </div>
                  <div>
                    <div className="font-bold">15</div>
                  </div>
                </div>
              </td>
              <td style={{ background: "#efefef" }}>
              </td>
              <td style={{ background: "#efefef" }}>
                <input type="text" style={{ background: "#efefef" }} className="font-bold" value={value} onChange={handleChange} />
              </td>
            </tr>
            {/* row 1 */}
            <tr>
              <td className="font-bold">Absent and Tardiness</td>
              <td>
                <div className="flex items-center gap-10">
                  <div>
                    <div className="font-bold">8.3</div>
                  </div>
                  <div>
                    <div className="font-bold">6.7</div>
                  </div>
                  <div>
                    <div className="font-bold">3.3</div>
                  </div>
                  <div>
                    <div className="font-bold">5.0</div>
                  </div>
                </div>
              </td>
              <td>  Lateness, Early Leave, Absence (the low frequency of these, the higher score)</td>
              <td style={{ background: "#cadbca" }}>
                <input type="text" style={{ background: "#cadbca" }} className="font-bold" value={value} onChange={handleChange} />
              </td>
            </tr>
            {/* row 2 */}
            <tr>
              <td className="font-bold">Discipline</td>
              <td>
                <div className="flex items-center gap-10">
                  <div>
                    <div className="font-bold">8.3</div>
                  </div>
                  <div>
                    <div className="font-bold">6.7</div>
                  </div>
                  <div>
                    <div className="font-bold">3.3</div>
                  </div>
                  <div>
                    <div className="font-bold">5.0</div>
                  </div>
                </div>
              </td>
              <td>  Follow company rules, guide, and regulations</td>
              <td style={{ background: "#cadbca" }}>
                <input type="text" style={{ background: "#cadbca" }} className="font-bold" value={value} onChange={handleChange} />
              </td>
            </tr>
            {/* row 3 */}
            <tr>
              <td className="font-bold">Behavior and Outfit</td>
              <td>
                <div className="flex items-center gap-10">
                  <div>
                    <div className="font-bold">8.3</div>
                  </div>
                  <div>
                    <div className="font-bold">6.7</div>
                  </div>
                  <div>
                    <div className="font-bold">3.3</div>
                  </div>
                  <div>
                    <div className="font-bold">5.0</div>
                  </div>
                </div>
              </td>
              <td> Good behavior and attitude at work, able to manage personal apperance properly including dressing suitably for working envvironment</td>
              <td style={{ background: "#cadbca" }}>
                <input type="text" style={{ background: "#cadbca" }} className="font-bold" value={value} onChange={handleChange} />
              </td>
            </tr>
            <br></br>
            <tr>
              <td className="font-bold" style={{ background: "#efefef" }}>3. Collaboration</td>
              <td style={{ background: "#efefef" }}>
                <div className="flex items-center gap-10" >
                  <div>
                    <div className="font-bold">25</div>
                  </div>
                  <div>
                    <div className="font-bold">20</div>
                  </div>
                  <div>
                    <div className="font-bold">10</div>
                  </div>
                  <div>
                    <div className="font-bold">15</div>
                  </div>
                </div>
              </td>
              <td style={{ background: "#efefef" }}>
              </td>
              <td style={{ background: "#efefef" }}>
                <input type="text" style={{ background: "#efefef" }} className="font-bold" value={value} onChange={handleChange} />
              </td>
            </tr>
            {/* row 1 */}
            <tr>
              <td className="font-bold">Intra-Team</td>
              <td>
                <div className="flex items-center gap-10">
                  <div>
                    <div className="font-bold">12.5</div>
                  </div>
                  <div>
                    <div className="font-bold">10</div>
                  </div>
                  <div>
                    <div className="font-bold">7.5</div>
                  </div>
                  <div>
                    <div className="font-bold">7.5</div>
                  </div>
                </div>
              </td>
              <td>  Improve team efficiency, effectiveness, and productivity by cooperating well with colleagues and superior within the team</td>
              <td style={{ background: "#cadbca" }}>
                <input type="text" style={{ background: "#cadbca" }} className="font-bold" value={value} onChange={handleChange} />
              </td>
            </tr>
            {/* row 2 */}
            <tr>
              <td className="font-bold">Inter-Team</td>
              <td>
                <div className="flex items-center gap-10">
                  <div>
                    <div className="font-bold">12.5</div>
                  </div>
                  <div>
                    <div className="font-bold">10</div>
                  </div>
                  <div>
                    <div className="font-bold">7.5</div>
                  </div>
                  <div>
                    <div className="font-bold">7.5</div>
                  </div>
                </div>
              </td>
              <td>   Ability to communicate and cooperate effectively with other teams' members </td>
              <td style={{ background: "#cadbca" }}>
                <input type="text" style={{ background: "#cadbca" }} className="font-bold" value={value} onChange={handleChange} />
              </td>
            </tr>
            <br></br>
            <tr>
              <td className="font-bold" style={{ background: "#efefef" }}>4. Leadership</td>
              <td style={{ background: "#efefef" }}>
                <div className="flex items-center gap-10" >
                  <div>
                    <div className="font-bold">15</div>
                  </div>
                  <div>
                    <div className="font-bold">20</div>
                  </div>
                  <div>
                    <div className="font-bold">25</div>
                  </div>
                  <div>
                    <div className="font-bold">25</div>
                  </div>
                </div>
              </td>
              <td style={{ background: "#efefef" }}>
              </td>
              <td style={{ background: "#efefef" }}>
                <input type="text" style={{ background: "#efefef" }} className="font-bold" value={value} onChange={handleChange} />
              </td>
            </tr>
            {/* row 1 */}
            <tr>
              <td className="font-bold">Communication</td>
              <td>
                <div className="flex items-center gap-10">
                  <div>
                    <div className="font-bold">7.5</div>
                  </div>
                  <div>
                    <div className="font-bold">10</div>
                  </div>
                  <div>
                    <div className="font-bold">12.5</div>
                  </div>
                  <div>
                    <div className="font-bold">12.5</div>
                  </div>
                </div>
              </td>
              <td>Ability to report a clear and focused argument points, actively and respectively listen to each other's opinions, collaborate with colleagues, and willing to take care of other colleagues</td>
              <td style={{ background: "#cadbca" }}>
                <input type="text" style={{ background: "#cadbca" }} className="font-bold" value={value} onChange={handleChange} />
              </td>
            </tr>
            {/* row 2 */}
            <tr>
              <td className="font-bold">Responsibility</td>
              <td>
                <div className="flex items-center gap-10">
                  <div>
                    <div className="font-bold">12.5</div>
                  </div>
                  <div>
                    <div className="font-bold">10</div>
                  </div>
                  <div>
                    <div className="font-bold">7.5</div>
                  </div>
                  <div>
                    <div className="font-bold">7.5</div>
                  </div>
                </div>
              </td>
              <td> When problems arise, resist to dodge/avoid problems by taking responsibility and try to give the best efforts to encounter the problems</td>
              <td style={{ background: "#cadbca" }}>
                <input type="text" style={{ background: "#cadbca" }} className="font-bold" value={value} onChange={handleChange} />
              </td>
            </tr>
            <br></br>
            <tr>
              <td className="font-bold" style={{ background: "#efefef" }}>5.Ownership Mindset</td>
              <td style={{ background: "#efefef" }}>
                <div className="flex items-center gap-10" >
                  <div>
                    <div className="font-bold">10</div>
                  </div>
                  <div>
                    <div className="font-bold">20</div>
                  </div>
                  <div>
                    <div className="font-bold">20</div>
                  </div>
                  <div>
                    <div className="font-bold">20</div>
                  </div>
                </div>
              </td>
              <td style={{ background: "#efefef" }}>
              </td>
              <td style={{ background: "#efefef" }}>
                <input type="text" style={{ background: "#efefef" }} className="font-bold" value={value} onChange={handleChange} />
              </td>
            </tr>
            {/* row 1 */}
            <tr>
              <td className="font-bold">Communication</td>
              <td>
                <div className="flex items-center gap-10">
                  <div>
                    <div className="font-bold">10</div>
                  </div>
                  <div>
                    <div className="font-bold">20</div>
                  </div>
                  <div>
                    <div className="font-bold">20</div>
                  </div>
                  <div>
                    <div className="font-bold">20</div>
                  </div>
                </div>
              </td>
              <td> Work, anticipate, act, and contribute to the development of the company</td>
              <td style={{ background: "#cadbca" }}>
                <input type="text" style={{ background: "#cadbca" }} className="font-bold" value={value} onChange={handleChange} />
              </td>
            </tr>
          </tbody>
        </table>
        <br></br>
        <div>
          <Image src={formimg} alt="img" />
        </div>
      </div>
    
  )
}

export default Page