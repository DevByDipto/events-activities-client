/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import blockUser from '@/services/admin/blockUser';
import { revalidatePathFunction } from '@/services/event/eventDetails';
import { User } from '@/types';
import React, { useEffect, useState } from 'react'
import { toast } from "sonner";

const HandleBlockUser = ({user}:{user:User}) => {
  // console.log();
  
      const [isStatusChange, setIsStatusChange] = useState(false);

       useEffect(()=>{
          async function fetchData() {
        await revalidatePathFunction(`/admin/dashboard/manage-host`)
          }
          fetchData()
        },[isStatusChange])

     const handleBlock = async (id:string, currentStatus:any) => {
    try {
        
        const updateData= {isBlocked:!currentStatus}
      const res = await blockUser(updateData,id);

      if (res.success) {
        toast.success(`host ${currentStatus ? "unblocked" : "blocked"} successfully`);
setIsStatusChange(!isStatusChange)
       
      } else {
        toast.error(res.message || "Failed to update host status");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <button
                  onClick={() => handleBlock(user?.id, user?.isBlocked)}
                  className={`px-2 my-2  rounded text-white ${
                    user?.isBlocked ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {user?.isBlocked ? "Unblock" : "Block"}
                </button>
  )
}

export default HandleBlockUser