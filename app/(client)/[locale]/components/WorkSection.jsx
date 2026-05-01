'use client'


import { IoDocumentTextOutline } from "react-icons/io5";
import { CgPhone } from "react-icons/cg";
import { IoLocation } from "react-icons/io5";
import { GiMoneyStack } from "react-icons/gi";
import { BsBusFrontFill } from "react-icons/bs";

import {useTranslations} from "next-intl";

export default function WorkSection({dict}){
    const message = useTranslations("HomePage");

    return (
        <div className={'flex flex-col items-center pb-[30px] text-gray-700 dark:text-gray-100'}>
            <h2 className={'text-3xl text-center font-bold mb-[40px]'}>{message("workTitle")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-8 justify-between ">
                <div className={'flex flex-col items-center'}>
                    <div className={'p-5 mb-4'}>
                        <IoDocumentTextOutline size={'52'} className={'text-sky-500'}/>
                    </div>
                    <div  className={'flex flex-col items-center justify-center pt-[40px] pb-[25px] lg:pt-[48px] lg:pb-[32px] '}>
                        <p className={'text-lg lg:text-xl font-bold text-center pb-[15px]'}>{message("workDescriptionTitle1")}</p>
                    </div>
                </div>

                <div className={'flex flex-col items-center'}>
                    <div className={'p-5 mb-4'}>
                        <CgPhone size={'52'} className={'text-sky-500'}/>
                    </div>
                    <div
                        className={'flex flex-col items-center justify-center pt-[40px] pb-[25px] lg:pt-[48px] lg:pb-[32px] '}>
                        <p className={'text-lg lg:text-xl font-bold text-center pb-[15px]'}>{message("workDescriptionTitle2")}</p>
                    </div>
                </div>

                <div className={'flex flex-col items-center'}>
                    <div className={'p-5 mb-4'}>
                        <IoLocation size={'52'} className={'text-sky-500'}/>
                    </div>
                    <div
                        className={'flex flex-col items-center justify-center pt-[40px] pb-[25px] lg:pt-[48px] lg:pb-[32px] '}>
                        <p className={'text-lg lg:text-xl font-bold text-center pb-[15px]'}>{message("workDescriptionTitle3")}</p>
                    </div>
                </div>

                <div className={'flex flex-col items-center'}>
                    <div className={'p-5 mb-4'}>
                        <GiMoneyStack size={'52'} className={'text-sky-500'}/>
                    </div>
                    <div
                        className={'flex flex-col items-center justify-center pt-[40px] pb-[25px] lg:pt-[48px] lg:pb-[32px] '}>
                        <p className={'text-lg lg:text-xl font-bold text-center pb-[15px]'}>{message("workDescriptionTitle4")}</p>
                    </div>
                </div>

                <div className={'flex flex-col items-center'}>
                    <div className={'p-5 mb-4'}>
                        <BsBusFrontFill size={'52'} className={'text-sky-500'}/>
                    </div>
                    <div
                        className={'flex flex-col items-center justify-center pt-[40px] pb-[25px] lg:pt-[48px] lg:pb-[32px] '}>
                        <p className={'text-lg lg:text-xl font-bold text-center pb-[15px]'}>{message("workDescriptionTitle5")}</p>
                    </div>
                </div>


            </div>
        </div>
    )
}
