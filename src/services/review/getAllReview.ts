/* eslint-disable @typescript-eslint/no-explicit-any */

export const dynamic = 'force-dynamic';

const getAllReview =async () => {
  try {
  
     const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews`);
 
     if (!res.ok) {
       // এখানেই HTTP error detect হবে
       const errorData = await res.json();
      //  return []
       throw new Error(errorData.message || "can not find review somthing went worng!");
     }
 const result = await res.json();
     // success হলে data return করো
     return result.data
 
   } catch (error: any) {
    console.log(error);
     return { success: false, message: error.message };
   }
}

export default getAllReview


