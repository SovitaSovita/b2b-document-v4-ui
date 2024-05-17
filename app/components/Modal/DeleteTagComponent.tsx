import { DeleteTag } from '@/app/service/TagService';
import { Backdrop, Fade, Modal } from '@mui/material';
import React, { useState } from 'react';

export default function DeleteTagComponent({ isOpen, onClose , tagDeleteData }: any) {

  const handleClose = () => {
    isOpen(false)
  };
  const handleDelete = (item: any) => {
    const request = {
      id: tagDeleteData.id
    }
    DeleteTag(request).then((res: any) => {

    })


    //setTagDeleteData(item)
    //setOpenTag(true)

  }
  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">This modal works with a hidden checkbox!</p>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
      </div>

    </div >
  );
}
