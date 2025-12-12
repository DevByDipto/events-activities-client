/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import DeleteEventBtn from "./DeleteEventBtn";
import UpdateEventModal from "./UpdateEventModal";
import UpdateEventStatus from "./UpdateEventStatus";

const EventFilterClient = ({ events }: { events: any[] }) => {
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");

  const filteredEvents = useMemo(() => {
    if (filter === "upcoming") {
      return events.filter((e) => new Date(e.dateTime) > new Date());
    }

    if (filter === "past") {
      return events.filter((e) => new Date(e.dateTime) < new Date());
    }

    return events;
  }, [events, filter]);

  return (
    <div className="space-y-5">
      {/* FILTER BUTTONS */}
      <div className="flex gap-3">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${
            filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("upcoming")}
          className={`px-4 py-2 rounded ${
            filter === "upcoming" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Upcoming
        </button>

        <button
          onClick={() => setFilter("past")}
          className={`px-4 py-2 rounded ${
            filter === "past" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Past
        </button>
      </div>

      {/* TABLE RESULT */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
  <tr>
    <th className="p-3 text-left">Event</th>
    <th className="p-3 text-left">Location</th>
    <th className="p-3 text-left">Date</th>
    <th className="p-3 text-left">Participants</th>
    <th className="p-3 text-left">Fee</th>
    <th className="p-3 text-left">Is Approved</th>
    <th className="p-3 text-left">Details</th>
    <th className="p-3 text-left">Status</th> {/* new column */}
    <th className="p-3 text-left">Delete</th>
    <th className="p-3 text-left">Action</th>
  </tr>
</thead>

<tbody>
  {filteredEvents.map((event) => (
    <tr key={event.id} className="border-t">
      <td className="p-3">{event.name}</td>
      <td className="p-3">{event.location}</td>
      <td className="p-3">
        {new Date(event.dateTime).toLocaleDateString()}
      </td>
      <td className="p-3">
        {event.currentParticipants}/{event.maxParticipants}
      </td>
      <td className="p-3">${event.joiningFee}</td>
      <td className={`p-3 ${event.isApproved ? "text-green-500":"text-red-500"}`}>{event.isApproved ? "approved":"pending"}</td>
<td className="p-3">
        <Link href={`/events/${event.id}`}>details</Link>
      </td>
      <td className="p-3">
        <UpdateEventStatus
          eventId={event.id}
          currentStatus={event.status}
          isApproved={event.isApproved}
        />
      </td>
      <td className="p-3">
        <DeleteEventBtn eventID={event.id}
         isApproved={event.isApproved}
          />
        
      </td>

      <td className="p-3">
        <UpdateEventModal event={event} 
         isApproved={event.isApproved}
          />
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default EventFilterClient;
