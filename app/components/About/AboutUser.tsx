"use client"

import { useSession } from 'next-auth/react'
import React from 'react'

export default function AboutUser() {

  const {data: session, status} = useSession();
  console.log({ session });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-3/4 md:w-1/2 lg:w-1/3">
        <div className="card card-side bg-base-100 shadow-lg">
          <figure>
            <img
              src={session?.user.image ? session.user.image : session?.user.prfl_PHTG} alt="pf" width={140} height={100} loading="lazy"
              
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-lg md:text-xl lg:text-2xl">
              {session?.user.flnm}
            </h2>
            <p className="text-sm md:text-base lg:text-lg">{session?.user.eml}</p>
            
          </div>
        </div>
      </div>
    </div>
  )
}
