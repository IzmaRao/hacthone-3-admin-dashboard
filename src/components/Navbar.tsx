'use client';
import { FaBars, FaTimes } from "react-icons/fa";
import Image from 'next/image';
import icon1 from '../../public/mdi_account-alert-outline.png';
import icon2 from '../../public/akar-icons_search.png';
import icon3 from '../../public/akar-icons_heart.png';
import icon4 from '../../public/ant-design_shopping-cart-outlined.png';
import Link from 'next/link';
import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
function Navbar() {
  return (
    <div className='navbar '>
      <div className='navbaricons space-x-[45px]'>
        <div>

          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  )
}

export default Navbar;