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
import { ArrowDown3, ArrowSwapHorizontal, Building, Global, People, Profile, Profile2User, ProfileCircle } from 'iconsax-react';

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
    const session: UserData = useSelector((state: RootState) => state?.article.session);

    //const [activeItems, setActiveItem] = useState("PRIVATE");
    const optionGETdata = useSelector((state: RootState) => state?.article.getOptionData);
    const router = useRouter()

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (isForm) router.push("/")
        else setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [keyToDisplay, setKeyToDisplay] = useState("Me");
    //To filter tag and article data for 3 option
    const handleGetTagNArticle = (option: string) => {
        if (option == "DEPARTMENT") {
            setKeyToDisplay(session?.dvsn_NM)
            dispatch(getOptionData(option));
        }
        else if (option == "PRIVATE") {
            setKeyToDisplay("Me")
            dispatch(getOptionData(option));
        }
        else if (option == "PUBLIC") {
            setKeyToDisplay("Company")
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

    const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set(["text"]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    useEffect(() => {
        handleGetTagNArticle(selectedKeys?.anchorKey);
    }, [selectedKeys])

    return (
        <div className="p-2 mt-3 pl-1 w-[305px] flex justify-between">
            <div className='flex items-center cursor-pointer w-full' onClick={handleClick}>
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            className="capitalize px-3 rounded-lg text-secondary bg-secondary-50 w-36 flex justify-between"
                        >
                            <span className='flex items-center'>
                                {keyToDisplay === "Me" && <ProfileCircle className='text-secondary text-[19px] mr-2' />}
                                {keyToDisplay === "Company" && <Building className='text-secondary text-[19px] mr-2' />}
                                {(keyToDisplay != "Me" && keyToDisplay != "Company") && <People className='text-secondary text-[19px] mr-2' />}
                                {keyToDisplay}
                            </span>
                            <span>
                                <ArrowSwapHorizontal size={14} />
                            </span>
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Single selection example"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedKeys}
                        onSelectionChange={setSelectedKeys}
                    >
                        <DropdownItem key="PRIVATE">Me</DropdownItem>
                        <DropdownItem key="DEPARTMENT">
                            {session?.dvsn_NM}
                        </DropdownItem>
                        <DropdownItem key="PUBLIC">Company</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                {/* <Button onClick={handleDrawerClose}>Open drawer</Button> */}
            </div>

            {
                handleOpenArticle && (
                    <div>
                        <div onClick={handleOpenArticle} className="tooltip tooltip-secondary tooltip-left cursor-pointer" data-tip="New Article">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="icon-xl-heavy text-gray-600"><path d="M15.673 3.913a3.121 3.121 0 1 1 4.414 4.414l-5.937 5.937a5 5 0 0 1-2.828 1.415l-2.18.31a1 1 0 0 1-1.132-1.13l.311-2.18A5 5 0 0 1 9.736 9.85zm3 1.414a1.12 1.12 0 0 0-1.586 0l-5.937 5.937a3 3 0 0 0-.849 1.697l-.123.86.86-.122a3 3 0 0 0 1.698-.849l5.937-5.937a1.12 1.12 0 0 0 0-1.586M11 4A1 1 0 0 1 10 5c-.998 0-1.702.008-2.253.06-.54.052-.862.141-1.109.267a3 3 0 0 0-1.311 1.311c-.134.263-.226.611-.276 1.216C5.001 8.471 5 9.264 5 10.4v3.2c0 1.137 0 1.929.051 2.546.05.605.142.953.276 1.216a3 3 0 0 0 1.311 1.311c.263.134.611.226 1.216.276.617.05 1.41.051 2.546.051h3.2c1.137 0 1.929 0 2.546-.051.605-.05.953-.142 1.216-.276a3 3 0 0 0 1.311-1.311c.126-.247.215-.569.266-1.108.053-.552.06-1.256.06-2.255a1 1 0 1 1 2 .002c0 .978-.006 1.78-.069 2.442-.064.673-.192 1.27-.475 1.827a5 5 0 0 1-2.185 2.185c-.592.302-1.232.428-1.961.487C15.6 21 14.727 21 13.643 21h-3.286c-1.084 0-1.958 0-2.666-.058-.728-.06-1.369-.185-1.96-.487a5 5 0 0 1-2.186-2.185c-.302-.592-.428-1.233-.487-1.961C3 15.6 3 14.727 3 13.643v-3.286c0-1.084 0-1.958.058-2.666.06-.729.185-1.369.487-1.961A5 5 0 0 1 5.73 3.545c.556-.284 1.154-.411 1.827-.475C8.22 3.007 9.021 3 10 3A1 1 0 0 1 11 4"></path></svg>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default HeaderSidebar