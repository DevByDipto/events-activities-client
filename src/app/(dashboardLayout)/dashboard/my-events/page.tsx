// /* eslint-disable @typescript-eslint/no-explicit-any */


// import ReviewModal from "@/components/modules/review/ReviewModal";
// import getAllEventAndParticipents from "@/services/eventParticipants/getAllEventAndParticipents";
// import getAllReview from "@/services/review/getAllReview";
// import userInfo from "@/services/user/userInfo";
// import { Event } from "@/types";



// const MyEventPage = async() => {
// const eventAndParticipents = await getAllEventAndParticipents()
// const reviews = await getAllReview()
// const user = await userInfo()

// if (eventAndParticipents.length === 0) {
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
//               <th className="p-3 text-left">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {eventAndParticipents.map((eventAndParticipente:any) => (
//               <tr key={eventAndParticipente.event.id} className="border-t">
//                 <td className="p-3">{eventAndParticipente.event.name}</td>
//                 <td className="p-3">{eventAndParticipente.event.location}</td>
//                 <td className="p-3">
//                   {new Date(eventAndParticipente.event.dateTime).toLocaleDateString()}
//                 </td>
//                 <td className="p-3">
//                   {eventAndParticipente.event.currentParticipants}/{eventAndParticipente.event.maxParticipants}
//                 </td>
//                 <td className="p-3">${eventAndParticipente.event.joiningFee}</td>

//                 <td className="p-3">
//                  <ReviewModal event={eventAndParticipente.event} reviews={reviews} user={user}/>
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
// export const dynamic = 'force-dynamic'
import EventFilters from "@/components/modules/event/EventFilters";
import getAllEventAndParticipents from "@/services/eventParticipants/getAllEventAndParticipents";
import getAllReview from "@/services/review/getAllReview";
import userInfo from "@/services/user/userInfo"; 
export const dynamic = 'force-dynamic'
const MyEventPage = async () => {
  const eventAndParticipents = await getAllEventAndParticipents() 
  console.log("eventAndParticipents",eventAndParticipents)
  
  const reviews = await getAllReview() 
  const user = await userInfo() 

  if (eventAndParticipents.length === 0) {
    return (
      <div className="flex justify-center mt-16">
        <div className="bg-gray-800 text-gray-200 border border-gray-700 p-8 rounded-xl shadow-lg max-w-md text-center">
          <h2 className="text-xl font-semibold">You have not joined any event</h2>
          <p className="text-gray-400 mt-2">
            Join an event to see it listed here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <EventFilters
      eventAndParticipents={eventAndParticipents}
      reviews={reviews}
      user={user}
    />
  );
};

export default MyEventPage;
