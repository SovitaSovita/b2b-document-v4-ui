import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Image from "next/image";
import { ArrowCircleRight, ArrowSquareRight } from "iconsax-react";
import AskToReplaceTemplate from "../Modal/AskToReplaceTemplate";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import { HtmlContext } from "next/dist/shared/lib/html-context.shared-runtime";

const drawerWidth = 240;

interface TemplateType {
  id: number;
  title: string;
  cover: string;
  htmlContent: string;
  status: number;
}

function DrawerTemplate({ open, setOpen, handleDrawerClose, editorRef }: any) {
  const templates = [
    {
      id: 1,
      title: "C Day Form",
      cover: "https://bizweb-doc.kosign.dev//api/v1/files/view_images?fileName=1039874b-0bf5-4e82-9a89-d783a176a41a.png",
      htmlContent: `
                <table>
        <thead>
            <tr>
                <th>Task(14)</th>
                <th>P.I.C</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>% Done</th>
                <th>Remark</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Generate the application form template by AI</td>
                <td>Sovita</td>
                <td>31/05/2024</td>
                <td>est 10/06/2024</td>
                <td>80%</td>
                <td></td>
            </tr>
            <tr>
                <td>Update status when update tag</td>
                <td>vimean</td>
                <td>29/05/2024</td>
                <td>03/06/2024</td>
                <td>100%</td>
                <td></td>
            </tr>
            <tr>
                <td>Fixed bug add new article (auto select to current category)</td>
                <td>vanda</td>
                <td>05/06/2024</td>
                <td>est 07/06/2024</td>
                <td>80%</td>
                <td></td>
            </tr>
            <tr>
                <td>Fixed bug dropdown status (move category option to front)</td>
                <td>vanda</td>
                <td>05/06/2024</td>
                <td>07/06/2024</td>
                <td>100%</td>
                <td></td>
            </tr>
            <tr>
                <td>Implement drawer to display Template</td>
                <td>Sovita</td>
                <td>05/06/2024</td>
                <td>05/06/2024</td>
                <td>100%</td>
                <td></td>
            </tr>
            <tr>
                <td>Update status when update article</td>
                <td>vimean</td>
                <td>28/05/2024</td>
                <td>03/06/2024</td>
                <td>100%</td>
                <td></td>
            </tr>
            <tr>
                <td>When deleted, it still shows until page is refreshed. (Bug)</td>
                <td>Sovita</td>
                <td>05/06/2024</td>
                <td>05/06/2024</td>
                <td>100%</td>
                <td class="remark">UI (Nextjs)</td>
            </tr>
            <tr>
                <td>After save > move to main page (Bug)</td>
                <td>Sovita</td>
                <td>05/06/2024</td>
                <td>05/06/2024</td>
                <td>100%</td>
                <td></td>
            </tr>
            <tr>
                <td>Cannot save case Update (Bug)</td>
                <td>Sovita</td>
                <td>05/06/2024</td>
                <td>05/06/2024</td>
                <td>100%</td>
                <td></td>
            </tr>
            <tr>
                <td>Remove dark mode</td>
                <td>Sarayuth</td>
                <td></td>
                <td></td>
                <td>100%</td>
                <td></td>
            </tr>
            <tr>
                <td>Fixed bug (Insert article)</td>
                <td>Sovita</td>
                <td>29/05/2024</td>
                <td>29/05/2024</td>
                <td>100%</td>
                <td></td>
            </tr>
            <tr>
                <td>Fixed Bug (Delete Tag)</td>
                <td>vimean</td>
                <td>05/06/2024</td>
                <td>05/06/2024</td>
                <td>100%</td>
                <td></td>
            </tr>
            <tr>
                <td>Fixed Bug (when delete tag the article in that tag still exists(article not delete)</td>
                <td>vimean</td>
                <td>06/06/2024</td>
                <td>07/06/2024</td>
                <td>100%</td>
                <td class="remark">Service (Spring)</td>
            </tr>
        </tbody>
    </table>
        `,
      status: 1,
    },
    {
      id: 2,
      title: "LMS Form",
      cover:
        "https://bizweb-doc.kosign.dev/api/v1/files/view_images?fileName=0efc6a93-293e-4ecb-98ae-167611635687.jpg",
      htmlContent: `
      <div style="">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                      <img src="https://via.placeholder.com/150x50.png?text=KOSIGN" alt="KOSIGN" style="height: 50px;">
                      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; text-align: center;">
                          <div>
                              <span style="font-weight: bold;">Requester</span>
                              <div style="border-top: 1px solid black; margin-top: 10px;"></div>
                          </div>
                          <div>
                              <span style="font-weight: bold;">Manager 1</span>
                              <div style="border-top: 1px solid black; margin-top: 10px;"></div>
                          </div>
                          <div>
                              <span style="font-weight: bold;">Checker</span>
                              <div style="border-top: 1px solid black; margin-top: 10px;"></div>
                          </div>
                          <div>
                              <span style="font-weight: bold;">Approver</span>
                              <div style="border-top: 1px solid black; margin-top: 10px;"></div>
                          </div>
                      </div>
                  </div>

                  <h2 style="text-align: center; margin-bottom: 20px;">Cash Advances Statement</h2>

                  <div style="margin-bottom: 20px;">
                      <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                          <span style="font-weight: bold;">Document No.</span>
                          <span>ADV_202401_00004</span>
                      </div>
                      <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                          <span style="font-weight: bold;">Ledger</span>
                          <span>B2B-Employee Meal</span>
                      </div>
                      <div style="display: flex; justify-content: space-between;">
                          <span style="font-weight: bold;">Author</span>
                          <span>Sann Puthy</span>
                      </div>
                  </div>
              </div>          
      `,
      status: 1,
    },
    {
      id: 3,
      title: "LMS Form",
      cover:
        "https://uxdt.nic.in/wp-content/uploads/2020/07/Feedback-Form-1_p.png?x38773",
      htmlContent: `
      <div class="h-full w-full">
    <div key="0" style="width: 100%; font-size: 12px; padding-left: 8px; padding-right: 8px;">
        <div style="display: grid; width: 100%; grid-template-columns: repeat(12, 1fr); align-items: center; padding-bottom: 8px; padding-top: 8px; font-weight: 500;">
            <p style="grid-column: span 3; padding-left: 8px;">Spring</p>
            <p style="grid-column: span 1; text-align: center;">100%</p>
            <p style="grid-column: span 2; text-align: center;">Morn Moniroit</p>
            <p style="grid-column: span 1; text-align: center;">-</p>
            <p style="grid-column: span 1; text-align: center;">-</p>
            <p style="grid-column: span 1; text-align: center;">2024-04-09</p>
            <p style="grid-column: span 2; text-align: center;">20384</p>
        </div>
        <hr style="margin-top: 1px; height: 1px;">
    </div>
</div>

          
      `,
      status: 1,
    },

  ];

  const handleClose = () => {
    setOpen(false);
  };

  const [storeItem, setStoreItem] = useState<TemplateType>();

  const handleOpenModal = (item: any) => {
    setStoreItem(item);
    handleOpenAskToReplace();
  };

  const handleAppendTemplate = () => {
    editorRef?.current?.setContent(
      editorRef.current.getContent() + storeItem?.htmlContent
    );
    handleCloseAskToReplace();
  };

  const handleReplaceTemplate = () => {
    editorRef?.current?.setContent(storeItem?.htmlContent);
    handleCloseAskToReplace();
  };

  const [openAskToReplace, setOpenAskToReplace] = useState(false);
  const handleOpenAskToReplace = () => {
    setOpenAskToReplace(true);
  };
  const handleCloseAskToReplace = () => {
    setOpenAskToReplace(false);
  };

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            paddingTop: 3,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <div className="border-b px-4 pb-4 flex justify-between">
          <div className="card-title text-[16px]">Templates</div>
          <div
            className="tooltip tooltip-left tooltip-secondary"
            data-tip="close"
          >
            <ArrowSquareRight
              onClick={handleDrawerClose}
              size="30"
              className="text-base-content hover:scale-110 transition-all"
            />
          </div>
        </div>
        <div className="px-4 py-4 bg-base-100">
          {templates?.map((item: TemplateType) => (
            <div
              key={item?.id}
              onClick={() => handleOpenModal(item)}
              className="border rounded-md w-full h-60 p-1 mb-3 cursor-pointer"
            >
              <Image
                width={500}
                height={500}
                alt={item?.title}
                className="w-full rounded-md object-cover h-full"
                src={item?.cover}
              />
            </div>
          ))}
        </div>
      </Drawer>
      {/* <AskToReplaceTemplate open={openAskToReplace} setOpen={setOpenAskToReplace} /> */}
      {/* modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openAskToReplace}
        onClose={handleCloseAskToReplace}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openAskToReplace}>
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
                  onClick={() => handleReplaceTemplate()}
                  className="btn btn-active btn-error ml-2 mt-3 btn-sm"
                >
                  Replace
                </button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default DrawerTemplate;
