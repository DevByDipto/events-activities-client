/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { logoutUser } from "@/services/auth/logoutUser";
import { Button } from "../ui/button";

const LogoutButton = ({setAccessToken}:{setAccessToken?:any}) => {
 
  const handleLogout = async () => {
    await logoutUser();
    setAccessToken(null)
    // যখন কিছু করার পরে reload দিতে চাও
    // window.location.href = "/login?loggedOut=true";


  };
  return (
    <Button variant={"destructive"} onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
