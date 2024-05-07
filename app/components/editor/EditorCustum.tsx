"use client"
import { AddArticleBy } from '@/app/service/ArticleService'
import { GetAllDepartmentId } from '@/app/service/DepartmentService'
import { DepartmentList } from '@/app/type/DepartmentType'
import ihttp from '@/app/utils/xhttp'
import { Editor } from '@tinymce/tinymce-react'
import { hasCustomGetInitialProps } from 'next/dist/build/utils'
import { useRouter } from 'next/navigation'
import React, { useEffect,useRef,useState } from 'react'

import 'semantic-ui-css/semantic.min.css'



export default function EditorCustum() {

  const editorRef = useRef(null);
  
  const [addArticleToCart, setArticleToCart] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentList[]>([]);
    const fetchData = async () =>{
      try {
        const url = await ihttp.get('http://localhost:4545/api/v1/department/AllDepartment');
        setSelectedDepartment(url.data.rec);
      } catch (e) {
        //setLoading(false)
      }
    };
    fetchData();
  
  const addDepartment = async () =>{
    const  dept_name  = (document.getElementById('saveArticle') as HTMLInputElement).value;
         const   created_by = 'Admin'
        
        try {
            console.log(dept_name)
            if(dept_name === ''){
                alert("Department Can't be empty")
                return;
            }else{
                const url = await ihttp.post('http://localhost:4545/api/v1/department/insertDepartment',{ dept_name , created_by })
                fetchData();
            }
            
        } catch (error) {
            console.log(error)

        }
  }


  const router = useRouter();

  return (
    <>
      <div className='px-24 mt-14'>
        <form className="ui form">
          <div className="three fields">
            <div className="field">
                <label>Department</label>
                <select className="select select-info w-full max-w-xs">
                  {selectedDepartment.map(departments =>(
                    <option key={departments.dept_id} value={departments.dept_id}>{departments.dept_id}</option>
                    ))
                  }
                </select>
                
            </div>
            <div className="field">
              <label>Main Title</label>
              <select className="select select-info w-full max-w-xs">
                {selectedDepartment.map(departments =>(
                    <option key={departments.dept_id} value={departments.dept_id}>{departments.dept_name}</option>
                    ))
                  }
              </select>
            </div>
            <div className="field btn " style={{ width: "55px", display: "flex", alignSelf: "center", marginBottom: "-22px" }}>
              <button className="btn btn-active" id='addArticle'>
                Add
              </button>
            </div>
            <div className="field required">
              <label>Sub Title</label>
              <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </div>
          </div>
          <Editor
            apiKey='ibgazhdpbf1641m9l0exn7y2y0pbcwbtlmz013z4uf1icb2e'
           // onInit={(_evt, editor) => editorRef.current = editor}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
        </form>
        <div className='mt-14 flex justify-end'>
          <button onClick={() => router.back()} className="btn btn-active btn-ghost mr-3">Cancel</button>
          <button className="btn btn-active btn-success text-white" id='saveArticle'>Save</button>
        </div>
      </div>
    </>
  )

}
