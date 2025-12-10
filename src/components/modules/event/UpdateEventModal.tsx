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
import Image from "next/image";

const UpdateEventModal = ({ event }: { event: Event }) => {
  const [open, setOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [imageUrl, setImageUrl] = useState(event.image);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await revalidatePathFunction(`/host/dashboard/my-events`);
    }
    fetchData();
  }, [isSubmit]);

  const openModal = () => setOpen(true);

  const handleImageUpload = async (file: File) => {
  setUploading(true);
  try {
    const formData = new FormData();
    formData.append("image", file); // <-- এটা "image" দিতে হবে

    const uploadUrl = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`;

    const res = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    // console.log(data);

    if (data.data?.url) {
      setImageUrl(data.data.url); // <-- data.data.url ব্যবহার করতে হবে
      toast.success("Image uploaded successfully!");
    } else {
      toast.error("Image upload failed!");
    }
  } catch (err) {
    console.error(err);
    toast.error("Upload error!");
  } finally {
    setUploading(false);
  }
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);

    const form = new FormData(e.target as HTMLFormElement);
    const file = form.get("imageFile") as File;

    // নতুন image select করলে upload
    if (file && file.size > 0) {
      await handleImageUpload(file);
    }

    const updatedData = {
      name: form.get("name"),
      description: form.get("description"),
      eventType: form.get("eventType"),
      dateTime: form.get("dateTime"),
      location: form.get("location"),
      minParticipants: Number(form.get("minParticipants")),
      maxParticipants: Number(form.get("maxParticipants")),
      image: imageUrl,
      joiningFee: Number(form.get("joiningFee")),
      isFeatured: form.get("isFeatured") === "on",
    };

    const result = await updateEvent(event.id, updatedData);

    if (result.success) toast.success("Event updated successfully");
    else toast.error(result.message || "Failed to update event");

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
            <div className="flex w-full gap-5">
              <div className="flex-1">
                <div>
                  <label className="text-sm font-medium">Event Name</label>
                  <Input name="name" defaultValue={event.name} required />
                </div>

                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea name="description" defaultValue={event.description} />
                </div>

                <div>
                  <label className="text-sm font-medium">Event Type</label>
                  <select
                    name="eventType"
                    required
                    className="w-full border rounded px-2 py-1"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select an event type
                    </option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>
                        {type.replaceAll("_", " ")}
                      </option>
                    ))}
                  </select>
                </div>

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

                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input name="location" defaultValue={event.location} required />
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex-1">
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

                {/* Image Upload */}
                <div>
                  <label className="text-sm font-medium">Event Image</label>
                  <Input
                    type="file"
                    name="imageFile"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                  />

                  {uploading ? (
                    <p className="text-blue-500 text-sm">Uploading...</p>
                  ) : imageUrl ? (
                    <p className="text-green-600 text-sm">Uploaded</p>
                  ) : null}

                  {imageUrl && !uploading && (
                    <Image
                      src={imageUrl}
                      alt="Event"
                      className="w-32 mt-2 rounded"
                       height={100}
          width={100}
                    />
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Joining Fee</label>
                  <Input
                    type="number"
                    name="joiningFee"
                    defaultValue={event.joiningFee}
                    required
                  />
                </div>

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

            {/* Update Button Disabled if uploading */}
            <Button type="submit" className="w-full" disabled={uploading}>
              {isSubmit ? "Updating..." : "Update Event"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateEventModal;
