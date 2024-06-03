"use client"
import { AddArticleBy, UpdateArticle } from '@/app/service/ArticleService'
import { GetTagAndArticle } from '@/app/service/TagService'
import React, { useEffect, useRef, useState } from 'react'
import CustomAlert from '../Material/CustomAlert'
import { isRender } from '@/app/service/Redux/articleDetailSlice'
import { useDispatch } from 'react-redux'
import DrawerTemplate from '@/app/(root)/templates/DrawerTemplate'
import InputTitleComponent from './InputTitleComponent'
import { Box, styled } from '@mui/material'
import TinyEditor from './TinyEditor'

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

export default function EditorCustum({ handleClose, session, articleData, handleViewArticle }: any) {

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

  const [editorRef, setEditorRef] = useState<any>();

  const geteditorRef = (editorRefFromChild: object) => {
    setEditorRef(editorRefFromChild);
  }

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
      GetTagAndArticle(parseInt(session?.dvsn_CD, 10), 1, null).then((res: any) => {
        const updatedTagList = res?.data?.rec?.tagList.map((tag: any) => ({
          ...tag,
          label: tag.title,
        }));
        setTagData(updatedTagList)
      })
    }
  }, [session])


  const [showDefaultValue, setShowDefaultValue] = useState(false);
  const options = () => {
    GetTagAndArticle(parseInt(session?.dvsn_CD, 10), 1, null).then((res: any) => {
      const updatedTagList = res?.data?.rec?.tagList.map((tag: any) => ({
        ...tag,
        label: tag.title,
      }));
      setTagData(updatedTagList)
    })

  };



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

            <div className='px-6'>
              <TinyEditor geteditorRef={geteditorRef} articleData={articleData} />
            </div>
          </form >

        </Main>
        <DrawerTemplate open={openTemplate} setOpen={setOpenTemplate} handleDrawerClose={handleDrawerClose} editorRef={editorRef} />
      </Box>
    </>
  )

}


