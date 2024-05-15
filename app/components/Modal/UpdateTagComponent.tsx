import { UpdateTag } from '@/app/service/TagService';
import { Backdrop, Fade, Modal } from '@mui/material';
import React from 'react';

export default function UpdateTagComponent({ open, setOpen, user }: any) {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();

  const handleClose = () => {
    setOpen(false)
  };
  function handleupdate() {
    const request = {
      id: 40,
      dept_id: 50,
      title: 'flutter Team',
      user_name: 'yuth',
      status: 1,
      create_date: formattedDate
    }
     UpdateTag(request).then((res: any) => {
       alert("Success")
  
     })

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
                <input type="text" className="grow" placeholder="Enter new Tag name" />
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
