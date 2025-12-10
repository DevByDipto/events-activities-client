/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventCard } from '@/components/shared/EventCard'
import getAllSaveEvent from '@/services/saveEvent/getAllSaveEvent'

const SaveEventPage = async () => {
  const saveEvents = await getAllSaveEvent();
  
  // Defensive check to ensure saveEvents is an array
  const saveEventsList = Array.isArray(saveEvents) ? saveEvents : [];
  
  if (saveEventsList.length === 0) {
    return (
      <div className="flex justify-center mt-16">
        <div className="bg-gray-800 text-gray-200 border border-gray-700 p-8 rounded-xl shadow-lg max-w-md text-center">
          <h2 className="text-xl font-semibold">You have not saved any event</h2>
          <p className="text-gray-400 mt-2">
            Save an event to see it listed here.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {saveEventsList.map((saveEvent: any) => (
          <EventCard key={saveEvent?.event.id} event={saveEvent?.event} />
        ))}
      </div>
    </div>
  );
};

export default SaveEventPage;