"use client"
import { AddArticleBy, UpdateArticle } from '@/app/service/ArticleService'
import { GetAllDepartmentId } from '@/app/service/DepartmentService'
import { GetTagAndArticle } from '@/app/service/TagService'
import { DepartmentList } from '@/app/type/DepartmentType'
import ihttp, { API_BASE_URL } from '@/app/utils/xhttp'
import { Autocomplete, Popper, TextField } from '@mui/material'
import { Editor } from '@tinymce/tinymce-react'
import { useSession } from 'next-auth/react'
import { hasCustomGetInitialProps } from 'next/dist/build/utils'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import CustomAlert from '../Material/CustomAlert'
import TagComponent from '../Modal/TagComponent'
import { isRender } from '@/app/service/Redux/articleDetailSlice'
import { useDispatch } from 'react-redux'



export default function EditorCustum({ handleClose, session, articleData }: any) {

  const editorRef = useRef<any>(null);
  const dispatch = useDispatch()

  const [tagValue, setTagValue] = React.useState<TagType | any>();
  const [inputValue, setInputValue] = React.useState('');
  const [isErrorAlert, setIsErrorAlert] = useState({
    open: false,
    type: "",
    message: "",
    duration: 1600,
  });

  const [isUpdateArticle, setIsUpdateArticle] = useState({
    error : false,
  })

  const [isErrorInput, setIsErrorInput] = useState({
    error: false,
    label: "Enter Sub title",
  });

  const [tagData, setTagData] = useState([]);
  const [title, setTitle] = useState("");

  const [openTag, setOpenTag] = React.useState(false);
  const handleOpenTag = () => {
    setOpenTag(true);
  }
  const router = useRouter();

  const onchange = (e: any) => {
    const value = e.target.value
    setTitle(value)
  }
  const handleChildData = (dataFromChild: object) => {
    setShowDefaultValue(true);
    setTagValue(dataFromChild);
  };


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
      // return;
    }

    if (title === "") {
      setIsErrorInput({
        error: true,
        label: 'Enter Sub title',
      })
      // return;
    }

    const request = {
      "tag_id": tagValue?.id,
      "title": title,
      "content_body": content,
      "file_article_id": "123",
      "status": 1
    }
    if(articleData== null){
      AddArticleBy(request).then((res: any) => {
        if (res.status == 200) {
          setIsErrorAlert({
            ...isErrorAlert,
            open: true,
            type: "success",
            message: "Created Successfully.",
          });
          dispatch(isRender(true))
          handleClose();
        }
        else {
          setIsErrorAlert({
            ...isErrorAlert,
            open: true,
            type: "error",
            message: "Something wrong...",
          });
          handleClose();
  
        }
      })
    }
    else{
      UpdateArticle(request).then((rec:any)=>{
        console.log("rec work",rec)
        if(rec.status == 200){

        }
      })
      
    }
    
  }

 

  useEffect(() => {
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

  const [showDefaultValue, setShowDefaultValue] = useState(false);

  const handleImageUpload: any = (blobInfo: any) => {
    return new Promise((resolve, reject) => {
      const file = blobInfo.blob();
      const formData = new FormData();
      formData.append("imageFile", file, "filename.jpg");
      fetch(`${API_BASE_URL}/files/upload_file?articleId=266`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          const imageURL = result?.payload?.thum_img_path;
          resolve(imageURL);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

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
              <aside>
              <Autocomplete
                value={showDefaultValue ? tagValue : null}
                onChange={(event: any, newValue: string | null) => {
                  setTagValue(newValue);
                }}
                // defaultValue={articleData?.tag_title}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setShowDefaultValue(true);
                  setInputValue(newInputValue);
                }}
                disablePortal
                size="small"
                id="combo-box-demo"
                options={tagData}
                defaultValue={articleData?.tag_title}
                sx={{ width: 300, mr: 2 }}
                renderInput={(params) => <TextField {...params} label="Search Tag name"  />}
              />
              </aside>
              
              <button type='button' onClick={handleOpenTag} className="btn btn-active btn-primary btn-sm">Add New</button>
            </div>

            <TextField
              error={isErrorInput.error}
              onChange={onchange}
              id="outlined-basic"
              value={articleData?.title}
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
            initialValue= {articleData?.content_body}
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
              images_upload_handler: handleImageUpload,
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
          <div className='mt-8 flex justify-end'>
            <button onClick={handleClose} className="btn btn-active btn-ghost mr-3">Cancel</button>
            <button type='submit' className="btn btn-active btn-success text-white">Save</button>
          </div>
        </form >
      </div >

      <TagComponent open={openTag} setOpen={setOpenTag} user={session?.user} sendDataToParent={handleChildData} />
    </>
  )

}