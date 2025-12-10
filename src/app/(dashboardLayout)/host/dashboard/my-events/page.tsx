// /* eslint-disable @typescript-eslint/no-explicit-any */


// import DeleteEventBtn from "@/components/modules/event/DeleteEventBtn";
// import UpdateEventModal from "@/components/modules/event/UpdateEventModal";
// import ReviewModal from "@/components/modules/review/ReviewModal";
// import getAllEventAndParticipents from "@/services/eventParticipants/getAllEventAndParticipents";
// import getHostCreatedAllEvents from "@/services/host/getHostCreatedAllEvents";
// import getAllReview from "@/services/review/getAllReview";
// import userInfo from "@/services/user/userInfo";
// import { Event } from "@/types";
// import Link from "next/link";



// const MyEventPage = async() => {
// const events = await getHostCreatedAllEvents()
// const reviews = await getAllReview()
// const user = await userInfo()

// if (events.length === 0) {
//     return (
//       <div className="flex justify-center mt-16">
//         <div className="bg-gray-800 text-gray-200 border border-gray-700 p-8 rounded-xl shadow-lg max-w-md text-center">
//           <h2 className="text-xl font-semibold">You have not joined any event</h2>
//           <p className="text-gray-400 mt-2">
//             Join an event to see it listed here.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="overflow-x-auto rounded-lg border">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-left">Event</th>
//               <th className="p-3 text-left">Location</th>
//               <th className="p-3 text-left">Date</th>
//               <th className="p-3 text-left">Participants</th>
//               <th className="p-3 text-left">Fee</th>
//               <th className="p-3 text-left">Details</th>
//               <th className="p-3 text-left">Delete</th>
//               <th className="p-3 text-left">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {events.map((event:any) => (
//               <tr key={event.id} className="border-t">
//                 <td className="p-3">{event.name}</td>
//                 <td className="p-3">{event.location}</td>
//                 <td className="p-3">
//                   {new Date(event.dateTime).toLocaleDateString()}
//                 </td>
//                 <td className="p-3">
//                   {event.currentParticipants}/{event.maxParticipants}
//                 </td>
//                 <td className="p-3">${event.joiningFee}</td>
// <td className="p-3"><Link href={`/events/${event.id}`}>details</Link></td>
// <td className="p-3"><DeleteEventBtn eventID={event.id}/></td>
//                 <td className="p-3">
//                  <UpdateEventModal event={event}/>
//                 </td>

//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

    
//     </>
//   );
// };

// export default MyEventPage


/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = 'force-dynamic'
import getHostCreatedAllEvents from "@/services/host/getHostCreatedAllEvents";
import EventFilterClient from "@/components/modules/event/EventFilterClient";

const MyEventPage = async () => {
  const events = await getHostCreatedAllEvents();

  if (events.length === 0) {
    return (
      <div className="flex justify-center mt-16">
        <div className="bg-gray-800 text-gray-200 border border-gray-700 p-8 rounded-xl shadow-lg max-w-md text-center">
          <h2 className="text-xl font-semibold">You have not created any event</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* CLIENT FILTERing COMPONENT */}
      <EventFilterClient events={events} />
    </>
  );
};

export default MyEventPage;
