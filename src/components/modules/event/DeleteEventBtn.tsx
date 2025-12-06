"use client"
import React, { useState } from "react";
import { toast } from "sonner";
import deleteEvent from "@/services/event/deleteEvent";
import { revalidatePathFunction } from "@/services/event/eventDetails";

interface DeleteEventBtnProps {
  eventID: string;
}

const DeleteEventBtn: React.FC<DeleteEventBtnProps> = ({ eventID }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteEvent(eventID);
      if (result.success) {
        toast.success("🎉 Event deleted successfully!", {
          description: "The event has been removed from your dashboard.",
          duration: 4000,
        });
        await revalidatePathFunction(`/host/dashboard/my-events`);
      } else {
        toast.error("⚠️ " + (result.message || "Failed to delete event"), { duration: 4000 });
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Something went wrong while deleting the event.", { duration: 4000 });
    }
    setIsDeleting(false);
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50 transition"
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete Event"}
      </button>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this event? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteEventBtn;
