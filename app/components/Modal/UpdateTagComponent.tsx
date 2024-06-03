
import { isRender } from '@/app/service/Redux/articleDetailSlice';
import { RootState } from '@/app/service/Redux/store/store';
import { UpdateTag } from '@/app/service/TagService';
import { Backdrop, Fade, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomAlert from '../Material/CustomAlert';


export default function UpdateTagComponent({ open, setOpen, tagUpdateData, TAGS }: any) {
  console.log("TAGS", tagUpdateData)

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();
  const dispatch = useDispatch()
  //const [inputVal,setInputVal] = useState<String>();
  const [inputVal, setInputVal] = useState("");
  const [optionStatus, setStatusVal] = useState("");
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
    let options = [];
    let type = null;
    console.log("selectedValue", selectedValue)
    if (selectedValue === 0) {
      type = 'private';
    } else if (selectedValue === 1) {
      type = 'public';
    } else if (selectedValue === 2) {
      type = 'department';
    }
    console.log("type", type)
  };


  const handleOption = () => {

  }


  //   const handleSelectChange = (event: any) => {
  //     const [selected, setSelectedValue] = useState(1);
  //     //setSelectedValue(parseInt(event.target.value));
  //     setSelectedValue(event.target.value);
  //     const Private = '0';
  //     const Public = '1';
  //     const Department = '2';

  //     let options = [];
  //     let type = null;

  //     if (selected === 0) {
  //         type = 'private';
  //     } else if (selected === 1) {
  //         type = 'public';
  //     } else if (selected === 2) {
  //         type = 'department';
  //     }
  //     console.log("type",type)

  //     // if(type){
  //     //   options = type.map((el) => <option key={el}>{el}</option>)
  //     // }
  // };


  // new code
  useEffect(() => {
    if (tagUpdateData?.title) {
      setInputVal(tagUpdateData.title);
    }
    if (TAGS?.status) {
      setStatusVal(TAGS.status)
    }
  }, [tagUpdateData][TAGS]);
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
        status: selectedValue,
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
  //option private , department and public
  let typePub = "";
  let typeDept = "";
  let typePri = "";
  if (tagUpdateData.status === 1) {
    typePub = "Public";
    typeDept = "Department";
    typePri = "Private";
  } else if (tagUpdateData.status === 0) {
    typePri = 'Private';
    typePub = "Public";
    typeDept = "Department";
  } else {
    typeDept = 'Department'
    typePri = 'Private';
    typePub = "Public";
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
          <div className='w-1/3 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg p-6 rounded-lg' style={{ width: '455px' }}>
            <form className='flex flex-col justify-between items-center'>
              <div className=''>
                {/* Left side icons */}
                <div className='flex bg-base-100 p-3 rounded-lg'>
                  <label className="input w-full input-bordered flex items-cent input-sm er gap-2">
                    {/* <input onChange={onChange} type="text" className="grow" placeholder="Enter new Tag name" /> */}
                    <input
                      onChange={(e) => setInputVal(e.target.value)}
                      type="text"
                      value={inputVal}
                      className="grow"
                    // style={{ width: '100px' }}
                    />
                  </label>
                  <div className='self-start'>
                    <select
                      value={selectedValue}
                      onChange={handleSelectChange}
                      className="select select-sm select-bordered w-full ml-3 max-w-40" style={{ width: '125px' }}>
                      <option selected value={1}>{typePub}</option>
                      <option value={0}>{typePri}</option>
                      <option value={2}>{typeDept}</option>
                    </select>
                  </div>
                </div>
                {/* Right side icons */}
                <div className="flex" style={{ marginLeft: " 13px" }}>
                  <div className='self-end '>
                    <button type='button' onClick={handleClose} className="btn btn-active mt-2 btn-sm">Cancel</button>
                    <button type='submit' onClick={handleupdate} className="btn btn-active btn-info ml-2 btn-sm  bg-blue-500">Save</button>
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
