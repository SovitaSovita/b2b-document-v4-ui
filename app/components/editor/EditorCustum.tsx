"use client"
import { AddArticleBy, Insert_file, UpdateArticle } from '@/app/service/ArticleService'
import { GetTagAndArticle } from '@/app/service/TagService'
import { Editor } from '@tinymce/tinymce-react'
import React, { useEffect, useRef, useState } from 'react'
import CustomAlert from '../Material/CustomAlert'
import { isRender } from '@/app/service/Redux/articleDetailSlice'
import { useDispatch } from 'react-redux'
import DrawerTemplate from '@/app/(root)/templates/DrawerTemplate'
import InputTitleComponent from './InputTitleComponent'
import { Box, styled } from '@mui/material'

const API_BASE_URL = process.env.NEXT_API_URL

const drawerWidth = 240;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  // padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
  position: 'relative',
}));

export default function EditorCustum({ handleClose, session, articleData,handleViewArticle }: any) {
  // console.log("session>>>", session)
  const editorRef = useRef<any>(null);
  const dispatch = useDispatch();
  const [isErrorAlert, setIsErrorAlert] = useState({
    open: false,
    type: "",
    message: "",
    duration: 1600,
  });

  const [tagData, setTagData] = useState([]);
  const [title, setTitle] = useState("");
  const [tagValue, setTagValue] = React.useState<TagType | any>();
  const [inputValue, setInputValue] = React.useState('');
  const [selectedValue, setSelectedValue] = useState(1); // Defaulting to "Public"


  const handleFileChange = (e: any) => {
    const file = e.target.files[0];

    const formData: FormData = new FormData();
    formData.append("imageFile", file);
    handleInsertHTML(formData);
  };

  const handleFileButtonClicked = () => {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.onchange = handleFileChange;
    fileInput.click();
  };

  const handleInsertHTML = (formData: FormData) => {
    if (formData) {
      Insert_file(formData).then((fileResponse: FileUploadResponseType) => {
        const htmlContent = `
              <div style="padding: 10px; width: 250px; background-color: rgb(246, 248, 252)">
                <a href="${API_BASE_URL}/files/view_files?fileName=${fileResponse?.payload.file_nm}" download=${fileResponse?.payload.file_nm} 
                style="display: flex; align-items: center; justify-content: space-between; text-decoration: none;">
                  download ${fileResponse?.payload.file_nm}
                  <img width="30px" src="https://firebasestorage.googleapis.com/v0/b/core-appliance-412508.appspot.com/o/cloud-arrow-down-svgrepo-com.svg?alt=media&token=a2b5e6bc-c4e7-445c-b39e-37e35d8e4b5c" />
                </a>
              </div>
        `;
        editorRef?.current?.setContent(editorRef.current.getContent() + htmlContent);
      })
    } else {
      console.error("No file selected.");
    }
  };
  const [isErrorInput, setIsErrorInput] = useState({
    error: false,
    label: "Enter Sub title",
  });

  const [isUpdateArticle, setIsUpdateArticle] = useState({
    open: false,
    error: false,
    type: "",
    message: "",
    duration: 1600,
  })

  // const parseLong 
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();

  const handleSave = (e: any) => {
    e.preventDefault();
    let content: string = "";


    if (editorRef.current) {
      content = editorRef.current.getContent();
    }


    if (!tagValue && articleData == null) {
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

    if (articleData == null) {
      const request = {
        "tag_id": tagValue?.id,
        "title": title,
        "content_body": content,
        "file_article_id": "123",
        "status": selectedValue,
      }

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
    else {
      const input = {
        "id": articleData?.id,
        "title": title,
        "content_body": content,
        "user_id": articleData?.user_id,
        "dept_id": session?.dvsn_CD,
        "status": '0',
        "modifiedBy": session?.userId,
        "modified_date": formattedDate,
      }

      UpdateArticle(input).then((rec: any) => {
        if (rec.status == 200) {
          setIsUpdateArticle({
            ...isUpdateArticle,
            open: true,
            type: "success",
            message: "Update article successfully",
          });
          handleViewArticle(articleData?.id)
          dispatch(isRender(true))
          handleClose();
        } else {
          setIsUpdateArticle({
            ...isUpdateArticle,
            open: true,
            type: "error",
            message: "Something went wrong. Can't update...",
          })
          handleClose();
        }
      })

    }

  }

  useEffect(() => {
    if (session) {
      GetTagAndArticle(parseInt(session?.dvsn_CD, 10), 1).then((res: any) => {
        const updatedTagList = res?.data?.rec?.tagList.map((tag: any) => ({
          ...tag,
          label: tag.title,
        }));
        console.log("dadaadd", updatedTagList);

        setTagData(updatedTagList)
      })
    }
  }, [session])


  const [showDefaultValue, setShowDefaultValue] = useState(false);
  const options = () => {
    GetTagAndArticle(parseInt(session?.dvsn_CD, 10), 1).then((res: any) => {
      const updatedTagList = res?.data?.rec?.tagList.map((tag: any) => ({
        ...tag,
        label: tag.title,
      }));
      console.log("dadaadd", updatedTagList);

      setTagData(updatedTagList)
    })

  };


  const handleImageUpload: any = (blobInfo: any) => {
    return new Promise((resolve, reject) => {
      const file = blobInfo.blob();
      const formData = new FormData();
      formData.append("imageFile", file);
      fetch(`${API_BASE_URL}/files/upload_file`, {
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



  //open drawer template
  const [openTemplate, setOpenTemplate] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpenTemplate(true);
  };

  const handleDrawerClose = () => {
    setOpenTemplate(false);
  };


  return (
    <>
      <Box sx={{ display: 'flex' }}>
        {/* <CssBaseline /> */}
        <Main open={openTemplate}>
          <CustomAlert
            open={isErrorAlert.open}
            setOpen={(open: boolean) => {
              setIsErrorAlert({ ...isErrorAlert, open });
            }}
            message={isErrorAlert.message}
            type={isErrorAlert.type}
            duration={isErrorAlert.duration}
          />
          <form onSubmit={handleSave} className="ui form">

            <InputTitleComponent
              articleData={articleData}
              handleClose={handleClose}
              showDefaultValue={showDefaultValue}
              setShowDefaultValue={setShowDefaultValue}
              openTemplate={openTemplate}
              handleDrawerOpen={handleDrawerOpen}
              session={session}
              tagData={tagData}
              title={title}
              setTitle={setTitle}
              inputValue={inputValue}
              setInputValue={setInputValue}
              tagValue={tagValue}
              setTagValue={setTagValue}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />

            <div className='px-24'>
              <Editor
                apiKey='51cakyf7l011kd34r23bib5jrvh79lb520v82wpid72wq92n'
                onInit={(_evt, editor) => editorRef.current = editor}
                initialValue={articleData?.content_body}
                init={{
                  height: 500,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'list link image table wordcount', 'link', 'charmap', 'preview', 'image',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'tinydrive'
                  ],
                  setup: (editor) => {
                    // Define behavior for custom button
                    editor.ui.registry.addButton('insertFileBtn', {
                      text: 'File',
                      type: 'button',
                      icon: 'browse',
                      onAction: handleFileButtonClicked
                    });
                  },
                  toolbar: 'undo redo | blocks | ' + 'list link image table wordcount' + 'image' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help | insertFileBtn',
                  images_upload_handler: handleImageUpload,
                  content_style: 'body {font - family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
              />
            </div>
          </form >

        </Main>
        <DrawerTemplate open={openTemplate} handleDrawerClose={handleDrawerClose} />
      </Box>
    </>
  )

}


