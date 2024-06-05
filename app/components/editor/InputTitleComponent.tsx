import { Autocomplete, TextField } from '@mui/material';
import { AddSquare, BrushBig, DocumentText, Gemini, MessageAdd1, Tag } from 'iconsax-react';
import React, { useEffect, useState } from 'react'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { useRouter } from 'next/navigation';
import TagComponent from '../Modal/TagComponent';
import GeminiContent from '../GeminiContent';
import { GetTagAndArticle } from '@/app/service/TagService';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/service/Redux/store/store';
import { getOptionData } from '@/app/service/Redux/articleDetailSlice';


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
        setSelectedValue
    } = props

    

    const [openTag, setOpenTag] = React.useState(false);
    const handleOpenTag = () => {
        setOpenTag(true);
    }
    const onchange = (e: any) => {
        const value = e.target.value
        setTitle(value)
    }

    const handleSelectChange = (event: any) => {
        const newValue = event.target.value
        setSelectedValue(newValue);
        console.log("Vanda Data:",newValue); 

        if(event === 0){
            setSelectedValue(0)
        } else if(event === 1){
            setSelectedValue(1)
        }
    };


    

    

    const handleChildData = (dataFromChild: any) => {
        setShowDefaultValue(true);
        setTagValue(dataFromChild);

        console.log("dataFromChild?.status ", dataFromChild)
        if (dataFromChild?.status === 0) {
            setSelectedValue(0)
            setDisableSelectArticle(true)
        }
        else if (dataFromChild?.status === 2) {
            setSelectedValue(2)
            setDisableSelectArticle(true)
        }
        else if (dataFromChild?.status === 1) {
            setSelectedValue(1)
            setDisableSelectArticle(true)
        }
        else {
            setDisableSelectArticle(false)
        }
    };

    const [disableSelectArticle, setDisableSelectArticle] = useState<boolean>(false);

    return (
        <>
            <div className='flex justify-between px-6 mb-5'>
                <div className='flex items-center'>
                    <div className='flex bg-base-100 p-3 rounded-lg border'>
                        <input
                            onChange={onchange}
                            value={title}
                            autoFocus
                            placeholder="Enter Sub Title"
                            className='input input-neutral input-bordered input-sm w-full max-w-xs'
                        />
                        <select
                            disabled={disableSelectArticle}
                            value={selectedValue} // Bind the selected value to state
                            onChange={handleSelectChange}
                            
                            className="select select-neutral select-sm select-bordered w-full ml-3 max-w-40">
                            <option value={1}>Public</option>
                            <option value={0}>Private</option>
                            <option value={2}>Department</option>
                        </select>
                    </div>
                    {
                        !articleData ? (
                            <div className='flex p-3 rounded-lg border items-center mr-4 bg-base-100'>
                                <Autocomplete
                                    value={showDefaultValue ? tagValue : null}
                                    onChange={(event: any, newValue: any | null) => {
                                        setTagValue(newValue);
                                        if (newValue?.status === 0) {
                                            setSelectedValue(0)
                                            setDisableSelectArticle(true)
                                        }
                                        else if (newValue?.status === 2) {
                                            setSelectedValue(2)
                                            setDisableSelectArticle(true)
                                        }
                                        else {
                                            setDisableSelectArticle(false)
                                        }
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
                                    <AddSquare size="28" className='text-neutral hover:scale-105 transition-all' style={{ cursor: "pointer" }} />
                                </div>
                            </div>
                        ) : (
                            <div className='btn btn-secondary btn-sm mr-4'>
                                <Tag size="22" variant="Outline" className='text-base-100' />
                                {articleData?.tag_title}
                            </div>
                        )
                    }
                    

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
