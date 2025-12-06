"use client"
import {  useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import creatEvent from "@/services/event/creatEvent";
import { useRouter } from "next/navigation";
import { eventTypes } from "@/types";

const CreatEventPage = () => {
    const [isSubmit, setIsSubmit] = useState(false);
     const router = useRouter();

      const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);

    const form = new FormData(e.target as HTMLFormElement);

    const eventdData = {
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
    console.log("updatedData", eventdData);

    const result = await creatEvent( eventdData);

    if (result.success) {
      toast.success("Event creat successfully");
router.push("/host/dashboard/my-events")
    } else {
      toast.error(result.message || "Failed to creat event");
    }

    setIsSubmit(false);
  };
  return (
    <div>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className=" flex w-full gap-5">
              <div className="flex-1">
                {/* Name */}
                <div>
                  <label className="text-sm font-medium">Event Name</label>
                  <Input name="name"  required />
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    name="description"
                   
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
                    
                    required
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    name="location"
                    
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
                 
                    required
                  />
                </div>

                {/* Image */}
                <div>
                  <label className="text-sm font-medium">Image URL</label>
                  <Input name="image"  required />
                </div>

                {/* Joining Fee */}
                <div>
                  <label className="text-sm font-medium">Joining Fee</label>
                  <Input
                    type="number"
                    name="joiningFee"
                   
                    required
                  />
                </div>

                {/* Is Featured */}
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    name="isFeatured"
                   
                  />
                  <label className="text-sm font-medium">
                    Mark as Featured
                  </label>
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full">
              {isSubmit ? "Creating..." : "Creat Event"}
            </Button>
          </form>
    </div>
  )
}

export default CreatEventPage