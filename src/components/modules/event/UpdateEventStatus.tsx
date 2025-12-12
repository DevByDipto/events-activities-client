"use client";
import updateEvent from "@/services/event/updateEvent";
import React, { useState } from "react";
import { toast } from "sonner";


interface UpdateEventStatusProps {
  eventId: string;
  currentStatus: "OPEN" | "FULL" | "COMPLETED";
  isApproved:boolean
}

const UpdateEventStatus: React.FC<UpdateEventStatusProps> = ({
  eventId,
  currentStatus,
  isApproved,
}) => {
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as "OPEN" | "FULL" | "COMPLETED";
    setStatus(newStatus);
    setIsUpdating(true);

    try {
        const updatedData = {status:newStatus}
      const result = await updateEvent(eventId, updatedData);
      // console.log("result",result);
      
      if (result.success) {
        toast.success("Event status updated successfully!");
      } else {
        toast.error(result.message || "Failed to update status");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }

    setIsUpdating(false);
  };

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={isUpdating || !isApproved}
      className="border px-2 py-1 rounded"
    >
      <option value="OPEN">OPEN</option>
      <option value="FULL">FULL</option>
      <option value="COMPLETED">COMPLETED</option>
    </select>
  );
};

export default UpdateEventStatus;
