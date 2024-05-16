'use client'

import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import { Backdrop, Box, Button, Modal, Typography } from '@mui/material';
import { API_M_BASE_URL } from '@/app/utils/xhttp';

function Page() {

    const [credentials, setCredentials] = useState({ userId: '' });
    const router = useRouter();

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const res = await fetch(`${API_M_BASE_URL}/api/v1/auth/send-otp`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        })
        const user = await res.json();
        console.log(res);
        if (res.ok) {
            localStorage.setItem("userId", credentials?.userId)
            handleOpenOTP()
        }
    };

    //OTP code
    const handleSignIn = async (otpCode: string) => {
        const result = await signIn("credentials", {
            userId: localStorage.getItem("userId"),
            optCode: otpCode,
            appId: "2",
            redirect: false,
        });

        if (result?.ok) {
            router.push("/");
        }
    };

    const [value, setValue] = React.useState("");

    const handleChangeOTP = (value: string) => {
        setValue(value);
    };

    const handleComplete = (value: string) => {
        console.log(value);
        handleSignIn(value);
    };

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
    };

    const [open, setOpen] = React.useState(false);
    const handleOpenOTP = () => setOpen(true);
    const handleCloseOTP = (event: any, reason: string) => {

        if (reason && reason === "backdropClick")
            return;

        setOpen(false)
    };

    const { data: session, status }: { data: any, status: any } = useSession();

    if (status === "authenticated") {
        router.push('/')
    }



    return (
        <>
            <div className='flex items-center min-h-screen bg-slate-100'>
                <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
                    <div className="hidden bg-cover lg:block lg:w-1/2 bg-cover_auth"></div>

                    <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                        <div className="flex justify-center mx-auto">
                            <Image src={"https://www.kosign.com.kh/images/Vectors-Wrapper.svg"} alt="" width={140} height={100} />
                        </div>

                        <a onClick={() => signIn('google')} href="#" className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <div className="px-4 py-2">
                                <svg className="w-6 h-6" viewBox="0 0 40 40">
                                    <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                                    <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                                    <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                                    <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                                </svg>
                            </div>

                            <span className="w-5/6 px-4 py-3 font-bold text-center">Sign in with Google</span>
                        </a>

                        <div className="flex items-center justify-between mt-4">
                            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                            <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">or login
                                with username</a>

                            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="LoggingEmailAddress">Username</label>
                                <input name="userId" onChange={handleChange} id="LoggingEmailAddress" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="text" />
                            </div>

                            {/* <div className="mt-4">
                            <div className="flex justify-between">
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="loggingPassword">Password</label>
                            </div>

                            <input name='password' onChange={handleChange} id="loggingPassword" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="password" />
                        </div> */}

                            <div className="mt-6">
                                <button type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                                    Sign In
                                </button>
                            </div>
                        </form>

                        <div className="flex items-center justify-between mt-4">
                            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                            <a href="#" className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"></a>

                            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                        </div>
                    </div>
                </div>
            </div >

            <Button onClick={handleOpenOTP}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleCloseOTP}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="text-center flex justify-center flex-col items-center">
                        <GppGoodOutlinedIcon className="text-[60px] bg-primary text-white rounded-full mb-2 p-2" />
                        <h1 className="mb-6 font-semibold text-xl text-base-content">
                            Enter OTP Code
                        </h1>
                    </div>
                    <div>
                        <PinInput
                            value={value}
                            autoFocus={true}
                            onChange={handleChangeOTP}
                            onComplete={handleComplete}
                            placeholder=""
                        >
                            {[...Array(6)].map((_, index) => (
                                <PinInputField
                                    key={index}
                                    width={60}
                                    textAlign="center"
                                    rounded="4px"
                                    padding="16px 5px"
                                    border={"1px solid #bdc3c7"}
                                    marginRight={3}
                                />
                            ))}
                        </PinInput>
                    </div>
                </Box>
            </Modal>
        </>

    )
}

export default Page