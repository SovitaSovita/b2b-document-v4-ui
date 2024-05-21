"use client"
import { AddArticleBy, UpdateArticle } from '@/app/service/ArticleService'
import { GetTagAndArticle } from '@/app/service/TagService'
import { API_BASE_URL } from '@/app/utils/xhttp'
import { Autocomplete, TextField } from '@mui/material'
import { Editor } from '@tinymce/tinymce-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import CustomAlert from '../Material/CustomAlert'
import TagComponent from '../Modal/TagComponent'
import { getArticle, isRender } from '@/app/service/Redux/articleDetailSlice'
import { useDispatch } from 'react-redux'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { getArticleDetail } from '@/app/service/MenuService'
import { MenuData } from '@/app/type/MenuData'



export default function EditorCustum({ handleClose, session, articleData }: any) {
  const editorRef = useRef<any>(null);
  const dispatch = useDispatch()

  const [tagValue, setTagValue] = React.useState<TagType | any>();
  console.log("tagValue=====",tagValue)
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
    console.log("setSelectedValue",selectedValue)
  };

  const handleChildData = (dataFromChild: object) => {
    setShowDefaultValue(true);
    setTagValue(dataFromChild);
  };

  const handleViewArticle = (id: string) => {
    getArticleDetail(id).then((res) => {
      console.log("id",id)
       dispatch(getArticle(res?.rec[0]))
    })
  }


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
        "dept_id": session?.user.dvsn_CD,
        "modifiedBy": session?.user.userId,
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
          //dispatch(isRender(true))
          handleClose();
          handleViewArticle(articleData?.id)
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
      GetTagAndArticle(parseInt(session?.user.dvsn_CD, 10), 1).then((res: any) => {
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
            {
              !articleData ? (
                <div className='flex items-center mr-8'>
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
                    renderInput={(params) => <TextField {...params} label="Search Tag name" />}
                  />
                  < button type='button' onClick={handleOpenTag} className="btn btn-active btn-primary btn-sm">Add New</button>
                </div>
              ) : (
                <div className='btn btn-secondary btn-sm mr-3'>
                  <LocalOfferOutlinedIcon className='text-base' />
                  {articleData?.tag_title}
                </div>
              )
            }


            <TextField
              error={isErrorInput.error}
              onChange={onchange}
              id="outlined-basic"
              value={title}
              size='small'
              label={isErrorInput.label}
              variant="outlined"
              autoFocus

            />
            <select
              value={selectedValue} // Bind the selected value to state
              onChange={handleSelectChange}
              className="select select-sm select-bordered w-full ml-3 max-w-40">
              <option selected value={1}>Public</option>
              <option value={0}>Private</option>
              <option value={2}>Depament Only</option>
            </select>
          </div>
          <Editor
            apiKey='51cakyf7l011kd34r23bib5jrvh79lb520v82wpid72wq92n'
            onInit={(_evt, editor) => editorRef.current = editor}
            initialValue={articleData?.content_body}
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

      <TagComponent open={openTag} setOpen={setOpenTag} user={session?.user} sendDataToParent={handleChildData} selectedValue={selectedValue}  />
    </>
  )

}