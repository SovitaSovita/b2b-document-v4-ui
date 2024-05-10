"use client"
import { AddArticleBy } from '@/app/service/ArticleService'
import { GetAllDepartmentId } from '@/app/service/DepartmentService'
import { GetTagAndArticle } from '@/app/service/TagService'
import { DepartmentList } from '@/app/type/DepartmentType'
import ihttp from '@/app/utils/xhttp'
import { Autocomplete, Popper, TextField } from '@mui/material'
import { Editor } from '@tinymce/tinymce-react'
import { useSession } from 'next-auth/react'
import { hasCustomGetInitialProps } from 'next/dist/build/utils'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import CustomAlert from '../Material/CustomAlert'



export default function EditorCustum() {

  const editorRef = useRef<any>(null);


  const [tagValue, setTagValue] = React.useState<TagType | any>();
  const [inputValue, setInputValue] = React.useState('');
  const { data: session, status }: { data: any, status: any } = useSession();
  const [isErrorAlert, setIsErrorAlert] = useState({
    open: false,
    type: "",
    message: "",
    duration: 1600,
  });

  const [isErrorInput, setIsErrorInput] = useState({
    error: false,
    label: "Enter Sub title",
  });

  const [tagData, setTagData] = useState([]);
  const [title, setTitle] = useState("");


  const router = useRouter();

  const onchange = (e: any) => {
    const value = e.target.value
    setTitle(value)
  }


  const handleSave = (e: any) => {

    e.preventDefault();

    let content: string = "";

    if (editorRef.current) {
      content = editorRef.current.getContent();
    }

    if (!tagValue) {
      setIsErrorAlert({
        ...isErrorAlert,
        open: true,
        type: "error",
        message: "Tag name can't empty.",
      });
      return;
    }

    if (title === "") {
      setIsErrorInput({
        error: true,
        label: 'Enter Sub title',
      })
      return;
    }

    const request = {
      "tag_id": tagValue?.id,
      "title": title,
      "content_body": content,
      "file_article_id": "123",
      "status": 1
    }

    AddArticleBy(request).then((res: any) => {
      if (res.status == 200) {
        setIsErrorAlert({
          ...isErrorAlert,
          open: true,
          type: "success",
          message: "Created Successfully.",
        });
        router.push("/")
      }
      else {
        setIsErrorAlert({
          ...isErrorAlert,
          open: true,
          type: "error",
          message: "Something wrong...",
        });

      }
    })
  }

  useEffect(() => {
    console.log(parseInt(session?.user.dvsn_CD, 10));
    if (session) {
      GetTagAndArticle(parseInt(session?.user.dvsn_CD, 10)).then((res: any) => {
        const updatedTagList = res?.data?.rec?.tagList.map((tag: any) => ({
          ...tag,
          label: tag.title,
        }));

        setTagData(updatedTagList)
      })
    }
  }, [session])

  return (
    <>
      <CustomAlert
        open={isErrorAlert.open}
        setOpen={(open: boolean) => {
          setIsErrorAlert({ ...isErrorAlert, open });
        }}
        message={isErrorAlert.message}
        type={isErrorAlert.type}
        duration={isErrorAlert.duration}
      />
      <div className='px-24 mt-14'>
        <form onSubmit={handleSave} className="ui form">
          <div className='flex mb-4'>
            <div className='flex items-center mr-8'>
              <Autocomplete
                value={tagValue}
                onChange={(event: any, newValue: string | null) => {
                  setTagValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                disablePortal
                size="small"
                id="combo-box-demo"
                options={tagData}
                sx={{ width: 300, mr: 2 }}
                renderInput={(params) => <TextField {...params} label="Enter Tag name" />}
              />
              <button type='button' className="btn btn-active btn-primary btn-sm">Add New</button>
            </div>


            <TextField
              error={isErrorInput.error}
              onChange={onchange}
              id="outlined-basic"
              size='small'
              label={isErrorInput.label}
              variant="outlined"
              autoFocus
            // helperText="Incorrect entry."
            />
          </div>
          <Editor
            apiKey='51cakyf7l011kd34r23bib5jrvh79lb520v82wpid72wq92n'
            onInit={(_evt, editor) => editorRef.current = editor}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              height: 500,
              menu: {
                insert: { title: 'Insert', items: 'insertfile' },
              },
              plugins: [
                'advlist', 'autolink', 'lists', 'list link image table wordcount', 'link', 'charmap', 'preview', 'file insert', 'image',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'tinydrive'
              ],
              toolbar: 'undo redo | blocks | ' + 'list link image table wordcount' + 'image' + 'file insert' + 'insert' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              images_upload_url: 'https://platform-dev.bizplay.co.kr/wecloud3/20240112_11705f40-a94c-42b0-82f7-76c3af9d8f96.jpg',
              // images_upload_handler: 
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
          <div className='mt-8 flex justify-end'>
            <button onClick={() => router.push("/")} className="btn btn-active btn-ghost mr-3">Cancel</button>
            <button type='submit' className="btn btn-active btn-success text-white">Save</button>
          </div>
        </form >
      </div >
    </>
  )

}