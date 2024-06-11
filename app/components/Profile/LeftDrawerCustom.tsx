'use client'

import React, { ReactNode } from "react";

import Image from "next/image";
import NoProfileComponent from "./NoProfileComponent";
import { useSelector } from "react-redux";
import { RootState } from "@/app/service/Redux/store/store";

const LeftDrawerCustom = ({ children }: { children: ReactNode }) => {

  const session: UserData = useSelector((state: RootState) => state?.article.session);

  return (
    <div className="drawer drawer-end z-50">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-4">

          {/* Profile At Right Menu */}
          {
            session?.prfl_PHTG != "" ? (
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-1">
                  <Image src={session?.prfl_PHTG} alt="pf" width={140} height={100} loading="lazy" />
                </div>
              </div>

            ) : (
              <NoProfileComponent username={session?.flnm} size={"w-10"} />
            )
          }

        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-primary text-base-content">
          {children}
        </ul>
      </div>
    </div>
  );
};

export default LeftDrawerCustom;
