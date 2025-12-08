/* eslint-disable @typescript-eslint/no-explicit-any */

import { getCookie } from "../auth/tokenHandlers";

const userInfo = async () => {
  try {
      const accessToken = await getCookie('accessToken')
    const res = await fetch("http://localhost:5000/api/v1/users/me", {
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
