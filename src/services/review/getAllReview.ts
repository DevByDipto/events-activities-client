/* eslint-disable @typescript-eslint/no-explicit-any */



const getAllReview =async () => {
  try {
  
     const res = await fetch("http://localhost:5000/api/v1/reviews");
 
     if (!res.ok) {
       // এখানেই HTTP error detect হবে
       const errorData = await res.json();
       throw new Error(errorData.message || "can not find review somthing went worng!");
     }
 const result = await res.json();
     // success হলে data return করো
     return result.data
 
   } catch (error: any) {
     return { success: false, message: error.message };
   }
}

export default getAllReview


