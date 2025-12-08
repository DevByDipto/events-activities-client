/* eslint-disable @typescript-eslint/no-explicit-any */

import { getCookie } from "../auth/tokenHandlers";


const getUserEventParticipants =async () => {
   try {
     const accessToken = await getCookie('accessToken')
     const res = await fetch("http://localhost:5000/api/v1/event-participants/user", {
       credentials: "include",
          headers: {
      Cookie: `accessToken=${accessToken}`,
    },
     });
 
     if (!res.ok) {
       // এখানেই HTTP error detect হবে
       const errorData = await res.json();
       throw new Error(errorData.message || "can not find event somthing went worng!");
     }
 const result = await res.json();
     // success হলে data return করো
     return result.data
 
   } catch (error: any) {
     return { success: false, message: error.message };
   }
}
export default getUserEventParticipants


