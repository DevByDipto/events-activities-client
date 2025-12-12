/* eslint-disable @typescript-eslint/no-explicit-any */


const allEvents = async () => {
   try {
    console.log("process.env.BACKEND_URL",process.env.NEXT_PUBLIC_BACKEND_URL);
    
     const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events`, {
       credentials: "include",
     });
 
     if (!res.ok) {
       // এখানেই HTTP error detect হবে
       const errorData = await res.json();
       throw new Error(errorData.message || "can not find event somthing went worng!");
     }
 const event = await res.json();
     // success হলে data return করো
     return event.data
 
   } catch (error: any) {
    console.log(error);
     return { success: false, message: error.message };
   }
}

export default allEvents