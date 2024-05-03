"use client"
import { GetArticleById } from '@/app/service/ArticleService'
import { Editor } from '@tinymce/tinymce-react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import 'semantic-ui-css/semantic.min.css'



export default function EditorCustum() {

  const mySelectComponent = () => {
    const [selectedOption, setSelectedOption] = useState(options[0].value); // Set initial selected option
  
    useEffect(() => {
      async function fetchData(){
        
      }
    })
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
                <option>B2B</option>
                <option>Mobile</option>
                <option>Infra</option>
              </select>
            </div>
            <div className="field">
              <label>Main Title</label>
              <select className="select select-info w-full max-w-xs">
                <option>B2B</option>
                <option>Mobile</option>
                <option>Infra</option>
              </select>
            </div>
            <div className="field btn " style={{ width: "55px", display: "flex", alignSelf: "center", marginBottom: "-22px" }}>
              <button className="btn">
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
            init={{
              plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
              tinycomments_mode: 'embedded',
              tinycomments_author: 'Author name',
              mergetags_list: [
                { value: 'First.Name', title: 'First Name' },
                { value: 'Email', title: 'Email' },
              ],

            }}
            initialValue="Welcome to TinyMCE!"
          />
        </form>
        <div className='mt-14 flex justify-end'>
          <button onClick={() => router.back()} className="btn btn-active btn-ghost mr-3">Cancel</button>
          <button className="btn btn-active btn-success text-white">Save</button>
        </div>
      </div>
    </>
  )
}
