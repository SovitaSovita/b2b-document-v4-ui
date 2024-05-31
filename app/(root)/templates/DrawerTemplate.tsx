import React from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Image from 'next/image';

const drawerWidth = 240;
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

function DrawerTemplate({ open, handleDrawerClose, editorRef }: any) {
    const theme = useTheme();

    const handleSetTemplate = () => {
        const htmlTable = `
        <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <th colspan="5" style="text-align: center; font-size: 18px;">KORSA SOFTWARE INNOVATION</th>
        </tr>
        <tr>
          <th colspan="2" style="text-align: left;">Requester</th>
          <th colspan="1" style="text-align: left;">Manager 1</th>
          <th colspan="1" style="text-align: left;">Checker</th>
          <th colspan="1" style="text-align: left;">Approver</th>
        </tr>
        <tr>
          <td colspan="2" style="text-align: left;">Ly Chenghao</td>
          <td colspan="1" style="text-align: left;">Chí Dlear</td>
          <td colspan="1" style="text-align: left;"></td>
          <td colspan="1" style="text-align: left;"></td>
        </tr>
        <tr>
          <td colspan="2" style="text-align: left;">5/2/2024</td>
          <td colspan="1" style="text-align: left;">05 102/204</td>
          <td colspan="1" style="text-align: left;">05-Feb-24</td>
          <td colspan="1" style="text-align: left;">06 Feb 24</td>
        </tr>
        <tr>
          <th colspan="5" style="text-align: left; font-size: 16px;">Document No. VO_202402_007</th>
        </tr>
        <tr>
          <th colspan="2" style="text-align: left;">Requestor</th>
          <th colspan="3" style="text-align: left;">Subject</th>
        </tr>
        <tr>
          <td colspan="2" style="text-align: left;">Sann Puthy</td>
          <td colspan="3" style="text-align: left;">Advance payment</td>
        </tr>
        <tr>
          <th colspan="1" style="text-align: left;">Requested Date</th>
          <th colspan="2" style="text-align: left;">Scheduled Date</th>
          <th colspan="2" style="text-align: left;"></th>
        </tr>
        <tr>
          <td colspan="1" style="text-align: left;">01-02-2024</td>
          <td colspan="2" style="text-align: left;">05-02-2024</td>
          <th colspan="2" style="text-align: left;"></th>
        </tr>
        <tr>
          <th colspan="5" style="text-align: left;">Description</th>
        </tr>
        <tr>
          <td colspan="5" style="text-align: left;">Communications day in Feb (MB Dept 31 pax)</td>
        </tr>
        <tr>
          <th colspan="2" style="text-align: left;">Currency</th>
          <th colspan="1" style="text-align: left;">Total</th>
          <th colspan="2" style="text-align: left;"></th>
        </tr>
        <tr>
          <td colspan="2" style="text-align: left;">USD</td>
          <td colspan="1" style="text-align: left;">$310.00</td>
          <th colspan="2" style="text-align: left;"></th>
        </tr>
        <tr>
          <th colspan="5" style="text-align: left;">Details</th>
        </tr>
        <tr>
          <th colspan="1" style="text-align: left;">Name</th>
          <th colspan="1" style="text-align: left;">Amount</th>
          <th colspan="2" style="text-align: left;">Purpose</th>
          <th colspan="1" style="text-align: left;">Description</th>
        </tr>
        <tr>
          <td colspan="1" style="text-align: left;"></td>
          <td colspan="1" style="text-align: left;">$310.00</td>
          <td colspan="2" style="text-align: left;">Employee Benefits</td>
          <td colspan="1" style="text-align: left;">Communications day in Feb (MB Dept 31 pax)</td>
        <tr>
    </table>
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
                    },
                }}
                variant="persistent"
                anchor="right"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
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