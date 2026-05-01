import ContactForm from "../components/ContactForm";
import {useTranslations} from "next-intl";

export default function Page(){
    const message = useTranslations("ContactPage");

    const backgroundStyle = {
        backgroundColor: '#1f2937',
        backgroundImage: "url('/assets/images/bus-6.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    };
    return (
        <>
            <section style={backgroundStyle} className={"transparentBackground bg-radial-[at_25%_25%] from-white to-zinc-900 to-75%  h-screen lg:h-[600px] flex flex-col" +
                " items-center justify-center  text-center px-4 py-6 md:py-20 lg:py-60 "}>
                <div className={'z-20 flex flex-col gap-5 text-white'}>
                    <h1 className={'text-3xl md:text-6xl'}>{message("title")}</h1>
                    <p className={'text-lg md:text-3xl'}>{message("description")}</p>
                </div>
            </section>
            <section className={"container mx-auto py-10 lg:py-16 px-4 lg:flex gap-10  "}>
                <div className={"flex-1 mb-10 px-5 lg:px-0 lg:mb-0 dark:text-gray-200"}>
                    <h2 className={"mb-4 lg:mb-8 text-xl lg:text-3xl font-bold mb-4 lg:mb-8 text-center"}>{message("contactInfo")}</h2>
                    <div className={'flex flex-col gap-4'}>
                        <div className={"mb-2"}>
                            <p className={'text-lg lg:text-2xl mb-3'}><strong>{message("phone")}:</strong></p>
                            <p className={'text-base lg:text-xl'}>(+373) 671 70 409</p>
                        </div>
                        <div className={"mb-2"}>
                            <p className={'text-lg lg:text-2xl mb-3'}><strong>{message("email")}:</strong></p>
                            <p className={'text-base lg:text-xl'}>some@mail.com</p>
                        </div>

                        <div className={"mb-2"}>
                            <p className={'text-lg lg:text-2xl mb-3'}><strong>{message("address")}:</strong></p>
                            <p className={'text-base lg:text-xl'}>Some address</p>
                        </div>


                    </div>
                </div>
                <div className={"flex-1"}>
                    <h2 className={"text-xl dark:text-gray-200 lg:text-3xl font-bold mb-4 text-center"}>{message("contactForm")}</h2>
                    <ContactForm/>
                </div>
            </section>
        </>
        )
    }
