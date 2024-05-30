import { Autocomplete, TextField } from '@mui/material';
import { DocumentText } from 'iconsax-react';
import React, { useEffect, useState } from 'react'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { useRouter } from 'next/navigation';
import TagComponent from '../Modal/TagComponent';


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
        setSelectedValue } = props

    useEffect(() => {
        if (articleData != null) {
          setInputValue(articleData?.tag_title)
          setTitle(articleData?.title)
        }
      }, [inputValue])

    const [openTag, setOpenTag] = React.useState(false);
    const handleOpenTag = () => {
        setOpenTag(true);
    }
    const router = useRouter();

    const onchange = (e: any) => {
        const value = e.target.value
        setTitle(value)
    }


    const handleSelectChange = (event: any) => {
        const [selected, setSelectedValue] = useState("");
        //setSelectedValue(parseInt(event.target.value));
        setSelectedValue(event.target.value);
        console.log("setSelectedValue", selectedValue);
        const Private = 'Private';
        const Public = 'Public';
        const Department = 'Department';

        let options = [];
        let type = null;

        if (selected === 'Private') {
            type = 'private';
        } else if (selected === 'Public') {
            type = 'public';
        } else if (selected === 'Department') {
            type = 'department';
        }

        // if(type){
        //   options = type.map((el) => <option key={el}>{el}</option>)
        // }
    };

    const handleChildData = (dataFromChild: object) => {
        console.log("vanda123", dataFromChild);
        setShowDefaultValue(true);
        setTagValue(dataFromChild);
    };

    return (
        <>
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
                    ) : (
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
                        <option value={2}>Department</option>
                    </select>
                </div>
                <button
                    type='button'
                    onClick={handleDrawerOpen}
                    className='btn btn-secondary btn-sm ml-4'
                    style={{ ...(openTemplate && { display: 'none' }) }}
                >
                    open
                </button>
            </div>

            <TagComponent open={openTag} setOpen={setOpenTag} user={session} sendDataToParent={handleChildData} selectedValue={selectedValue} />
        </>
    )
}

export default InputTitleComponent
