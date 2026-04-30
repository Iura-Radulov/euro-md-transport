"use client"
import { useTranslations } from "next-intl";
import TransportForm from "./components/TransportForm";

export default function HomePage() {
    const message = useTranslations("HomePage");

    const backgroundStyle = {
        backgroundColor: '#1f2937',
        backgroundImage: "url('/assets/images/bus-2.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    };

    return (
        <>
        <section style={backgroundStyle} className={"transparentBackground bg-radial-[at_25%_25%] from-white to-zinc-900 to-75%  h-screen lg:h-96 flex flex-col" +
            " items-center justify-center  text-center px-4 py-6 md:py-20 lg:py-60 "}>
            <div className={'z-20 flex flex-col gap-5 text-white'}>
                <h1 className={'text-2xl md:text-6xl'}>{message("title")}</h1>
                <p className={'text-base md:text-3xl'}>{message("description")}</p>
            </div>
        </section>
        <section className={"container mx-auto py-10 px-4"}>
            <TransportForm/>

        </section>
        </>
    );
}