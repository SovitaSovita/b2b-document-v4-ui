"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";

export default function page() {
  const { data: session, status } = useSession();

  // console.log("status : ", status);
  // console.log("session : ", session);

  const router = useRouter();

  const handleSignIn = async (otpCode: string) => {
    const result = await signIn("credentials", {
      userId: "sovita",
      optCode: otpCode,
      redirect: false,
    });

    console.log(result);

    if (result?.ok) {
      router.push("/");
    }
  };

  const [value, setValue] = React.useState("");

  const handleChange = (value: string) => {
    setValue(value);
  };

  const handleComplete = (value: string) => {
    console.log(value);
    handleSignIn(value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white flex flex-col items-center rounded-lg shadow-lg p-6">
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
            onChange={handleChange}
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
          <div className="form-control mt-6">
            <button className="btn btn-primary">Verify</button>
          </div>
        </div>
      </div>
    </div>
  );
}
