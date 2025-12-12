/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { revalidatePathFunction } from '@/services/event/eventDetails'
import saveEvent from '@/services/saveEvent/saveEvent'
import { UserRole } from '@/types'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
interface SaveEventBtnProp{
  eventId:string,
  isSaved:boolean,
  role:UserRole,
  savedEvents:any
}
const SaveEventBtn = ({eventId,isSaved,role,savedEvents}:SaveEventBtnProp) => {
   
    console.log("isSaved",isSaved);
    console.log("savedEvents",savedEvents);
    
    const handleEventSave = async()=>{
        if(isSaved || role !== "USER")return
       
        // console.log("eventId",eventId);
        // console.log("work");
        
        const result = await saveEvent(eventId)
        if(result.success){
          await revalidatePathFunction(`/events/${eventId}`)
            toast.success("event save successfull")
        }
    }
  return (
    <button 
    disabled={isSaved}
            onClick={handleEventSave}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-sm transition-colors"
            // aria-label={isSaved ? 'Remove from saved' : 'Save event'}
          >
            {isSaved ? (
              <BookmarkCheck className="w-5 h-5 text-primary" />
            ) : (
              <Bookmark className="w-5 h-5 text-gray-600" />
            )}
          </button>
  )
}

export default SaveEventBtn