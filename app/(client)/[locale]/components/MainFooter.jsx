"use client";

import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import { BsDribbble, BsFacebook, BsTelegram, BsInstagram, BsTwitterX } from "react-icons/bs";
import {useTranslations} from "next-intl";
export default function MainFooter() {

  const message = useTranslations("nav");
  return (
      <div className=''>
      <Footer container >
        <div className="w-full">
          <div className="container mx-auto py-4 px-4 grid w-full justify-between sm:flex sm:justify-between ">

              <FooterBrand
                  href="/"
                  src="/assets/images/logo.png"
                  alt="EuroMd Logo"
                  name="EuroMd Transport"

              />

            <FooterLinkGroup >
              <FooterLink href="/services" className='text-lg'>{message("services")}</FooterLink>
              <FooterLink href="/about" className='text-lg'>{message("about")}</FooterLink>
              <FooterLink href="/contacts" className='text-lg'>{message("contact")}</FooterLink>
            </FooterLinkGroup>
          </div>
          <FooterDivider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <FooterCopyright href="/" by="EuroMd™" year={2026} />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <FooterIcon href="#" icon={BsFacebook} />
              <FooterIcon href="#" icon={BsInstagram} />
              <FooterIcon href="#" icon={BsTwitterX} />
              <FooterIcon href="#" icon={BsTelegram} />


            </div>
          </div>
        </div>
      </Footer>
      </div>
    );
}
