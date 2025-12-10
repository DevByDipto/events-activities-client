/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCookie } from "../auth/tokenHandlers";


const getSinglePayments =async (userId:string,eventId:string,) => {
   try {
    const accessToken = await getCookie('accessToken')
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payments?userId=${userId}&eventId=${eventId}`, {
       credentials: "include",
        headers: {
       Cookie: `accessToken=${accessToken}`,
     },
     cache: "no-store",
     });

       if (!res.ok) {
        // এখানেই HTTP error detect হবে
        const errorData = await res.json();
        throw new Error(errorData.message || "can not find event somthing went worng!");
      }
     const data = await res.json()
    //  console.log("data",data);
     
     return data.data
   } catch (error: any) {
      return { success: false, message: error.message };
    }
}

export default getSinglePayments