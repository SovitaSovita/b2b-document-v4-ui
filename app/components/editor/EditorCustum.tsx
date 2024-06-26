"use client"
import { AddArticleBy, UpdateArticle } from '@/app/service/ArticleService'
import { GetTagAndArticle } from '@/app/service/TagService'
import React, { useEffect, useRef, useState } from 'react'
import CustomAlert from '../Material/CustomAlert'
import { getOptionData, isRender } from '@/app/service/Redux/articleDetailSlice'
import { useDispatch, useSelector } from 'react-redux'
import InputTitleComponent from './InputTitleComponent'
import { Box, styled } from '@mui/material'
import { RootState } from '@/app/service/Redux/store/store'
import DrawerTemplate from '../templates/DrawerTemplate'
import CKEditorComponent from './CKEditorComponent'

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

export default function EditorCustum({ handleClose, session, articleData, handleViewArticle, tagUpdateData,}: any) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const optionGETdata = useSelector((state: RootState) => state?.article.getOptionData);
  const [inputVal, setInputVal] = useState("");

  console.log("test1234",tagUpdateData)
  useEffect(()=>{    
  },[tagUpdateData])


  const [isErrorAlert, setIsErrorAlert] = useState({
    open: false,
    type: "",
    message: "",
    duration: 1600,
  });

  const [tagData, setTagData] = useState([]);
  const [title, setTitle] = useState("");
  const [tagValue, setTagValue] = React.useState<TagType | any>();
  const [selectedValue, setSelectedValue] = useState<number>(0); // Defaulting to "Private"
    console.log("gaga123>>>>>", tagValue);

  const [isErrorInput, setIsErrorInput] = useState({
    error: false,
    label: "Enter Sub title",
  });
 
  useEffect(() => {
    if (!articleData) {
      setSelectedValue(convertStringToStatus(optionGETdata))
    }
  }, [])

  useEffect(()=>{
    setTagValue
  },[])

  
  
  const convertStringToStatus = (option: string) => {
    let status = 0;
    if (option === "PRIVATE") status = 0;
    else if (option === "PUBLIC") status = 1;
    else if (option === "DEPARTMENT") status = 2;
    return status;
  }

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
    let content = "";

    if (editorRef.current) {
      content = editorRef.current.getContent();
    }

    if (content == "") {
      setIsErrorAlert({
        ...isErrorAlert,
        open: true,
        type: "warning",
        message: "Editor's Content is Empty.",
      });
      return;
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

    if (!title) {
      setIsErrorAlert({
        ...isErrorAlert,
        open: true,
        type: "error",
        message: "Sub Title can't empty.",
      });
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
      console.log(tagValue?.id,"::tagValue?.id")
      setIsLoading(true)
      AddArticleBy(request).then((res: any) => {
        if (res.status == 200) {
          setIsErrorAlert({
            ...isErrorAlert,
            open: true,
            type: "success",
            message: "Created Successfully.",
          });
          dispatch(getOptionData(convertStatusToString(selectedValue)))
          dispatch(isRender(true))
          handleClose()
        }
        else {
          setIsErrorAlert({
            ...isErrorAlert,
            open: true,
            type: "error",
            message: "Something wrong...",
          });
        }
        setIsLoading(false)
      })
    }
    else {
      const input = {
        "id": articleData?.id,
        "title": title,
        "content_body": content,
        "user_id": articleData?.user_id,
        "dept_id": session?.dvsn_CD,
        "status": selectedValue,
        "modifiedBy": session?.userId,
        "modified_date": formattedDate,
      }
      setIsLoading(true)
      UpdateArticle(input).then((rec: any) => {
        if (rec.status == 200) {
          setIsUpdateArticle({
            ...isUpdateArticle,
            open: true,
            type: "success",
            message: "Update article successfully",
          });
          handleViewArticle(articleData?.id)
          dispatch(getOptionData(convertStatusToString(articleData?.status)))
          dispatch(isRender(true))
          handleClose();
        } else {
          setIsUpdateArticle({
            ...isUpdateArticle,
            open: true,
            type: "error",
            message: "Something went wrong. Can't update...",
          })
        }
        setIsLoading(false)
      })
    }
  }

  const convertStatusToString = (status: number) => {
    if (typeof (status) == "string") {
      status = parseInt(status);
    }
    let getOptionData = "";
    switch (status) {
      case 0:
        getOptionData = "PRIVATE";
        break;
      case 1:
        getOptionData = "PUBLIC";
        break;
      case 2:
        getOptionData = "DEPARTMENT";
        break;
      default:
        break;
    }
    return getOptionData;
  }


  useEffect(() => {
    if (session) {
      if (optionGETdata === "PRIVATE") {
        getTagAndArticleFunction(null, 0, session?.userId);
      }
      if (optionGETdata === "DEPARTMENT") {
        getTagAndArticleFunction(parseInt(session?.dvsn_CD, 10), 2, null);
      }
      if (optionGETdata === "PUBLIC") {
        getTagAndArticleFunction(null, 1, session?.userId);
      }
    }
  }, [session, optionGETdata])

  useEffect(() => {

  },[tagData])

  const getTagAndArticleFunction = (dept_id: number | null, status: number, userId: string | null) => {
    GetTagAndArticle(dept_id, status, userId).then((res: any) => {
      const updatedTagList = res?.data?.rec?.tagList.map((tag: any) => ({
        ...tag,
        label: tag.title,
      }));
      setTagData(updatedTagList)
    })
  }
  const [showDefaultValue, setShowDefaultValue] = useState(false);

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
              setTagData={setTagData}
              title={title}
              setTitle={setTitle}
              tagValue={tagUpdateData}
              setTagValue={setTagValue}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
              isLoading={isLoading}
            />
            <div className='px-6'>
              <CKEditorComponent geteditorRef={geteditorRef} articleData={articleData} />
            </div>
          </form >
        </Main>
        <DrawerTemplate open={openTemplate} setOpen={setOpenTemplate} handleDrawerClose={handleDrawerClose} editorRef={editorRef} />
      </Box>
    </>
  )

}

