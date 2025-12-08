""
import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    roles: ["USER", "HOST", "ADMIN"], // aitar kaj kii (support)
                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ["USER", "HOST", "ADMIN"],
                },

            ]
        },
        // {
        //     title: "Settings",
        //     items: [
        //         {
        //             title: "Change Password",
        //             href: "/change-password",
        //             icon: "Settings", // ✅ String
        //             roles: ["USER"],
        //         },
        //     ],
        // },
    ]
}

export const hostNavItems: NavSection[] = [
    {
        title: "Patient Management",
        items: [
            {
              
                title: "My Events",
                href: "/host/dashboard/my-events",
                icon: "Event", // ✅ String
                // badge: "3",
                roles: ["HOST"],
            },
            {
              
                title: "Manage User",
                href: "/host/dashboard/manage-participants",
                icon: "participants", // ✅ String
                // badge: "3",
                roles: ["HOST"],
            },
            {
              
                title: "Manage Payments",
                href: "/host/dashboard/my-payments",
                icon: "participants", // ✅ String
                // badge: "3",
                roles: ["HOST"],
            },
            // {
            //     title: "My Schedules",
            //     href: "/doctor/dashboard/my-schedules",
            //     icon: "Clock", // ✅ String
            //     roles: ["DOCTOR"],
            // },
            // {
            //     title: "Prescriptions",
            //     href: "/doctor/dashboard/prescriptions",
            //     icon: "FileText", // ✅ String
            //     roles: ["DOCTOR"],
            // },
        ],
    }
]

export const userNavItems: NavSection[] = [
    {
        // title: "Appointments",
        items: [
            {
                title: "My Events",
                href: "/dashboard/my-events",
                icon: "Events", // ✅ String
                roles: ["USER"],
            },
            {
                title: "Saved Events",
                href: "/dashboard/saved-events",
                icon: "Save", // ✅ String
                roles: ["USER"],
            },
        ],
    },
    // {
    //     title: "Medical Records",
    //     items: [
    //         {
    //             title: "My Prescriptions",
    //             href: "/dashboard/my-prescriptions",
    //             icon: "FileText", // ✅ String
    //             roles: ["PATIENT"],
    //         },
    //         {
    //             title: "Health Records",
    //             href: "/dashboard/health-records",
    //             icon: "Activity", // ✅ String
    //             roles: ["PATIENT"],
    //         },
    //     ],
    // },

]

export const adminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "Manage User",
                href: "/admin/dashboard/manage-user",
                icon: "user", // ✅ String
                roles: ["ADMIN"],
            },
            {
                title: "Manage Host",
                href: "/admin/dashboard/manage-host",
                icon: "host", // ✅ String
                roles: ["ADMIN"],
            },
            {
                title: "Manage event",
                href: "/admin/dashboard/manage-events",
                icon: "event", // ✅ String
                roles: ["ADMIN"],
            },
            // {
            //     title: "Creat Admin",
            //     href: "/admin/dashboard/creat-admin",
            //     icon: "admin", // ✅ String
            //     roles: ["ADMIN"],
            // },
        ],
    },
    // {
    //     title: "Hospital Management",
    //     items: [
    //         {
    //             title: "Appointments",
    //             href: "/admin/dashboard/appointments-management",
    //             icon: "Calendar", // ✅ String
    //             roles: ["ADMIN"],
    //         },
    //         {
    //             title: "Schedules",
    //             href: "/admin/dashboard/schedules-management",
    //             icon: "Clock", // ✅ String
    //             roles: ["ADMIN"],
    //         },
    //         {
    //             title: "Specialities",
    //             href: "/admin/dashboard/specialities-management",
    //             icon: "Hospital", // ✅ String
    //             roles: ["ADMIN"],
    //         },
    //     ],
    // }
]

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);
 
    switch (role) {
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];
        case "HOST":
            return [...commonNavItems, ...hostNavItems];
        case "USER":
            return [...commonNavItems, ...userNavItems];
        default:
            return [];
    }
}