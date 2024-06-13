'use client'

import SideContent from "../components/SideContent";
import SideBar from "../components/SideBar/SideBar";
import React, { useEffect, useState } from "react";

export default function Home() {

  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="">
        <SideContent openMainDrawer={open} />
      </div>
    </>
  );
}
