/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCookie } from "../auth/tokenHandlers";

// utils/eventJoining.ts
const eventJoining = async (eventId: string) => {
  try {
     const accessToken = await getCookie('accessToken')
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events/${eventId}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         Cookie: `accessToken=${accessToken}`,
      },
      credentials: 'include',
      // যদি request body দরকার হয়, যেমন user info:
      // body: JSON.stringify({ userId: "user-id-here" }),
    });

    if (!response.ok) {
      throw new Error('Failed to join the event');
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
     return { success: false, message: error.message };
   }
};

export default eventJoining;
