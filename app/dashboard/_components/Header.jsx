"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

function Header() {

    const path = usePathname();
    useEffect(() => {
        console.log(path)
    }, [])

  return (
    <div className='flex px-6 py-4 items-center justify-between bg-secondary shadow-sm'>
      <Image src={'/logo.svg'} width={160} height={100} alt="Logo"/>

      <ul className='flex gap-6'>
        <li className={`hover:text-[#4845D2] hover:font-bold transition-all cursor-pointer ${path == '/dashboard' && 'text-[#4845D2] font-bold'}`}>Dashboard</li>
        <li className={`hover:text-[#4845D2] hover:font-bold transition-all cursor-pointer ${path == '/questions' && 'text-[#4845D2] font-bold'}`}>Questions</li>
        <li className={`hover:text-[#4845D2] hover:font-bold transition-all cursor-pointer ${path == '/upgrades' && 'text-[#4845D2] font-bold'}`}>Upgrades</li>
        <li className={`hover:text-[#4845D2] hover:font-bold transition-all cursor-pointer ${path == '/how' && 'text-[#4845D2] font-bold'}`}>How it Works?</li>
      </ul>

      <UserButton/>
    </div>
  )
}

export default Header
