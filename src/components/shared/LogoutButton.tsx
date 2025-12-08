/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { logoutUser } from "@/services/auth/logoutUser";
import { Button } from "../ui/button";
import { revalidatePathFunction } from "@/services/event/eventDetails";
import { useEffect } from "react";

const LogoutButton = ({setAccessToken}:{setAccessToken?:any}) => {
 
  const handleLogout = async () => {
    await logoutUser();
    setAccessToken(null)
  };
  return (
    <Button variant={"destructive"} onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
