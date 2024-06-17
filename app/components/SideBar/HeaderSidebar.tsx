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
        <div className="p-2 mt-3 pl-1 flex justify-between">
            <div className='flex items-center cursor-pointer w-full' onClick={handleClick}>
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            className="capitalize px-3 rounded-lg text-secondary bg-primary-50 w-36 flex justify-between"
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
                        <Button onClick={handleOpenArticle} className="bg-primary-50 text-secondary tooltip tooltip-secondary tooltip-left cursor-pointer" data-tip="New Article">
                            <Edit size={18} />
                        </Button>
                    </div>
                )
            }
        </div>
    )
}

export default HeaderSidebar