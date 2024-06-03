import React from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Image from 'next/image';
import { ArrowCircleRight, ArrowSquareRight } from 'iconsax-react';

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
  const theme = useTheme();

  const handleSetTemplate = () => {
    const htmlTable = `
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
  <input type="text">
  
        `
    const htmlContent = `
        <div style="display: flex; align-items: center; justify-content: center; padding: 48px;">
            <div style="margin: auto; width: 100%; max-width: 550px; background-color: #fff;">
                    <div style="margin-bottom: 20px;">
                        <label style="margin-bottom: 12px; display: block; font-size: 1rem; font-weight: 500; color: #07074D;">Full Name</label>
                        <div style="width: 100%; border-radius: 0.375rem; border: 1px solid #e0e0e0; background-color: #fff; padding: 12px; font-size: 1rem; font-weight: 500; color: #6B7280; outline: none; border-color: #6A64F1; box-shadow: 0 0 0 2px #6A64F1;">
                            Pich Chantha
                        </div>
                    </div>
            </div>
        </div>
        `;

    editorRef?.current?.setContent(editorRef.current.getContent() + htmlTable);
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
          <div
            onClick={handleSetTemplate}
            className='border rounded-md w-full h-60 mb-3 cursor-pointer'>
            <Image
              width={500}
              height={500}
              alt='preview'
              className='w-full h-full'
              src={'https://cdn.create.microsoft.com/catalog-assets/en-us/ce343500-4aff-4dfa-b337-57c78459c6ee/thumbnails/616/modern-nursing-resume-orange-modern-geometric-2-1-b3fad7d361c3.webp'} />
          </div>
        </div >
      </Drawer >
    </>
  )
}

export default DrawerTemplate