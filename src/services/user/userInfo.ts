/* eslint-disable @typescript-eslint/no-explicit-any */

import { getCookie } from "../auth/tokenHandlers";

const userInfo = async () => {
  try {
      const accessToken = await getCookie('accessToken')
       if (!accessToken) {
      console.log("No access token found");
      return {}
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`, {
      credentials: "include",
       headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store",
    });

    if (!res.ok) {
      // const result = await res.json();
      // if(result.success === false && result.message === "You are blocked by admin!"){
      //   return  {message:result.message}
      // }
      // এখানেই HTTP error detect হবে
      const errorData = await res.json();
      // return {}
      throw new Error(errorData.message || "Request failed");
    }
const user = await res.json();
    // success হলে data return করো
    return user.data

  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export default userInfo;
