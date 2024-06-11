"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { Backdrop, Box, Fade, Modal } from "@mui/material";
import DrawerTemplate from "../templates/DrawerTemplate";

function AskToReplaceTemplate({ open, setOpen, handleSetTemplate, editorRef }: any) {
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmitCallback = () => {};

  const handleAppendTemplate = () => {
    
  };

  const handleReplaceTemplate = () => {
    handleSetTemplate("Sarayuth")
    console.log("DrawerTemplate" , DrawerTemplate)
    setOpen(false);
  };

  return (
    <>
      <div>
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
            <div className="w-1/4 bg-base-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg p-5 rounded-lg">
              <h3 className="text-base/7 font-medium">
                Do you want to replace or append ?
              </h3>
              <p className="mt-2 text-sm/6"></p>
              <form className="flex flex-col justify-between items-center">
                <div className="self-end">
                  <button
                    type="button"
                    onClick={handleAppendTemplate}
                    className="btn btn-active mt-2 btn-sm"
                  >
                    Append
                  </button>
                  <button
                    type="button"
                    onClick={handleReplaceTemplate}
                    className="btn btn-active btn-error ml-2 mt-3 btn-sm"
                  >
                    Replace
                  </button>
                </div>
              </form>
            </div>
          </Fade>
        </Modal>
      </div>
    </>
  );
}

export default AskToReplaceTemplate;
