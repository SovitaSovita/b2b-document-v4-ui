'use client'

import React, { ReactNode } from "react";
import Profile from "./Profile";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const LeftDrawerCustom = ({ children }: { children: ReactNode }) => {

  const { data: session, status }: { data: any, status: any } = useSession();

  console.log("status : ", status);
  console.log("session : ", session);

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-4">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <Image src={session?.user.image ? session.user.image : session?.user.prfl_PHTG} alt="pf" width={140} height={100} loading="lazy" />
            </div>
          </div>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {children}
        </ul>
      </div>
    </div>
  );
};

export default LeftDrawerCustom;
