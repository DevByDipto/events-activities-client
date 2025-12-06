"use client"
import approveEvent from "@/services/admin/approveEvent";
import { Event } from "@/types";
import { toast } from "sonner";
const EventApproval = (event) => {

     const handleApprove = async (eventId: string, currentStatus: boolean) => {
    try {
        const updatedData= {isApproved:!currentStatus}
      const res = await approveEvent(eventId,updatedData );

      if (res.success) {
        toast.success(
          `Event ${currentStatus ? "unapproved" : "approved"} successfully`
        );

        // Update UI instantly
        // setEventList((prev) =>
        //   prev.map((event) =>
        //     event.id === eventId
        //       ? { ...event, isApproved: !currentStatus }
        //       : event
        //   )
        // );
      } else {
        toast.error(res.message || "Failed to update approval");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <button
                  onClick={() =>
                    handleApprove(event.id, event.isApproved)
                  }
                  className={`px-2 my-2 rounded text-white ${
                    event.isApproved ? "bg-red-600" : "bg-green-600"
                  }`}
                >
                  {event.isApproved ? "Unapprove" : "Approve"}
                </button>
  )
}

export default EventApproval