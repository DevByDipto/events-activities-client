"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Event, eventTypes } from "@/types";
import { toast } from "sonner";
import updateEvent from "@/services/event/updateEvent";
import { revalidatePathFunction } from "@/services/event/eventDetails";

const UpdateEventModal = ({ event }: { event: Event }) => {
  const [open, setOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await revalidatePathFunction(`/host/dashboard/my-events`);
    }
    fetchData();
  }, [isSubmit]);
  const openModal = () => {
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);

    const form = new FormData(e.target as HTMLFormElement);

    const updatedData = {
      name: form.get("name"),
      description: form.get("description"),
      eventType: form.get("eventType"),
      dateTime: form.get("dateTime"),
      location: form.get("location"),
      minParticipants: Number(form.get("minParticipants")),
      maxParticipants: Number(form.get("maxParticipants")),
      image: form.get("image"),
      joiningFee: Number(form.get("joiningFee")),
      isFeatured: form.get("isFeatured") === "on",
    };
    console.log("updatedData", updatedData);

    const result = await updateEvent(event.id, updatedData);

    if (result.success) {
      toast.success("Event updated successfully");
    } else {
      toast.error(result.message || "Failed to update event");
    }

    setIsSubmit(false);
    setOpen(false);
  };

  return (
    <>
      <Button onClick={openModal}>Update Event</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Event — {event.name}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className=" flex w-full gap-5">
              <div className="flex-1">
                {/* Name */}
                <div>
                  <label className="text-sm font-medium">Event Name</label>
                  <Input name="name" defaultValue={event.name} required />
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    name="description"
                    defaultValue={event.description}
                  />
                </div>

                {/* Event Type */}
<div>
  <label className="text-sm font-medium">Event Type</label>
  <select
    name="eventType"
    required
    className="w-full border rounded px-2 py-1"
    defaultValue=""
  >
    <option value="" disabled>Select an event type</option>
    {eventTypes.map((type) => (
      <option key={type} value={type}>
        {type.replaceAll("_", " ")} {/* Optional: underscores কে space দিয়ে দেখাতে */}
      </option>
    ))}
  </select>
</div>

                {/* Date Time */}
                <div>
                  <label className="text-sm font-medium">Date & Time</label>
                  <Input
                    type="datetime-local"
                    name="dateTime"
                    defaultValue={new Date(event.dateTime)
                      .toISOString()
                      .slice(0, 16)}
                    required
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    name="location"
                    defaultValue={event.location}
                    required
                  />
                </div>
              </div>
              <div className="flex-1">
                {/* Min Participants */}
                <div>
                  <label className="text-sm font-medium">
                    Minimum Participants
                  </label>
                  <Input
                    type="number"
                    name="minParticipants"
                    defaultValue={event.minParticipants}
                    required
                  />
                </div>

                {/* Max Participants */}
                <div>
                  <label className="text-sm font-medium">
                    Maximum Participants
                  </label>
                  <Input
                    type="number"
                    name="maxParticipants"
                    defaultValue={event.maxParticipants}
                    required
                  />
                </div>

                {/* Image */}
                <div>
                  <label className="text-sm font-medium">Image URL</label>
                  <Input name="image" defaultValue={event.image} required />
                </div>

                {/* Joining Fee */}
                <div>
                  <label className="text-sm font-medium">Joining Fee</label>
                  <Input
                    type="number"
                    name="joiningFee"
                    defaultValue={event.joiningFee}
                    required
                  />
                </div>

                {/* Is Featured */}
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    defaultChecked={event.isFeatured}
                  />
                  <label className="text-sm font-medium">
                    Mark as Featured
                  </label>
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full">
              {isSubmit ? "Updating..." : "Update Event"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateEventModal;
