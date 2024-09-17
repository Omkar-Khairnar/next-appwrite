"use client"

import Signup from "@/components/Signup"
import useAuth from "@/context/useAuth"
import { useRouter } from "next/navigation"
import React from "react"


const page = () => {
    const router = useRouter();
    const {authStatus} = useAuth();

    if(authStatus){
        router.replace('/profile');
        return <></>;
    }


  return (
    <div>
       <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <Signup />
        </section>
    </div>
  )
}

export default page
