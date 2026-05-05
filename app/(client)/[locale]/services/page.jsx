import {useTranslations} from "next-intl";
import ServiceSection from "../components/ServiceSection";
import TransportForm from "../components/TransportForm";

export default function Page(){

    const message = useTranslations("ServicePage");

    const backgroundStyle = {
        backgroundColor: '#1f2937',
        backgroundImage: "url('/assets/images/bus-6.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    };
    return (
        <>
            <section style={backgroundStyle}
                     className={"transparentBackground bg-radial-[at_25%_25%] from-white to-zinc-900 to-75%  h-screen lg:h-[600px] flex flex-col" +
                         " items-center justify-center  text-center px-4 py-6 md:py-20 lg:py-60 "}>
                <div className={'z-20 flex flex-col gap-5 text-white'}>
                    <h1 className={'text-3xl md:text-6xl'}>{message("title")}</h1>
                    <p className={'text-base md:text-3xl'}>{message("description")}</p>
                </div>
            </section>
            <section className={"container mx-auto py-10 lg:py-16 px-4"}>
                <h3 className={'text-lg lg:text-2xl text-gray-700 dark:text-gray-100'}>{message("text")}</h3>
            </section>

            <section className={"t flex flex-col" +
                " items-center justify-center  text-center px-4 py-10 md:py-20 lg:py-30 text-gray-700 dark:text-gray-100"}>
                <ServiceSection/>
            </section>

            <section className={"container mx-auto py-10 lg:py-16 px-4"}>
                <TransportForm/>
            </section>


        </>
    )

}
