/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCookie } from '../auth/tokenHandlers';

const creatEvent = async(eventData) => {
   try {
        const accessToken = await getCookie('accessToken')
       const response = await fetch(`http://localhost:5000/api/v1/events`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
            Cookie: `accessToken=${accessToken}`,
         },
         credentials: 'include',
         // যদি request body দরকার হয়, যেমন user info:
         body: JSON.stringify(eventData),
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

export default creatEvent