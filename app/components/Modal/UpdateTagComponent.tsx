
import { isRender } from '@/app/service/Redux/articleDetailSlice';
import { UpdateTag } from '@/app/service/TagService';
import { Backdrop, Fade, Modal } from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


export default function UpdateTagComponent({ open, setOpen, tagUpdateData }: any) {


  console.log("tagUpdateData >>>", tagUpdateData);
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();
  const dispatch = useDispatch()
  //const [inputVal,setInputVal] = useState<String>();
  const [inputVal, setInputVal] = useState("");
  const { data: session, status }: { data: any, status: any } = useSession();
  const [isErrorAlert, setIsErrorAlert] = useState({
    open: false,
    type: "",
    message: "",
    duration: 1600,
  });

  // new code
  useEffect(() => {
    if (tagUpdateData?.title) {
      setInputVal(tagUpdateData.title);
    }
  }, [tagUpdateData]);



  const handleClose = () => {
    setOpen(false)
  };
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
        user_name: session?.user.userId,
        status: 1,
        modified_date: formattedDate
      }
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
    }

  }
  return (
    <div>
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
          <div className='w-1/3 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg p-6 rounded-lg'>
            <form className='flex flex-col justify-between items-center'>
              <label className="input w-full input-bordered flex items-cent input-sm er gap-2">
                {/* <input onChange={(e) => setInputVal(e.target.value)} type="text" value={tagUpdateData?.title} className="grow" /> */}
                <input
                  onChange={(e) => setInputVal(e.target.value)}
                  type="text"
                  value={inputVal}
                  className="grow"
                />

              </label>
              <div className='self-end'>
                <button type='button' onClick={handleClose} className="btn btn-active mt-2 btn-sm">Cancel</button>
                <button type='submit' onClick={handleupdate} className="btn btn-active btn-primary ml-2 btn-sm">Save</button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div >
  );
}
