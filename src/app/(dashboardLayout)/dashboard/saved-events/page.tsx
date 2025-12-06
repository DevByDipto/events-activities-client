import { EventCard } from '@/components/shared/EventCard'
import getAllSaveEvent from '@/services/saveEvent/getAllSaveEvent'
import React from 'react'

const page =async () => {
  const saveEvents = await getAllSaveEvent()
  console.log(saveEvents);
  
  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {saveEvents?.map((saveEvent) => (
              <EventCard key={saveEvent.event.id} event={saveEvent.event} />
            ))}
          </div>
    </div>
  )
}

export default page