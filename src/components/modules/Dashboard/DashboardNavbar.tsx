import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import DashboardNavbarContent from "./DashboardNavbarContent";
import userInfo from "@/services/user/userInfo";
import { getNavItemsByRole } from "@/lib/navItems.config";

const DashboardNavbar = async () => {
  const userdata = (await userInfo()) 
  const navItems = getNavItemsByRole(userdata.role);
  const dashboardHome = getDefaultDashboardRoute(userdata.role);

  return (
    <DashboardNavbarContent
      userInfo={userdata}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardNavbar;
