/* eslint-disable @typescript-eslint/no-explicit-any */


const allEvents = async () => {
   try {
     const res = await fetch("http://localhost:5000/api/v1/events", {
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
     return { success: false, message: error.message };
   }
}

export default allEvents