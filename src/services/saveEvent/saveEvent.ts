/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCookie } from '../auth/tokenHandlers';

const saveEvent = async(eventId:string) => {
  // console.log("eventIdeventIdeventId",eventId);
  
    try {
        const accessToken = await getCookie('accessToken')
       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/save-events/${eventId}`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
            Cookie: `accessToken=${accessToken}`,
         },
         credentials: 'include',
         // যদি request body দরকার হয়, যেমন user info:
        //  body: JSON.stringify(reviewData),
       });
   
       if (!response.ok) {
         throw new Error('Failed to creat the review');
       }
   
       const data = await response.json();
       return data;
     } catch (error: any) {
        return { success: false, message: error.message };
      }
}

export default saveEvent