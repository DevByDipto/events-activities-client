import { EventCard } from '@/components/shared/EventCard'
import getAllSaveEvent from '@/services/saveEvent/getAllSaveEvent'
import React from 'react'

const page =async () => {
  const saveEvents = await getAllSaveEvent()
  console.log(saveEvents);
   if (saveEvents.length === 0) {
    return (
      <div className="flex justify-center mt-16">
        <div className="bg-gray-800 text-gray-200 border border-gray-700 p-8 rounded-xl shadow-lg max-w-md text-center">
          <h2 className="text-xl font-semibold">You have not save any event</h2>
          <p className="text-gray-400 mt-2">
            save an event to see it listed here.
          </p>
        </div>
      </div>
    );
  }
  
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