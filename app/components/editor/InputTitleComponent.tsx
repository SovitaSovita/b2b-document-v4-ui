import { Autocomplete, TextField } from '@mui/material';
import { AddSquare, BrushBig, DocumentText, Gemini, MessageAdd1, Tag } from 'iconsax-react';
import React, { useEffect, useState } from 'react'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { useRouter } from 'next/navigation';
import TagComponent from '../Modal/TagComponent';
import GeminiContent from '../GeminiContent';


function InputTitleComponent(props: any) {
    const { articleData,
        handleClose,
        showDefaultValue,
        setShowDefaultValue,
        openTemplate,
        handleDrawerOpen,
        session,
        tagData,
        title,
        setTitle,
        inputValue,
        setInputValue,
        tagValue,
        setTagValue,
        selectedValue,
    } = props

    const [optionStatus, setStatusVal] = useState("");

    useEffect(() => {
        if (articleData != null) {
            setInputValue(articleData?.tag_title)
            setTitle(articleData?.title)
            setStatusVal(articleData.status)
        }
        if (articleData?.status) {
            setStatusVal(articleData.status)
            console.log("dada123:",articleData)
          }
    }, [inputValue, articleData])

    const [openTag, setOpenTag] = React.useState(false);
    const handleOpenTag = () => {
        setOpenTag(true);
    }
    const router = useRouter();

    const onchange = (e: any) => {
        const value = e.target.value
        setTitle(value)
    }

    const [status, setStatus] = useState('1')
    const [selected, setSelectedValue] = useState("");
    const handleSelectChange = (event: any) => {
        //setSelectedValue(parseInt(event.target.value));
        const newValue = event.target.value
        setSelectedValue(newValue);
        console.log("setSelectedValue", newValue);
        let type = null;
        const options = {
            0:'Private',
            1:'Public',
            2:'Department'
        }
        if (selectedValue === 0) {
            type = 'private';
          } else if (selectedValue === 1) {
            type = 'public';
          } else if (selectedValue === 2) {
            type = 'department';
        }
    };
    const handleChildData = (dataFromChild: object) => {
        setShowDefaultValue(true);
        setTagValue(dataFromChild);
    };

    return (
        <>
            <div className='flex justify-between px-6 mb-5'>
                <div className='flex items-center'>
                    {
                        !articleData ? (
                            <div className='flex p-3 rounded-lg border items-center mr-4 bg-base-100'>
                                <Autocomplete
                                    value={showDefaultValue ? tagValue : null}
                                    onChange={(event: any, newValue: string | null) => {
                                        setTagValue(newValue);
                                        console.log("VandaTest:",newValue);
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
                                < div onClick={handleOpenTag}>
                                    <AddSquare size="28" className='text-neutral hover:scale-105 transition-all' style={{cursor: "pointer"}}/>
                                </div>
                            </div>
                        ) : (
                            <div className='btn btn-secondary btn-sm mr-4'>
                                <Tag size="22" variant="Outline" className='text-base-100' />
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
                            className='input input-neutral input-bordered input-sm w-full max-w-xs'
                        />
                        <select
                            value={selectedValue} // Bind the selected value to state
                            onChange={handleSelectChange}
                            className="select select-neutral select-sm select-bordered w-full ml-3 max-w-40">
                            {
                                status == '1' ? (
                                    <><option selected value={1}>Public</option><option value={0}>Private</option><option value={2}>Department</option></>
                                  ) : status == '0'?(
                                    <><option  value={0}>Private</option><option value={1}>Public</option><option value={2}>Department</option></>
                                  ): status == '2'?(
                                    <>
                                    <option  value={2}>Department</option><option value={1}>Public</option><option value={0}>Private</option> 
                                    </>
                                  ):
                                  <></>
                            }
                           
                        </select>
                    </div>

                    <div className='flex bg-base-100 ml-4 p-3 rounded-lg border'>
                        <button
                            type='button'
                            onClick={handleDrawerOpen}
                            className='btn btn-secondary btn-sm'
                            style={{ ...(openTemplate && { display: 'none' }) }}
                        >
                            <BrushBig size="24" className='text-base-100' />
                            <label>Templates</label>
                        </button>
                        <GeminiContent />
                    </div>
                </div>

                <div className='flex items-center'>
                    <button onClick={handleClose} type='button' className="btn btn-active btn-sm btn-ghost mr-3">Exit</button>
                    <button type='submit' className="btn btn-active btn-secondary btn-sm text-base-100">
                        <DocumentText size="20" className='text-primary' />
                        Save
                    </button>
                </div>
            </div>
            <TagComponent open={openTag} setOpen={setOpenTag} user={session} sendDataToParent={handleChildData} selectedValue={selectedValue} />
        </>
    )
}

export default InputTitleComponent
