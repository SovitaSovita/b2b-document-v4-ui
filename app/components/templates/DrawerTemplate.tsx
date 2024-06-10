import React, { useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Image from 'next/image';
import { ArrowCircleRight, ArrowSquareRight } from 'iconsax-react';
import AskToReplaceTemplate from '../Modal/AskToReplaceTemplate';

const drawerWidth = 240;
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

function DrawerTemplate({ open, setOpen, handleDrawerClose, editorRef }: any) {

  const handleSetTemplate = (templatesForm: string) => {
    editorRef?.current?.setContent(editorRef.current.getContent() + templatesForm);
  }

  const templates = [
    {
      id: 1,
      title: "C Day Form",
      cover: "https://cdn.create.microsoft.com/catalog-assets/en-us/ce343500-4aff-4dfa-b337-57c78459c6ee/thumbnails/616/modern-nursing-resume-orange-modern-geometric-2-1-b3fad7d361c3.webp",
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
      id: 2,
      title: "LMS Form",
      cover: "https://bizweb-doc.kosign.dev/api/v1/files/view_images?fileName=0efc6a93-293e-4ecb-98ae-167611635687.jpg",
      htmlContent: `
                <table style="width:100%; border: 1px solid black">
              <tr>
                <th>Company</th>
                <th>Contact</th>
                <th>Country</th>
              </tr>
              <tr>
                <td>Alfreds Futterkiste</td>
                <td>Maria Anders</td>
                <td>Germany</td>
              </tr>
              <tr>
                <td>Centro comercial Moctezuma</td>
                <td>Francisco Chang</td>
                <td>Mexico</td>
              </tr>
            </table>
            <input type="text">`,
      status: 1,
    },
    {
      id: 3,
      title: "LMS Form",
      cover: "https://uxdt.nic.in/wp-content/uploads/2020/07/Feedback-Form-1_p.png?x38773",
      htmlContent: `
                <table style="width:100%; border: 1px solid black">
              <tr>
                <th>Company</th>
                <th>Contact</th>
                <th>Country</th>
              </tr>
              <tr>
                <td>Alfreds Futterkiste</td>
                <td>Maria Anders</td>
                <td>Germany</td>
              </tr>
              <tr>
                <td>Centro comercial Moctezuma</td>
                <td>Francisco Chang</td>
                <td>Mexico</td>
              </tr>
            </table>
            <input type="text">`,
      status: 1,
    },
  ]

  const [openAskToReplace, setOpenAskToReplace] = useState(false);
  const handleOpenAskToReplace = () => {
    setOpenAskToReplace(true);
  }


  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            paddingTop: 3,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <div className='border-b px-4 pb-4 flex justify-between'>
          <div className='card-title text-[16px]'>Templates</div>
          <div className='tooltip tooltip-left tooltip-secondary' data-tip="close">
            <ArrowSquareRight onClick={handleDrawerClose} size="30" className="text-base-content hover:scale-110 transition-all" />
          </div>
        </div>
        <div className='px-4 py-4 bg-base-100'>
          {
            templates?.map((item: TemplateType) => (
              < div
                key={item?.id}
                onClick={() => handleSetTemplate(item?.htmlContent)}
                className='border rounded-md w-full h-60 p-1 mb-3 cursor-pointer'>
                <Image
                  width={500}
                  height={500}
                  alt={item?.title}
                  className='w-full rounded-md object-cover h-full'
                  src={item?.cover} />
              </div>
            ))
          }
        </div >
      </Drawer >
      <AskToReplaceTemplate open={openAskToReplace} setOpen={setOpenAskToReplace} />

    </>
  )
}

export default DrawerTemplate