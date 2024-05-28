import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import logoDocument from "../../../public/icon/Document.png"
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { Menu, MenuItem, MenuProps, alpha, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getOptionData } from '@/app/service/Redux/articleDetailSlice';
import { RootState } from '@/app/service/Redux/store/store';

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => {
    const [mode, setMode] = useState('light'); // Default mode

    useEffect(() => {
        // Access localStorage only on the client-side
        if (typeof window !== 'undefined') {
            const storedMode = localStorage.getItem("mode");
            if (storedMode) {
                setMode(storedMode);
            }
        }
    }, []);

    return {
        '& .MuiPaper-root': {
            borderRadius: 6,
            marginTop: theme.spacing(2),
            minWidth: 285,
            color: mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
            background: mode === 'light' ? "" : 'oklch(0.232607 0.013807 253.101)',
            borderWidth: '1.5px',
            boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.1)',
            '& .MuiMenu-list': {
                padding: '4px 0',
            },
            '& .MuiMenuItem-root': {
                '&:active': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        theme.palette.action.selectedOpacity,
                    ),
                },
            },
        },
    };
});


function HeaderSidebar({ handleOpenArticle }: any) {

    const dispatch = useDispatch();
    const session: UserData = useSelector((state: RootState) => state?.article.session);

    const [activeItems, setActiveItem] = useState("PUBLIC");

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //To filter tag and article data for 3 option
    const handleGetTagNArticle = (option: string) => {
        if (option == "DEPARTMENT") {
            setActiveItem(option)
            dispatch(getOptionData(option));
        }
        else if (option == "PRIVATE") {
            setActiveItem(option)
            dispatch(getOptionData(option));
        }
        else if (option == "PUBLIC") {
            setActiveItem(option)
            dispatch(getOptionData(option));
        }
        else dispatch(getOptionData(option));

        handleClose()
    }

    const splitString = (username: string) => {
        if (username) {
            const parts = username?.split(" ");
            let result = ""
            parts.forEach((part: string) => {
                const firstLetter = part.charAt(0);
                result += firstLetter;
            });
            return result;
        }

    }

    return (
        <div className="p-2 pl-1 bg-base-100 border rounded-lg flex justify-between">
            <div className='flex items-center cursor-pointer' onClick={handleClick}>
                <UnfoldMoreRoundedIcon className='text-gray-500 text-[19px]' />
                <Image src={logoDocument} alt="" width={50} />
                <span className="inline-flex tracking-widest flex-col font-semibold text-gray-600 text-md font-Poppin ml-2">
                    <button className="button" data-text="Awesome">
                        <span className="actual-text">Document&nbsp;</span>
                        <span aria-hidden="true" className="hover-text">Document&nbsp;</span>
                    </button>
                    <span className='text-xs font-extralight'>v4.0</span>
                </span>
                {/* <Button onClick={handleDrawerClose}>Open drawer</Button> */}
            </div>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleGetTagNArticle("PRIVATE")} disableRipple>
                    <div className='flex justify-between w-full items-center'>
                        <div className='flex items-center'>
                            <div className='w-7 h-7 bg-teal-400 rounded-md flex justify-center items-center text-base-100 text-xs font-medium'>
                                {splitString(session?.flnm)}
                            </div>
                            <div className='ml-2 text-sm font-medium'>Personal</div>
                        </div>
                        {
                            activeItems == "PRIVATE" && <CheckOutlinedIcon />
                        }
                    </div>
                </MenuItem>
                <MenuItem onClick={() => handleGetTagNArticle("PUBLIC")} disableRipple>
                    <div className='flex justify-between w-full items-center'>
                        <div className='flex items-center'>
                            <div className='w-7 h-7 bg-blue-500 rounded-md flex justify-center items-center text-base-100 text-sm font-medium'>
                                P
                            </div>
                            <div className='ml-2 text-sm font-medium'>Public</div>
                        </div>
                        {
                            activeItems == "PUBLIC" && <CheckOutlinedIcon />
                        }
                    </div>
                </MenuItem>
                <MenuItem onClick={() => handleGetTagNArticle("DEPARTMENT")} disableRipple>
                    <div className='flex justify-between w-full items-center'>
                        <div className='flex items-center'>
                            <div className='w-7 h-7 bg-orange-500 rounded-md flex justify-center items-center text-base-100 text-sm font-medium'>
                                {splitString(session?.dvsn_NM)}
                            </div>
                            <div className='ml-2 text-sm font-medium'>{session?.dvsn_NM ? session?.dvsn_NM : "Department"}</div>
                        </div>
                        {
                            activeItems == "DEPARTMENT" && <CheckOutlinedIcon />
                        }
                    </div>
                </MenuItem>
            </StyledMenu>
            <div onClick={handleOpenArticle} className="tooltip tooltip-secondary tooltip-left cursor-pointer" data-tip="New Article">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="icon-xl-heavy text-gray-600"><path d="M15.673 3.913a3.121 3.121 0 1 1 4.414 4.414l-5.937 5.937a5 5 0 0 1-2.828 1.415l-2.18.31a1 1 0 0 1-1.132-1.13l.311-2.18A5 5 0 0 1 9.736 9.85zm3 1.414a1.12 1.12 0 0 0-1.586 0l-5.937 5.937a3 3 0 0 0-.849 1.697l-.123.86.86-.122a3 3 0 0 0 1.698-.849l5.937-5.937a1.12 1.12 0 0 0 0-1.586M11 4A1 1 0 0 1 10 5c-.998 0-1.702.008-2.253.06-.54.052-.862.141-1.109.267a3 3 0 0 0-1.311 1.311c-.134.263-.226.611-.276 1.216C5.001 8.471 5 9.264 5 10.4v3.2c0 1.137 0 1.929.051 2.546.05.605.142.953.276 1.216a3 3 0 0 0 1.311 1.311c.263.134.611.226 1.216.276.617.05 1.41.051 2.546.051h3.2c1.137 0 1.929 0 2.546-.051.605-.05.953-.142 1.216-.276a3 3 0 0 0 1.311-1.311c.126-.247.215-.569.266-1.108.053-.552.06-1.256.06-2.255a1 1 0 1 1 2 .002c0 .978-.006 1.78-.069 2.442-.064.673-.192 1.27-.475 1.827a5 5 0 0 1-2.185 2.185c-.592.302-1.232.428-1.961.487C15.6 21 14.727 21 13.643 21h-3.286c-1.084 0-1.958 0-2.666-.058-.728-.06-1.369-.185-1.96-.487a5 5 0 0 1-2.186-2.185c-.302-.592-.428-1.233-.487-1.961C3 15.6 3 14.727 3 13.643v-3.286c0-1.084 0-1.958.058-2.666.06-.729.185-1.369.487-1.961A5 5 0 0 1 5.73 3.545c.556-.284 1.154-.411 1.827-.475C8.22 3.007 9.021 3 10 3A1 1 0 0 1 11 4"></path></svg>
            </div>
        </div>
    )
}

export default HeaderSidebar