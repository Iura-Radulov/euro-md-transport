'use client';


import LocaleSwitcher from './LocaleSwitcher';
import ThemeSwitcher from "./ThemeSwitcher";
import {
    Dropdown,
    DropdownItem,
    Label,
    Select,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
    Tooltip, DarkThemeToggle
} from "flowbite-react";

import Image from "next/image";
import logoImage from '@/public/assets/images/MaimLogo.jpg';
import logoImageBlack from '@/public/assets/images/logo_black.jpg';
import {Link} from "@/i18n/navigation";
import { MdOutlinePhone } from "react-icons/md";
export default function MainHeader({ lang, messages }) {
    const dict =messages.nav;

  return (
    <header className='bg-white dark:bg-gray-800 border-b-2 border-neutral-400'>
      <div className='container mx-auto py-4 px-4'>

          <Navbar fluid rounded>
              <NavbarBrand href="/">
                  <Image
                      src={logoImage}
                      width={250}
                      height='auto'
                      alt='loader'
                      loading="eager"
                      className='object-contain dark:hidden'
                  />
                  <Image
                      src={logoImageBlack}
                      width={250}
                      height='auto'
                      alt='loader'
                      loading="eager"
                      className='object-contain hidden dark:block'
                  />

              </NavbarBrand>
              <NavbarToggle/>

              <NavbarCollapse className="mx-auto">
                  <NavbarLink className='text-lg' href={'/services'}>
                      {dict.services}
                  </NavbarLink>
                  <NavbarLink className='text-lg' href={'/about'}>
                      {dict.about}
                  </NavbarLink>
                  <NavbarLink className='text-lg' href={'/contacts'}>
                      {dict.contact}
                  </NavbarLink>
              </NavbarCollapse>
              <div className='my-3 md:my-0 flex items-center gap-3'>
                  <a href="tel:+37367170409" className={'flex items-center col-4 row text-gray-700 dark:text-gray-400'}>
                      <MdOutlinePhone className="" size={24}  />
                       <span className='hidden md:block ml-2 text-lg '>(+373) 671 70 409</span>
                  </a>

                  <div className='flex items-center md:justify-between row '>
                      <ThemeSwitcher/>
                      <LocaleSwitcher lang={lang}/>
                  </div>
              </div>

          </Navbar>

      </div>
    </header>
  );
}
