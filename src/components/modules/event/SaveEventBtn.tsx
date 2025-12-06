"use client"
import { Button } from '@/components/ui/button'
import { revalidatePathFunction } from '@/services/event/eventDetails'
import saveEvent from '@/services/saveEvent/saveEvent'
import { Heart, Save } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const SaveEventBtn = ({eventId,isSaved}) => {
    const [saved,setSaved] = useState(false)
    useEffect(()=>{
        async function fetchData() {
      await revalidatePathFunction(`events/${eventId}`)
        }
        fetchData()
      },[saved])
    const handleEventSave = async()=>{
        if(isSaved)return
        setSaved(!saved)
        console.log("eventId",eventId);
        console.log("work");
        
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