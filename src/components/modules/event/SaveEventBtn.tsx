"use client"
import { Button } from '@/components/ui/button'
import { revalidatePathFunction } from '@/services/event/eventDetails'
import saveEvent from '@/services/saveEvent/saveEvent'
import { UserRole } from '@/types'
import { Heart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
interface SaveEventBtnProp{
  eventId:string,
  isSaved:boolean,
  role:UserRole
}
const SaveEventBtn = ({eventId,isSaved,role}:SaveEventBtnProp) => {
    const [saved,setSaved] = useState(false)
    useEffect(()=>{
        async function fetchData() {
      await revalidatePathFunction(`events/${eventId}`)
        }
        fetchData()
      },[saved,eventId])
    const handleEventSave = async()=>{
        if(isSaved || role !== "USER")return
        setSaved(!saved)
        // console.log("eventId",eventId);
        // console.log("work");
        
        const result = await saveEvent(eventId)
        if(result.success){
            toast.success("event save successfull")
        }
    }
  return (
    <Button className={`${isSaved && "bg-black"}`} variant="secondary" size="sm" onClick={handleEventSave}>
            <Heart className={`w-4 h-4 ${isSaved && "text-white"}`} />
          </Button>
  )
}

export default SaveEventBtn