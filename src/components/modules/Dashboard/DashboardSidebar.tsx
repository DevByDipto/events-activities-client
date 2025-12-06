import { getDefaultDashboardRoute } from "@/lib/auth-utils";

import DashboardSidebarContent from "./DashboardSidebarContent";
import userInfo from "@/services/user/userInfo";
import { getNavItemsByRole } from "@/lib/navItems.config";
import { NavSection } from "@/types/dashboard.interface";

const DashboardSidebar = async () => {
  const userdata = (await userInfo())

  const navItems: NavSection[] = getNavItemsByRole(userdata.role);
  const dashboardHome = getDefaultDashboardRoute(userdata.role);

  return (
    <DashboardSidebarContent
      userInfo={userdata}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardSidebar;
