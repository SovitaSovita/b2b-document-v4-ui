"use client"
import { AddArticleBy, Insert_file, UpdateArticle } from '@/app/service/ArticleService'
import { GetTagAndArticle } from '@/app/service/TagService'
import { API_BASE_URL } from '@/app/utils/xhttp'
import { Autocomplete, TextField } from '@mui/material'
import { Editor } from '@tinymce/tinymce-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import CustomAlert from '../Material/CustomAlert'
import TagComponent from '../Modal/TagComponent'
import { isRender } from '@/app/service/Redux/articleDetailSlice'
import { useDispatch } from 'react-redux'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { DocumentText } from 'iconsax-react';



export default function EditorCustum({ handleClose, session, articleData }: any) {
  // console.log("session>>>", session)
  const editorRef = useRef<any>(null);
  const dispatch = useDispatch()

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
                <a href="http://localhost:4545/api/v1/files/view_files?fileName=${fileResponse?.payload.file_nm}" download=${fileResponse?.payload.file_nm} 
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

  const [tagValue, setTagValue] = React.useState<TagType | any>();
  const [inputValue, setInputValue] = React.useState('');
  const [isErrorAlert, setIsErrorAlert] = useState({
    open: false,
    type: "",
    message: "",
    duration: 1600,
  });

  const [isUpdateArticle, setIsUpdateArticle] = useState({
    open: false,
    error: false,
    type: "",
    message: "",
    duration: 1600,
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

  const [openTag, setOpenTag] = React.useState(false);
  const handleOpenTag = () => {
    setOpenTag(true);
  }
  const router = useRouter();

  const onchange = (e: any) => {
    const value = e.target.value
    setTitle(value)
  }

  const [selectedValue, setSelectedValue] = useState(1); // Defaulting to "Public"


  const handleSelectChange = (event: any) => {
    setSelectedValue(parseInt(event.target.value));
  };
  //check if public , private , department only
  const options = [
    { value: 'option1', label: 'Option 1', status: 0 }, // Enabled
    { value: 'option2', label: 'Option 2', status: 1 }, // Disabled
    { value: 'option3', label: 'Option 3', status: 0 }, // Enabled
  ];


  const handleChildData = (dataFromChild: object) => {
    console.log("dataFromChild ...", dataFromChild);
    setShowDefaultValue(true);
    setTagValue(dataFromChild);
  };


  useEffect(() => {
    if (articleData != null) {
      setInputValue(articleData?.tag_title)
      setTitle(articleData?.title)
    }
  }, [inputValue])


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
        "status": selectedValue
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

        setTagData(updatedTagList)
      })
    }
  }, [session])

  // Test
  // End test

  const [showDefaultValue, setShowDefaultValue] = useState(false);

  const handleImageUpload: any = (blobInfo: any) => {
    return new Promise((resolve, reject) => {
      const file = blobInfo.blob();
      const formData = new FormData();
      formData.append("imageFile", file);
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
      <form onSubmit={handleSave} className="ui form">
        <div className='mb-4 flex justify-end border-b pb-4 px-6'>
          <button onClick={handleClose} className="btn btn-active btn-sm btn-ghost mr-3">Exit</button>
          <button type='submit' className="btn btn-active btn-secondary btn-sm text-base-100">
            <DocumentText size="20" className='text-primary' />
            Save
          </button>
        </div>
        <div className='flex items-center mb-4 px-24'>
          {
            !articleData ? (
              <div className='flex p-3 rounded-lg border items-center mr-8 bg-base-100'>
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
                  renderInput={(params) => <TextField {...params} placeholder="Search Tag name" />}
                />
                < button type='button' onClick={handleOpenTag} className="btn btn-active btn-info text-base-100 btn-sm">Add New</button>
              </div>
            ) 
            :
             (
              <div className='btn btn-secondary btn-sm mr-3'>
                <LocalOfferOutlinedIcon className='text-base-100' />
                {articleData?.tag_title}
              </div>
            )
          }

          <div className='flex bg-base-100 p-3 rounded-lg border'>
            <input
              onChange={onchange}
              value={title}
              autoFocus
              placeholder="Enter Sub Title"
              className='input input-secondary input-bordered input-sm w-full max-w-xs'
            />
            <select

              value={selectedValue} // Bind the selected value to state
              onChange={handleSelectChange}
              className="select select-secondary select-sm select-bordered w-full ml-3 max-w-40">
              <option selected value={1}>Public</option>
              <option value={0}>Private</option>
              <option value={2}>Depament Only</option>
            </select>
          </div>

        </div>
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

      <TagComponent open={openTag} setOpen={setOpenTag} user={session} sendDataToParent={handleChildData} selectedValue={selectedValue} />
    </>
  )

}