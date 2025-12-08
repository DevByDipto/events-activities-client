/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Menu,
  X,
  Calendar,
  User,
  LogOut,
  Plus,
  LayoutDashboard,
  Users,
  Shield,
  Compass,
  User2,
  Circle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import LogoutButton from "./LogoutButton";
import userInfo from "@/services/user/userInfo";
import { revalidatePathFunction } from "@/services/event/eventDetails";
import { getCookie } from "@/services/auth/tokenHandlers";

export default function PublikkNavbar() {
  
  const pathname = usePathname();

  const [user, setUser] = useState<any>(null);
        const [isStatusChange, setIsStatusChange] = useState(false);
        const [accessToken, setAccessToken] = useState<any>();

console.log("user",accessToken);
useEffect(()=>{
          async function fetchData() {
      const result = await getCookie("accessToken")
setAccessToken(result)
          }
          fetchData()
        },[accessToken])

  useEffect(() => {
    const fetchUser = async () => {
      const data = await userInfo();
      setUser(data);
    };

    fetchUser();
  }, []);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 
 let isAuthenticated : boolean
 if(accessToken){
   isAuthenticated = true;
  }else{
    isAuthenticated = false;
  }

  const isActive = (path: string) => pathname === path;

  const linkClass = (path: string) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive(path)
        ? "bg-primary text-primary-foreground"
        : "text-foreground hover:bg-accent hover:text-accent-foreground"
    }`;

  const renderNavLinks = () => {
    if (!isAuthenticated) {
      return (
        <>
          <Link href="/explore" className={linkClass("/explore")}>
            <Compass className="w-4 h-4" />
            Explore Events
          </Link>
          <Link href="/register" className={linkClass("/register")}>
            Become a Host
          </Link>
        </>
      );
    }

    if (user?.role === "ADMIN") {
      return (
        <>
          <Link href="/my-profile" className={linkClass("/dashboard")}>
            <LayoutDashboard className="w-4 h-4" />
            Admin Dashboard
          </Link>

          <Link
            href="/admin/dashboard/manage-user"
            className={linkClass("/dashboard?tab=users")}
          >
            <Users className="w-4 h-4" />
            Manage Users
          </Link>

          <Link
            href="/admin/dashboard/manage-host"
            className={linkClass("/dashboard?tab=hosts")}
          >
            <Shield className="w-4 h-4" />
            Manage Hosts
          </Link>

          <Link
            href="/admin/dashboard/manage-events"
            className={linkClass("/dashboard?tab=events")}
          >
            <Calendar className="w-4 h-4" />
            Manage Events
          </Link>
        </>
      );
    }

    if (user?.role === "HOST") {
      return (
        <>
          <Link href="/explore" className={linkClass("/explore")}>
            <Compass className="w-4 h-4" />
            Explore Events
          </Link>

          <Link href="/host/dashboard/my-events" className={linkClass("/dashboard")}>
            <Calendar className="w-4 h-4" />
            My Events (Hosted)
          </Link>

          <Link
            href="/host/dashboard/creat-event"
            className={linkClass("/dashboard?tab=create")}
          >
            <Plus className="w-4 h-4" />
            Create Event
          </Link>
        </>
      );
    }

    return (
      <>
        <Link href="/explore" className={linkClass("/explore")}>
          <Compass className="w-4 h-4" />
          Explore Events
        </Link>

        <Link href="/dashboard/my-events" className={linkClass("/dashboard")}>
          <Calendar className="w-4 h-4" />
          My Events
        </Link>
      </>
    );
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">EventHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {renderNavLinks()}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  href={`/my-profile`}
                  className={linkClass(`/profile/${user?.id}`)}
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link> 
                <Link
                  href={`/community`}
                  className={linkClass(`/Community`)}
                >
                  <Circle className="w-4 h-4" />
                  Community
                </Link> 

               <LogoutButton setAccessToken={setAccessToken}/>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>

                <Link href="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-accent"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-1">
              {renderNavLinks()}

              <div className="border-t border-border my-2" />

              {isAuthenticated ? (
                <>
                  <Link
                    href={`/my-profile`}
                    className={linkClass(`/my-profile`)}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <Link
                    href={`/community`}
                    className={linkClass(`/Community`)}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Circle className="w-4 h-4" />
                    Community
                  </Link>

                   <LogoutButton setAccessToken={setAccessToken}/>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={linkClass("/login")}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className={linkClass("/register")}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}

            </div>
          </div>
        )}
        
      </div>
    </nav>
  );
}


// -----------------------

// import Link from "next/link";
// import { Button } from "../ui/button";
// import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
// import { Menu } from "lucide-react";
// import LogoutButton from "./LogoutButton";
// import { getCookie } from "@/services/auth/tokenHandlers";
// import userInfo from "@/services/user/userInfo";


// const PublicNavbar = async () => {
//   const navItems = [
//     { href: "#", label: "Explore Events" },
//     { href: "#", label: "Become a Host" }, 
//     { href: "#", label: "My Events" },
//     { href: "#", label: "Profile" },
//     { href: "#", label: "Create Event" },
//   ];
//   const accessToken = await getCookie('accessToken')
//   const user = await userInfo()
//   // console.log("userrrrr",user);
//   // console.log("accessToken",accessToken);
  
//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur  dark:bg-background/95">
//       <div className="container mx-auto flex h-16 items-center justify-between px-4">
//         <Link href="/" className="flex items-center space-x-2">
//           <span className="text-xl font-bold text-primary">EventHub</span>
//         </Link>

//         <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
//           {navItems.map((link) => (
//             <Link
//               key={link.label}
//               href={link.href}
//               className="text-foreground hover:text-primary transition-colors"
//             >
//               {link.label}
//             </Link>
//           ))}
//         </nav>

//         <div className="hidden md:flex items-center space-x-2">
// {
//   accessToken ?   <LogoutButton/> 
//           :         
//     <Link href="/login" className="text-lg font-medium">
//             <Button>Login</Button>
//           </Link> 
// }
          
       
//         </div>

//         {/* Mobile Menu */}

//         <div className="md:hidden">
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="outline"> <Menu/> </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="w-[300px] sm:w-[400px] p-4">
//               <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
//               <nav className="flex flex-col space-y-4 mt-8">
//                 {navItems.map((link) => (
//                   <Link
//                     key={link.label}
//                     href={link.href}
//                     className="text-lg font-medium"
//                   >
//                     {link.label}
//                   </Link>
//                 ))}
//                 <div className="border-t pt-4 flex flex-col space-y-4">
//                   <div className="flex justify-center"></div>
//                   {
//   accessToken ?    <LogoutButton/>
//           :         
//     <Link href="/login" className="text-lg font-medium">
//             <Button>Login</Button>
//           </Link> 
// }
//                 </div>
//               </nav>
//             </SheetContent>
//           </Sheet>
//         </div>

//       </div>
//     </header>
//   );
// };

// export default PublicNavbar;
