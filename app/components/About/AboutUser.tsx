"use client"

import { RootState } from '@/app/service/Redux/store/store';
import Image from 'next/image';
import React from 'react'
import { useSelector } from 'react-redux';

export default function AboutUser() {

  const session: UserData = useSelector((state: RootState) => state?.article.session);
  console.log({ session });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-3/4 md:w-1/2 lg:w-1/3">
        <div className="card card-side bg-base-100 shadow-lg">
          <figure>
            <Image
              src={session?.prfl_PHTG} alt="pf" width={140} height={100} loading="lazy"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-lg md:text-xl lg:text-2xl">
              {session?.flnm}
            </h2>
            <p className="text-sm md:text-base lg:text-lg">{session?.eml}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
