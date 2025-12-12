/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import ReviewModal from "@/components/modules/review/ReviewModal";
import { EventParticipant, Review, User } from "@/types";

interface EventFiltersProps {
  eventAndParticipents:EventParticipant[]
  reviews:Review[]
  user:User
}
const EventFilters = ({ eventAndParticipents, reviews, user }: EventFiltersProps) => {
  const [filter, setFilter] = useState<"UPCOMING" | "PAST">("UPCOMING");

  const now = new Date();
 
  const filteredEvents = eventAndParticipents?.filter((item) => {
    const eventDate = new Date(item.event?.dateTime || "");

    if (filter === "UPCOMING") {
      return eventDate >= now;
    } else {
      return eventDate < now;
    }
  });

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setFilter("UPCOMING")}
          className={`px-4 py-2 rounded ${
            filter === "UPCOMING"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Upcoming Events
        </button>

        <button
          onClick={() => setFilter("PAST")}
          className={`px-4 py-2 rounded ${
            filter === "PAST"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Past Events
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Event</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Participants</th>
              <th className="p-3 text-left">Fee</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredEvents.map((item: any) => (
              <tr key={item.event.id} className="border-t">
                <td className="p-3">{item.event.name}</td>
                <td className="p-3">{item.event.location}</td>
                <td className="p-3">
                  {new Date(item.event.dateTime).toLocaleDateString()}
                </td>
                <td className="p-3">
                  {item.event.currentParticipants}/{item.event.maxParticipants}
                </td>
                <td className="p-3">${item.event.joiningFee}</td>
                <td className="p-3">
                  <ReviewModal
                    event={item.event}
                    reviews={reviews}
                    user={user}
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

export default EventFilters;
