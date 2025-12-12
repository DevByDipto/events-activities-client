"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react'
import { Event, Review, User } from '@/types';
import creatReview from '@/services/review/creatReview';
import { toast } from 'sonner';
import { revalidatePathFunction } from '@/services/event/eventDetails';
const ReviewModal = ({
  event,
  reviews,
  user
}: {
  event: Event;
  reviews: Review[]; 
  user: User;
}) => {
     const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isSubmit, setIsSubmit] = useState(false);

  const openModal = (event: Event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
setIsSubmit(true)
    const form = new FormData(e.target as HTMLFormElement);
    const rating = form.get("rating");
    const comment = form.get("comment");
    const data = {rating, comment}
const result = await creatReview({
  eventId: event.id,
  reviewData: data
});    

// console.log(result);

if(result.success){
  await revalidatePathFunction(`/dashboard/my-events`);
    toast.success("review submite successfull")
    setIsSubmit(false)
}
    
    // console.log("Review submitted:", { rating, comment });

    setOpen(false);
  };

  const alreadyReviewed = reviews?.some(
  (review) =>
    review.eventId === event.id && review.reviewerId === user?.id
);
  return (<>
  {
    event.status === "COMPLETED" ? 
    alreadyReviewed ?  <p className="text-sm font-medium text-green-600">
       Already review submit
    </p> : <Button onClick={() => openModal(event)}>Give Review</Button>
: "Event is not complete"
  }
       {/* Review Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Give Review for {selectedEvent?.name}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Rating */}
            <div>
              <label className="text-sm font-medium">Rating (1–5)</label>
              <Input
                type="number"
                name="rating"
                min="1"
                max="5"
                required
              />
            </div>

            {/* Comment */}
            <div>
              <label className="text-sm font-medium">Comment</label>
              <Textarea
                name="comment"
                placeholder="Write your feedback..."
                required
              />
            </div>

            <Button type="submit" className="w-full">
                {isSubmit ? "Submiting Review...":"Submit Review"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
  </>
  )
}

export default ReviewModal