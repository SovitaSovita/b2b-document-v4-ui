"use client";
import React, { useState } from 'react'

function page() {
  const [value, setValue] = useState("0");
  const handleChange = (e:any) => {
    const inputVal = e.target.value 
    setValue(inputVal);
  };
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead >
          <tr >
            <th></th>
            <th></th>
            <th></th>
            <th style={{background: "#efefef"}} className="font-bold">
              <input type="text" style={{background: "#efefef"}} className="font-bold" value={value} onChange={handleChange} />
            </th>
            
          </tr>
          <tr style={{ backgroundColor: "#212937", color: "aliceblue" }}>
            <th>Section</th>
            <th>Max Score for Each Current Position </th>
            <th>Evaluation Content</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <td style={{background: "#efefef"}}>
              <div className="flex items-center gap-10" >
                <div>
                
                </div>
              </div>
            </td>
            <td style={{background: "#dddddd"}}>
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
            <td style={{background: "#efefef"}}>
            </td>
            <td style={{background: "#efefef"}}></td>
          </tr>
          <tr>
            <td className="font-bold" style={{background: "#efefef"}}>1. Capacity / Technical Capacity</td>
            <td style={{background: "#efefef"}}>
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
            <td style={{background: "#efefef"}}> 

            </td>
            <td style={{background: "#efefef"}}>
              <input type="text" style={{background: "#efefef"}} className="font-bold" value={value} onChange={handleChange} />
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
            <td style={{background:"#cadbca"}}>
              <input type="text" style={{background:"#cadbca"}} className="font-bold" value={value} onChange={handleChange} />
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
            <td style={{background:"#cadbca"}}>
              <input type="text" className="font-bold" style={{background:"#cadbca"}} value={value} onChange={handleChange} />
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
            <td style={{background:"#cadbca"}}>
              <input type="text" style={{background:"#cadbca"}} className="font-bold" value={value} onChange={handleChange} />
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
            <td style={{background:"#cadbca"}}>
              <input type="text" style={{background:"#cadbca"}} className="font-bold" value={value} onChange={handleChange} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default page