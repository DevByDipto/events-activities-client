/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import { useEffect, useState } from "react";
import { toast } from "sonner";
import getAllEventAndParticipants from "@/services/eventParticipants/getAllEventAndParticipents";
import userInfo from "@/services/user/userInfo";
export const dynamic = 'force-dynamic'
interface User {
  id: string;
  name: string;
  email: string;
}

interface Event {
  id: string;
  name: string;
  hostId: string;
}

interface EventParticipant {
  id: string;
  user: User;
  event: Event;
}

interface EventWithParticipants {
  eventId: string;
  eventName: string;
  participants: User[];
}

const ManageParticipantsPage = () => {
  const [groupedData, setGroupedData] = useState<EventWithParticipants[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hostId, setHostId] = useState<any>();

  // Example: Logged in host ID (replace with actual from auth)
//   const hostId = "1ae708c9-471a-464b-99cc-a5eb37db1b65";

  useEffect(()=>{
      async function fetchData() {
  const host =  await userInfo()
  setHostId(host?.id)
      }
      fetchData()
    },[hostId])
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const data: EventParticipant[] = await getAllEventAndParticipants();

        // Filter only events of logged-in host
        const hostEventsParticipants = data.filter(
          (ep) => ep.event.hostId === hostId
        );

        // Group by event
        const grouped: EventWithParticipants[] = [];
        hostEventsParticipants.forEach((ep) => {
          const existing = grouped.find((e) => e.eventId === ep.event.id);
          if (existing) {
            existing.participants.push(ep.user);
          } else {
            grouped.push({
              eventId: ep.event.id,
              eventName: ep.event.name,
              participants: [ep.user],
            });
          }
        });

        setGroupedData(grouped);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load participants.");
        toast.error("Failed to load participants.");
      }
      setLoading(false);
    };

    fetchData();
  }, [hostId]);

  if (loading) return <div>Loading participants...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-8">
      {groupedData.length === 0 ? (
        <div>No participants found for your events.</div>
      ) : (
        groupedData.map((event) => (
          <div key={event.eventId}>
            <h2 className="text-xl font-bold mb-2">{event.eventName}</h2>
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                </tr>
              </thead>
              <tbody>
                {event.participants.map((p) => (
                  <tr key={p.id}>
                    <td className="border px-4 py-2">{p.name}</td>
                    <td className="border px-4 py-2">{p.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default ManageParticipantsPage;
