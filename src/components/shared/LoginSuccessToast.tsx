"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const LoginSuccessToast = () => {
  const searchParams = useSearchParams();
  // console.log('searchParams',searchParams);
  
  const router = useRouter();
  // console.log("router",router);
  

  useEffect(() => {
    if (searchParams.get("loggedIn") === "true") {
      toast.success("You have been logged in successfully."); 

      const newUrl = new URL(window.location.href);
      // console.log('newUrl',newUrl);
      newUrl.searchParams.delete("loggedIn");
      // console.log('after delete newUrl',newUrl);
      
      router.replace(newUrl.toString());
      // console.log('after delete newUrl to string',newUrl.toString());
    }
  }, [searchParams, router]);
  return null;
};

export default LoginSuccessToast;
