"use client";

import React from "react";
import { Star } from "lucide-react";
import { Review } from "@/types";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-start gap-3">
        <img
          src={review.reviewer?.image || "https://via.placeholder.com/40"}
          alt={review.reviewer?.name || "Reviewer"}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-medium text-foreground truncate">
              {review.reviewer?.name || "Anonymous"}
            </h4>
            <span className="text-xs text-muted-foreground flex-shrink-0">
              {formatDate(review.createdAt)}
            </span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>
          {review.comment && (
            <p className="mt-2 text-sm text-muted-foreground">
              {review.comment}
            </p>
          )}
          {review.event && (
            <p className="mt-2 text-xs text-primary">Event: {review.event.name}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
