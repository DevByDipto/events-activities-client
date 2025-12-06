

import EventApproval from "@/components/modules/admin/EventApproval";
import allEvents from "@/services/event/allEvents";


const EventsTable =async () => {

const events = await allEvents()
 

  return (
    <div className="overflow-x-auto mt-8">
      <table className="table w-full border">
        <thead className="bg-gray-200 font-semibold">
          <tr>
            <th>#</th>
            <th>Event Title</th>
            <th>Location</th>
            <th>Date</th>
            <th>Host</th>
            <th>Approved?</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event, index) => (
            <tr key={event.id} className="border-b text-center">
              <td>{index + 1}</td>
              <td>{event.name}</td>
              <td>{event.location}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.host?.name || "N/A"}</td>

              <td>
                {event.isApproved ? (
                  <span className="text-green-600 font-semibold">Approved</span>
                ) : (
                  <span className="text-red-600 font-semibold">Pending</span>
                )}
              </td>

              <td>
                <EventApproval event={event}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsTable;
