'use client'


import Image from "next/image";
import blog1Image from '@/public/assets/images/bus-7.jpg';
import blog2Image from '@/public/assets/images/bus-8.jpg';
import blog3Image from '@/public/assets/images/bus-9.jpg';


import {useTranslations} from "next-intl";

export default function ServiceSection({dict}){
    const message = useTranslations("HomePage");

    const backgroundStyle = {
        backgroundColor: '#161b22',
        backgroundImage: "url('/assets/images/bus-3.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    };


    return (

            <>

            <div className={'z-20 flex flex-col gap-5 '}>
                <h1 className={'text-2xl md:text-6xl'}>{message("serviceTitle")}</h1>
                <p className={'text-base md:text-3xl'}>{message("serviceDescription")}</p>
            </div>
            <div className={'container grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 z-20 '}>
                <div className={'p-10'}>
                    <Image className={'rounded-lg w-full'} src={blog1Image} alt={'blog 1'}/>
                    <div >
                        <h3 className={'text-xl lg:text-2xl font-bold mt-4'}>{message("serviceBlock1Title1")}</h3>
                        <p className={'mt-2 text-base'}>{message("serviceBlock1Description1")}</p>
                    </div>
                </div>

                <div className={'p-10'}>
                    <Image className={'rounded-lg w-full'} src={blog2Image} alt={'blog 2'}/>
                    <div>
                        <h3 className={'text-xl lg:text-2xl font-bold mt-4'}>{message("serviceBlock1Title2")}</h3>
                        <p className={'mt-2 text-base'}>{message("serviceBlock1Description2")}</p>
                    </div>
                </div>

                <div className={'p-10'}>
                    <Image className={'rounded-lg w-full'} src={blog3Image} alt={'blog 3'}/>
                    <div>
                        <h3 className={'text-xl lg:text-2xl font-bold mt-4'}>{message("serviceBlock1Title3")}</h3>
                        <p className={'mt-2 text-base'}>{message("serviceBlock1Description3")}</p>
                    </div>
                </div>
            </div>
            </>

    )
}
