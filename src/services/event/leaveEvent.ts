/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCookie } from "../auth/tokenHandlers";

const leaveEvent = async (eventId: string) => {
  try {
    // Bangla: Client-side cookie থেকে accessToken নিচ্ছি  
    // English: Getting token from client cookies  
    const accessToken = await getCookie("accessToken");

    if (!accessToken) {
      return {
        success: false,
        message: "User is not authenticated!",
      };
    }

    // Bangla: API request eventId সহ পাঠানো হচ্ছে  
    // English: Sending API request with eventId  

    const response = await fetch(
      `http://localhost:5000/api/v1/events/${eventId}/leave`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // PERFECT way
        },
        credentials: "include", // Cookies handled automatically
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      return {
        success: false,
        message: errorData?.message || "Failed to leave event",
      };
    }

    const data = await response.json();

    return data.data
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Unexpected error occurred",
    };
  }
};

export default leaveEvent;
