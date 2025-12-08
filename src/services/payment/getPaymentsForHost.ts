/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCookie } from '../auth/tokenHandlers';

const getPaymentsForHost = async() => {
   try {
      const accessToken = await getCookie('accessToken')
    const res = await fetch(`http://localhost:5000/api/v1/payments/host`, {
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

export default getPaymentsForHost