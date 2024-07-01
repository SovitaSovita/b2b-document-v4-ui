import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import logoDocument from "../../../public/icon/Document.png"
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { Menu, MenuItem, MenuProps, alpha, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getOptionData } from '@/app/service/Redux/articleDetailSlice';
import { RootState } from '@/app/service/Redux/store/store';
import { useRouter } from 'next/navigation';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { ArrowDown3, ArrowSwapHorizontal, Building, Edit, Global, People, Profile, Profile2User, ProfileCircle } from 'iconsax-react';

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

    return {
        '& .MuiPaper-root': {
            borderRadius: '0 0 6px 6px',
            marginTop: theme.spacing(0.3),
            minWidth: 305,
            paddingTop: "7px",
            marginLeft: "-8px",
            borderWidth: '1px',
            borderTop: 'none',
            // boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.1)',
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

function HeaderSidebar({ handleOpenArticle, isForm }: any) {

    const dispatch = useDispatch();
    const router = useRouter()

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    return (
        <div className="p-2 mt-3 pl-1 flex justify-between">
            {
                handleOpenArticle && (
                    <div style={{margin:"auto 19% auto 19%"}}>
                        <Button onClick={handleOpenArticle} className="bg-primary-50 text-secondary tooltip tooltip-secondary tooltip-left cursor-pointer" data-tip="New Article" >
                            <Edit size={18} />
                            <span>Add New Article</span>
                        </Button>
                    </div>
                )
            }
        </div>
    )
}

export default HeaderSidebar