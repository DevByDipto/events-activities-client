/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { getCookie } from "../auth/tokenHandlers";


const getAllEventAndParticipents =async () => {
   try {
    console.log("before cookie");
    
     const accessToken = await getCookie('accessToken')
      console.log("after cookie");
     const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/event-participants`, {
       credentials: "include",
          headers: {
      Cookie: `accessToken=${accessToken}`,
    },
     });
 
     if (!res.ok) {
       // এখানেই HTTP error detect হবে
       const errorData = await res.json();
      //  return []
       throw new Error(errorData.message || "can not find event somthing went worng!");
     }
 const result = await res.json();
     // success হলে data return করো
     return result.data
 
   } catch (error: any) {
     return { success: false, message: error.message };
   }
}
export default getAllEventAndParticipents

export const checkParticipation =async (arr:any, userId:string, eventId:string) => {
  return arr.some((item:any) => item.userId === userId && item.eventId === eventId);
};
