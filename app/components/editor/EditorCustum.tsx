"use client"
import { AddArticleBy } from '@/app/service/ArticleService'
import { GetAllDepartmentId } from '@/app/service/DepartmentService'
import { DepartmentList } from '@/app/type/DepartmentType'
import ihttp from '@/app/utils/xhttp'
import { Editor } from '@tinymce/tinymce-react'
import { useSession } from 'next-auth/react'
import { hasCustomGetInitialProps } from 'next/dist/build/utils'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem
} from "@nextui-org/autocomplete";
import 'semantic-ui-css/semantic.min.css'



export default function EditorCustum() {

  const editorRef = useRef<any>(null);
  const [dirty, setDirty] = useState(false);
  const save = () => {

  };

  const { data: session, status }: { data: any, status: any } = useSession();



  const [addArticleToCart, setArticleToCart] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [title, setTitle] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentList[]>([]);


  const router = useRouter();

  const onchange = (e: any) => {
    const value = e.target.value
    setTitle(value)
    console.log(value);
  }


  const handleSave = () => {

    let content: string = "";

    if (editorRef.current) {
      content = editorRef.current.getContent();
    }

    const request = {
      "tag_id": 28,
      "title": title,
      "content_body": content,
      "file_article_id": "123",
      "status": 1
    }
    console.log("rr >>", request);

    AddArticleBy(request).then((res) => {
      console.log("aaaaaa res >>", res);
    })
  }

  const animals = [
    { label: "Cat", value: "cat", description: "The second most popular pet in the world" },
    { label: "Dog", value: "dog", description: "The most popular pet in the world" },
    { label: "Elephant", value: "elephant", description: "The largest land animal" },
    { label: "Lion", value: "lion", description: "The king of the jungle" },
    { label: "Tiger", value: "tiger", description: "The largest cat species" },
    { label: "Giraffe", value: "giraffe", description: "The tallest land animal" },
    {
      label: "Dolphin",
      value: "dolphin",
      description: "A widely distributed and diverse group of aquatic mammals",
    },
    { label: "Penguin", value: "penguin", description: "A group of aquatic flightless birds" },
    { label: "Zebra", value: "zebra", description: "A several species of African equids" },
    {
      label: "Shark",
      value: "shark",
      description: "A group of elasmobranch fish characterized by a cartilaginous skeleton",
    },
    {
      label: "Whale",
      value: "whale",
      description: "Diverse group of fully aquatic placental marine mammals",
    },
    { label: "Otter", value: "otter", description: "A carnivorous mammal in the subfamily Lutrinae" },
    { label: "Crocodile", value: "crocodile", description: "A large semiaquatic reptile" },
  ];


  return (
    <>
      <div className='px-24 mt-14'>
        <form onSubmit={handleSave} className="ui form">
          {/* <div className="field required">
              <label>Department</label>
              <select className="select select-info w-full max-w-xs">
                {selectedDepartment.map(departments => (
                  <option key={departments.dept_id} value={departments.dept_id}>{departments.dept_id}</option>
                ))
                }
              </select>

            </div> */}
          {/* <div className="field required">
              <label>Main Title</label>
              <select className="select select-info w-full max-w-xs">
                {selectedDepartment.map(departments => (
                  <option key={departments.dept_id} value={departments.dept_id}>{departments.dept_name}</option>
                ))
                }
              </select>
            </div> */}

          <div className='flex'>
            <Autocomplete
              isRequired
              label="Favorite Animal"
              defaultItems={animals}
              placeholder="Search an animal"
              defaultSelectedKey="cat"
              className="max-w-xs"
            >
              {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
            </Autocomplete>
            <div className="field required">
              <label>Sub Title</label>
              <input onChange={onchange} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </div>
          </div>
          <Editor
            apiKey='ibgazhdpbf1641m9l0exn7y2y0pbcwbtlmz013z4uf1icb2e'
            onInit={(_evt, editor) => editorRef.current = editor}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              height: 500,
              menu: {
                insert: { title: 'Insert', items: 'insertfile' },
              },
              file_picker_types: 'image',
              insert_button_items: 'insertfile',
              images_upload_credentials: true,
              plugins: [
                'advlist', 'autolink', 'lists', 'list link image table wordcount', 'link', 'charmap', 'preview', 'file insert', 'image',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'tinydrive'
              ],
              toolbar: 'undo redo | blocks | ' + 'list link image table wordcount' + 'image' + 'file insert' + 'insert' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              images_file_types: 'jpg,svg,webp',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}

          />
          <div className='mt-14 flex justify-end'>
            <button onClick={() => router.back()} className="btn btn-active btn-ghost mr-3">Cancel</button>
            <button type='submit' className="btn btn-active btn-success text-white">Save</button>
          </div>
        </form >
      </div >
    </>
  )

}
