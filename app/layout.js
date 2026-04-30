import Provider from "../components/Provider";
import { Inter } from "next/font/google";
import {ThemeModeScript, ThemeProvider} from "flowbite-react";
import { applyTheme, customTheme } from "./theme";

import "./globals.css";
import {twMerge} from "tailwind-merge";

// server-side session
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
    title: 'EuroMDTransport',
    description: 'EuroMDTransport app',
};


export default async function RootLayout({ children, params }) {
    const { locale } = await params;

    // get server session and pass to Provider
    // const session = await getServerSession(authOptions);

    return (
        <html lang={locale} suppressHydrationWarning>
        <head>
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
                rel="stylesheet"
                type="text/css"
            />
            <ThemeModeScript/>
            <title>{metadata.title}</title>
        </head>
        <body className={twMerge("bg-gray-50 dark:bg-gray-800", inter.className)}>
        <ThemeProvider theme={customTheme} applyTheme={applyTheme}>
            {/*<Provider session={session}>*/}
                {children}
            {/*</Provider>*/}
        </ThemeProvider>
        </body>
        </html>
    )
}
