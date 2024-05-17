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
 console.log("session>>>",session)
  const editorRef = useRef<any>(null);
  const dispatch = useDispatch()

  const [tagValue, setTagValue] = React.useState<TagType | any>();
  const [inputValue, setInputValue ] = React.useState('');
  const [inputval,setInputVal] = useState('');
  const [isErrorAlert, setIsErrorAlert] = useState({
    open: false,
    type: "",
    message: "",
    duration: 1600,
  });

  const [isUpdateArticle, setIsUpdateArticle] = useState({
    open : false,
    error : false,
    type :"",
    message:"",
    duration:1600,
  })

  const [isErrorInput, setIsErrorInput] = useState({
    error: false,
    label: "Enter Sub title",
  });
   
  // const parseLong 
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();

  const [tagData, setTagData] = useState([]);
  const [title, setTitle] = useState("");

  const [id,setId] = useState("");
  const [userId,setuserId] = useState("");
  const [deptId,setdeptId] = useState("");

  const [openTag, setOpenTag] = React.useState(false);
  const handleOpenTag = () => {
    setOpenTag(true);
  }
  const router = useRouter();

  const onchange = (e: any) => {
    const value = e.target.value
    setTitle(value)
    setId(value)
    setuserId(value)
    setdeptId(value)

    setInputVal(e.target.value)
    setInputValue(e.target.value)
   
  }
  const handleChildData = (dataFromChild: object) => {
    setShowDefaultValue(true);
    setTagValue(dataFromChild);
  };


  useEffect(() =>{
    setInputValue(articleData?.tag_title)
  })

  useEffect(() =>{
   
    setInputVal(articleData?.title)
  }, [setInputVal])


  const handleSave = (e: any) => {
    e.preventDefault();
    let content: string = "";
    let userId : String = ""; 


    if (editorRef.current) {
      content = editorRef.current.getContent();
    }
    // if (editorRef.current) {
    //   userId = editorRef.current.getuserId();
    // }

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
      "title": inputval,
      "content_body": content,
      "file_article_id": "123",
      "status": 1
    }
    const input = {
      "id" : articleData?.id,
      "title": inputval,
      "content_body": content,
      "user_id": articleData?.user_id,
      "dept_id" : session?.user.dvsn_CD,
      "modifiedBy":session?.user.userId,
      "modified_date":formattedDate,
    }
    console.log(">>>>>input",input)

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
      UpdateArticle(input).then((rec:any)=>{
        console.log("rec work",rec)
        if(rec.status == 200){
          setIsUpdateArticle({
            ...isUpdateArticle,
            open:true,
            type:"success",
            message: "Update article successfully",
          });
          dispatch(isRender(true))
          handleClose();
        }else{
          setIsUpdateArticle({
            ...isUpdateArticle,
            open:true,
            type:"error",
            message: "Something went wrong. Can't update...",
          })
          handleClose();
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
                defaultValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setShowDefaultValue(true);
                  setInputValue(newInputValue);
                }}
                disablePortal
                size="small"
                id="combo-box-demo"
                options={tagData}
                inputValue={inputValue}
                sx={{ width: 300, mr: 2 }}
                renderInput={(params) => <TextField {...params} label="Search Tag name"  />}
              />
              </aside>
              
              <button type='button' onClick={handleOpenTag} className="btn btn-active btn-primary btn-sm">Add New</button>
            </div>

            <TextField
              error={isErrorInput.error}
              onChange={(e) => setInputVal(e.target.value)}
              id="outlined-basic"
              value={inputval}
              size='small'
              label={isErrorInput.label}
              variant="outlined"
              autoFocus
            
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