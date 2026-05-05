'use client'


import { IoDocumentTextOutline } from "react-icons/io5";
import { CgPhone } from "react-icons/cg";
import { IoLocation } from "react-icons/io5";
import { GiMoneyStack } from "react-icons/gi";
import { BsBusFrontFill } from "react-icons/bs";

import {useTranslations} from "next-intl";

export default function AdvantagesSection(){
    const message = useTranslations("HomePage");

    return (
        <section className={"container mx-auto py-10 lg:py-16 px-4"}>
        <div className={'flex flex-col items-center pb-[30px] text-gray-700 dark:text-gray-100'}>
            <h2 className={'text-3xl text-center font-bold mb-[40px] lg:mb-[80px]'}>{message("advantagesTitle")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 justify-between ">
                <div className={'flex p-5'}>
                    <div className={'mr-5'}>
                        <IoDocumentTextOutline size={'80'} className={'text-sky-500'}/>
                    </div>
                    <div className={'flex flex-col items-center pb-[25px]'}>
                        <p className={'text-xl lg:text-2xl text-sky-700 font-bold text-center pb-[15px] lg:pb-[25px]'}>{message("advantagesBlockTitle1")}</p>
                        <p className={'text-base lg:text-lg font-bold text-center pb-[15px]'}>{message("advantagesBlockDescription1")}</p>
                    </div>
                </div>

                <div className={'flex p-5'}>
                    <div className={'mr-5'}>
                        <IoDocumentTextOutline size={'80'} className={'text-sky-500'}/>
                    </div>
                    <div className={'flex flex-col items-center pb-[25px]  '}>
                        <p className={'text-xl lg:text-2xl text-sky-700 font-bold text-center pb-[15px] lg:pb-[25px]'}>{message("advantagesBlockTitle2")}</p>
                        <p className={'text-base lg:text-lg font-bold text-center pb-[15px]'}>{message("advantagesBlockDescription2")}</p>
                    </div>
                </div>

                <div className={'flex p-5'}>
                    <div className={'mr-5'}>
                        <IoDocumentTextOutline size={'80'} className={'text-sky-500'}/>
                    </div>
                    <div
                        className={'flex flex-col items-center pb-[25px]'}>
                        <p className={'text-xl lg:text-2xl text-sky-700 font-bold text-center pb-[15px] lg:pb-[25px]'}>{message("advantagesBlockTitle3")}</p>
                        <p className={'text-base lg:text-lg font-bold text-center pb-[15px]'}>{message("advantagesBlockDescription3")}</p>
                    </div>
                </div>

                <div className={'flex p-5'}>
                    <div className={'mr-5'}>
                        <IoDocumentTextOutline size={'80'} className={'text-sky-500'}/>
                    </div>
                    <div
                        className={'flex flex-col items-center pb-[25px]'}>
                        <p className={'text-xl lg:text-2xl text-sky-700 font-bold text-center pb-[15px] lg:pb-[25px]'}>{message("advantagesBlockTitle4")}</p>
                        <p className={'text-base lg:text-lg font-bold text-center pb-[15px]'}>{message("advantagesBlockDescription4")}</p>
                    </div>
                </div>

                <div className={'flex p-5'}>
                    <div className={'mr-5'}>
                        <IoDocumentTextOutline size={'80'} className={'text-sky-500'}/>
                    </div>
                    <div
                        className={'flex flex-col items-center pb-[25px]'}>
                        <p className={'text-xl lg:text-2xl text-sky-700 font-bold text-center pb-[15px] lg:pb-[25px]'}>{message("advantagesBlockTitle5")}</p>
                        <p className={'text-base lg:text-lg font-bold text-center pb-[15px]'}>{message("advantagesBlockDescription5")}</p>
                    </div>
                </div>

                <div className={'flex p-5'}>
                    <div className={'mr-5'}>
                        <IoDocumentTextOutline size={'80'} className={'text-sky-500'}/>
                    </div>
                    <div
                        className={'flex flex-col items-center pb-[25px]'}>
                        <p className={'text-xl lg:text-2xl text-sky-700 font-bold text-center pb-[15px] lg:pb-[25px]'}>{message("advantagesBlockTitle6")}</p>
                        <p className={'text-base lg:text-lg font-bold text-center pb-[15px]'}>{message("advantagesBlockDescription6")}</p>
                    </div>
                </div>


            </div>
        </div>
        </section>
    )
}
