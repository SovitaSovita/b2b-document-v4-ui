
import { isRender } from '@/app/service/Redux/articleDetailSlice';
import { RootState } from '@/app/service/Redux/store/store';
import { UpdateTag } from '@/app/service/TagService';
import { Backdrop, Fade, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomAlert from '../Material/CustomAlert';


export default function UpdateTagComponent({ open, setOpen, tagUpdateData, TAGS }: any) {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();
  const dispatch = useDispatch()
  const [inputVal, setInputVal] = useState("");
  const [optionStatus, setStatusVal] = useState("");
  const [status, setStatus] = useState('1')
  const session: UserData = useSelector((state: RootState) => state?.article.session);
  const [isErrorAlert, setIsErrorAlert] = useState({
    open: false,
    type: "",
    message: "",
    duration: 1600,
  });
  const [selectedValue, setSelectedValue] = useState(1);
  const handleSelectChange = (event: any) => {
    setSelectedValue(parseInt(event.target.value));
  };

  // new code
  useEffect(() => {
    if (tagUpdateData?.title) {
      setInputVal(tagUpdateData.title);
      setStatus(tagUpdateData.status)
    }
    if (TAGS?.status) {
      setStatusVal(TAGS.status)
    }
  }, [tagUpdateData, TAGS]);
  console.log("optionStatus", optionStatus)
  const handleClose = () => {
    setOpen(false)
  };
  // const handleOption = () =>{
  //   const request = {
  //     dept_id : '50',
  //     status : 
  //   }
  //   GetTagAndArticle()
  // }
  //   const onChange = (e: any) => {
  //     //const inputData = e.target.value;
  //     //console.log("inputData",inputData)
  //     setInputVal(e);
  // }
  const handleupdate = (e: any) => {
    e.preventDefault();
    if (inputVal != "") {
      const request = {
        id: tagUpdateData.id,
        dept_id: tagUpdateData.dept_id,
        title: inputVal,
        user_name: session?.userId,
        status: tagUpdateData.status,
        modified_date: formattedDate
      }
      console.log("request", request)
      UpdateTag(request).then((res: any) => {
        setInputVal("")
        setIsErrorAlert({
          ...isErrorAlert,
          open: true,
          type: "success",
          message: "Updated Successfully.",
        });
        handleClose();
        dispatch(isRender(true))
      })
    } else if (inputVal === "") {
      alert()
    }

  }
  return (
    <div>
      <CustomAlert
        open={isErrorAlert.open}
        setOpen={(open: boolean) => {
          setIsErrorAlert({ ...isErrorAlert, open });
        }}
        message={isErrorAlert.message}
        type={isErrorAlert.type}
        duration={isErrorAlert.duration}
      />
      {/* The button to open modal */}
      {/* Put this part before </body> tag */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <div className='w-1/3 bg-base-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg p-6 rounded-lg' style={{ width: '455px' }}>
            <form className='flex flex-col justify-between items-center'>
              <div className=''>
                {/* Left side icons */}
                <div className='flex bg-base-100 p-3 rounded-lg'>
                  <label className="input w-full input-bordered flex items-cent input-sm er gap-2">
                    {/* <input onChange={onChange} type="text" className="grow" placeholder="Enter new Tag name" /> */}
                    <input
                      onChange={(e) => setInputVal(e.target.value)}
                      type="text"
                      defaultValue={inputVal}
                      className="grow input-primary"
                    // style={{ width: '100px' }}
                    />
                  </label>
                  <div className='self-start'>
                    <select
                      disabled
                      value={tagUpdateData.status}
                      onChange={handleSelectChange}
                      className="select select-sm select-bordered w-full ml-3 max-w-40" style={{ width: '125px' }}>
                      <option selected value={1}>Public</option>
                      <option value={0}>Private</option>
                      <option value={2}>Department</option>
                    </select>
                  </div>
                </div>
                {/* Right side icons */}
                <div className="flex" style={{ marginLeft: " 13px" }}>
                  <div className='self-end '>
                    <button type='button' onClick={handleClose} className="btn btn-active mt-2 btn-sm">Cancel</button>
                    <button type='submit' onClick={handleupdate} className="btn btn-primary btn-info ml-2 btn-sm  bg-blue-500">Save</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>

    </div >

  );
}
