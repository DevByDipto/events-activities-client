

import React from "react";
import { User } from "@/types";

interface ParticipantsListProps {
  participants: User[];
  maxDisplay?: number;
  size?: "sm" | "md" | "lg";
}

const ParticipantsList: React.FC<ParticipantsListProps> = ({
  participants,
  maxDisplay = 5,
  size = "md",
}) => {
  const displayedParticipants = participants?.slice(0, maxDisplay);
  const remainingCount = participants?.length - maxDisplay;

  const sizes = {
    sm: {
      avatar: "w-8 h-8",
      text: "text-xs",
      overlap: "-ml-2",
    },
    md: {
      avatar: "w-10 h-10",
      text: "text-sm",
      overlap: "-ml-3",
    },
    lg: {
      avatar: "w-12 h-12",
      text: "text-base",
      overlap: "-ml-4",
    },
  };

  const { avatar, text, overlap } = sizes[size];

  if (participants?.length === 0) {
    return <p className="text-muted-foreground text-sm">No participants yet</p>;
  }

  return (
    <div className="flex items-center">
      <div className="flex">
        {displayedParticipants?.map((participant, index) => (
          <div
            key={participant.id}
            className={`${avatar} rounded-full border-2 border-background overflow-hidden ${
              index > 0 ? overlap : ""
            }`}
            style={{ zIndex: maxDisplay - index }}
          >
            <img
              src={participant.image || "https://via.placeholder.com/40"}
              alt={participant.name}
              className="w-full h-full object-cover"
              title={participant.name}
            />
          </div>
        ))}

        {remainingCount > 0 && (
          <div
            className={`${avatar} ${overlap} rounded-full border-2 border-background bg-muted flex items-center justify-center`}
            style={{ zIndex: 0 }}
          >
            <span className={`${text} font-medium text-muted-foreground`}>
              +{remainingCount}
            </span>
          </div>
        )}
      </div>

      <span className={`ml-3 ${text} text-muted-foreground`}>
        {participants?.length} participant{participants?.length !== 1 ? "s" : ""}
      </span>
    </div>
  );
};

export default ParticipantsList;
