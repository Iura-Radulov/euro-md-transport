
import Provider from "../../components/Provider";
import {ThemeProvider} from "flowbite-react";
import {applyTheme, customTheme} from "../theme";
export const metadata = {
    title: 'Admin panel',
    description: 'Admin panel for EuroMdTransport',
}





export default async function DashboardLayout({children}){



    return (
        <Provider>
                {children}
        </Provider>
    );




    }
