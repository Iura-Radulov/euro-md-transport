import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import MainHeader from "@/app/(client)/[locale]/components/MainHeader.jsx";
import MainFooter from "@/app/(client)/[locale]/components/MainFooter.jsx";
import { ThemeInit } from "@/.flowbite-react/init";
import '../../globals.css';
import Script from 'next/script';
import { ThemeProvider, ThemeModeScript } from 'flowbite-react';


export const metadata = {
    title: 'EuroMDTransport',
    description: 'EuroMDTransport app',
};


export default async function LocaleLayout({ children, params }) {
    const { locale } = await params;


    if (!routing.locales.includes(locale)) {
        notFound();
    }


    const messages = await getMessages();

    return (
        <>

        <NextIntlClientProvider messages={messages}>
            <ThemeInit />
            {/*<ThemeProvider  >*/}
            <MainHeader lang={locale} messages={messages}/>
            <main>
                {children}
            </main>

            <MainFooter/>
            {/*</ThemeProvider>*/}
        </NextIntlClientProvider>

        </>

    );
}

// Для статической генерации всех языковых версий
export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}