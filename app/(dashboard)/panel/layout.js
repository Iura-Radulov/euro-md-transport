
import {SidebarProvider} from "../../../contexts/sidebar-context";
import {DashboardNavbar} from "./navbar";
import {DashboardSidebar} from "./sidebar";
import * as PropTypes from "prop-types";
import {sidebarCookie} from "../../../lib/sidebar-cookie";
import { LayoutContent } from "./layout-content";
export const metadata = {
    title: 'Admin panel',
    description: 'Admin panel for EuroMdTransport',
}




LayoutContent.propTypes = {children: PropTypes.node};
export default async function PanelLayout({children}){

    const sidebarCookieData = await sidebarCookie.get();

    return (
        <SidebarProvider initialCollapsed={sidebarCookieData.isCollapsed}>
            <DashboardNavbar />
            <div className="mt-16 flex items-start">
                <DashboardSidebar />
                <LayoutContent>{children}</LayoutContent>
            </div>
        </SidebarProvider>
    );


    }
