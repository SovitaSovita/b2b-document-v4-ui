import { Autocomplete, TextField } from '@mui/material';
import { AddSquare, BrushBig, DocumentText, Gemini, MessageAdd1, Tag } from 'iconsax-react';
import React, { useEffect, useState } from 'react'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { useRouter } from 'next/navigation';
import TagComponent from '../Modal/TagComponent';
import GeminiContent from '../GeminiContent';
import { useDispatch, useSelector } from 'react-redux';
import { getOptionData } from '@/app/service/Redux/articleDetailSlice';
import { GetTagAndArticle } from '@/app/service/TagService';
import { RootState } from '@/app/service/Redux/store/store';


function InputTitleComponent(props: any) {
    const { articleData,
        handleClose,
        showDefaultValue,
        setShowDefaultValue,
        openTemplate,
        handleDrawerOpen,
        session,
        tagData,
        setTagData,
        title,
        setTitle,
        inputValue,
        setInputValue,
        tagValue,
        setTagValue,
        selectedValue,
        setSelectedValue,
        isLoading
    } = props


    const dispatch = useDispatch()
    const optionGETdata = useSelector((state: RootState) => state?.article.getOptionData);


    // useEffect(() => {
    //     setSelectedValue(convertStringToStatus(optionGETdata))
    // }, [])

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

        if (newValue == 0) {
            getTagAndArticleFunction(null, 0, session?.userId);
        }
        if (newValue == 1) {
            getTagAndArticleFunction(null, 1, session?.userId);
        }
        if (newValue == 2) {
            getTagAndArticleFunction(parseInt(session?.dvsn_CD, 10), 2, null);
        }
    };

    const getTagAndArticleFunction = (dept_id: number | null, status: number, userId: string | null) => {
        GetTagAndArticle(dept_id, status, userId).then((res: any) => {
            const updatedTagList = res?.data?.rec?.tagList.map((tag: any) => ({
                ...tag,
                label: tag.title,
            }));
            setTagData(updatedTagList)
        })
    }



    const convertStringToStatus = (option: string) => {
        let status = 0;
        if (option === "PRIVATE") status = 0;
        else if (option === "PUBLIC") status = 1;
        else if (option === "DEPARTMENT") status = 2;
        return status;
    }

    const handleChildData = (dataFromChild: any) => {
        setShowDefaultValue(true);
        setTagValue(dataFromChild);

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
                    <div className='flex bg-base-100 p-3 rounded-lg border mr-4'>
                        <select
                            disabled={disableSelectArticle}
                            value={selectedValue} // Bind the selected value to state
                            onChange={handleSelectChange}

                            className="select select-neutral select-sm select-bordered w-full ml-3 max-w-40">
                            <option value={1}>Public</option>
                            <option value={0}>Private</option>
                            <option value={2}>Department</option>
                        </select>
                        <input
                            onChange={onchange}
                            defaultValue={articleData?.title}
                            autoFocus
                            placeholder="Enter Sub Title"
                            className='input input-neutral input-bordered ml-3 input-sm w-full max-w-xs'
                        />
                    </div>
                    {
                        !articleData ? (
                            <div className='flex p-3 rounded-lg border items-center bg-base-100' style={{ margin: "auto 35px;" }}>
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
                                    <AddSquare size="28" className='hover:scale-110 transition-all' style={{ cursor: "pointer" }} />
                                </div>
                            </div>
                        ) : (
                            <div className='btn btn-secondary btn-sm mr-4'>
                                <Tag size="22" variant="Outline" className='text-base-100' />
                                {articleData?.tag_title}
                            </div>
                        )
                    }


                    <div className='flex bg-base-100 ml-4 p-3 rounded-lg border' style={{ margin: "auto 75px auto;" }}>
                        <button
                            disabled
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
                    <button
                        disabled={isLoading}
                        type='submit'
                        className="btn btn-secondary btn-sm text-base-100">
                        <DocumentText size="20" className='' />
                        Save
                    </button>
                </div>
            </div>
            <TagComponent open={openTag} setOpen={setOpenTag} user={session} sendDataToParent={handleChildData} selectedValue={selectedValue} />
        </>
    )
}

export default InputTitleComponent
