"use server"

import { redirect } from "next/navigation";
import { deleteCookie } from "./tokenHandlers"
// import { revalidatePathFunction } from "../event/eventDetails";

export const logoutUser= async()=>{
await deleteCookie("accessToken")
await deleteCookie("refreshToken")
// await revalidatePathFunction(`/`)
 redirect("/login?loggedOut=true");
}