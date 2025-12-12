/* eslint-disable @typescript-eslint/no-explicit-any */

"use server"
import React from "react";
import Link from "next/link";

import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Star,
  Clock,


} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/shared/Badge";
import ParticipantsList from "@/components/shared/ParticipantsList";
import ReviewCard from "@/components/shared/ReviewCard";
import {

  getUserById,
} from "@/utils/mockData";
import { EVENT_TYPE_LABELS, EVENT_STATUS_LABELS, EventType, Review } from "@/types";
import userInfo from "@/services/user/userInfo";
import eventDetails from "@/services/event/eventDetails";
import getAllEventAndParticipents, {

} from "@/services/eventParticipants/getAllEventAndParticipents";
import EventEnrollCard from "@/components/modules/event/EventEnrollCard";
import { getCookie } from "@/services/auth/tokenHandlers";
import getSinglePayments from "@/services/payment/getSinglePayments";
import SaveEventBtn from "@/components/modules/event/SaveEventBtn";
import getAllSaveEvent from "@/services/saveEvent/getAllSaveEvent";
import getUserEventParticipants from "@/services/eventParticipants/getUserEventParticipants";
import getAllReview from "@/services/review/getAllReview";
import Image from "next/image";

interface EventPageProps {
  params: {
    id: string; // dynamic id 
  };
}

const EventDetailsPage = async ({ params }: EventPageProps) => {

  const {id} = await params;
  // console.log("id",id);


  // const [user, setUser] = useState<any>(null);

  // useEffect(() => {
  //   const fetchUser = async () => {
  const user = await userInfo();
  // setUser(data);
  //   };

  //   fetchUser();
  // }, []);

  // const [eventAndParticipents, setEventAndParticipents] = useState<any>(null);

  // useEffect(() => {
  //   const fetchUser = async () => {
  const eventAndParticipents = await getAllEventAndParticipents();
  const UserEventAndParticipents = await getUserEventParticipants();
  const reviewsData = await getAllReview();
  // console.log("eventAndParticipents",eventAndParticipents);
  
  let savedEvents;
  let isSaved = false
  if(user.role === "USER"){
 savedEvents = await getAllSaveEvent()
 console.log("savedEvents",savedEvents);
 
 isSaved = savedEvents.some((saveEvent:any)=>saveEvent.event.id ===id)
  }
  
  // console.log("isSaved",isSaved);
  
  // console.log("under use effect eventAndParticipents",data);
  //     setEventAndParticipents(data);
  //   };
  //   fetchUser();
  // }, []);
  // console.log("eventAndParticipents",eventAndParticipents);
  // console.log("eventAndParticipents[0].userId",eventAndParticipents[0].userId,"eventAndParticipents[0].eventId",eventAndParticipents[0].eventId);
  // console.log("user",user.id,"eventId", id);

  // let isUserUserJoined;
  // if (eventAndParticipents && user.id && id) {
  //   isUserUserJoined = checkParticipation(eventAndParticipents, user.id, id);
  //   console.log("isUserUserJoined", isUserUserJoined);
  // }
 const accessToken = await getCookie('accessToken')
 let isAuthenticated
 if(accessToken){ isAuthenticated = true;}
  
  //   const { user, isAuthenticated } = useAuth();

  // const [event, setIsevent] = useState<any>();
  // console.log("eventeventevent",event);

  //   const event = mockEvents.find((e) => e.id === id);

  // useEffect(() => {
  // async function fetchData() {
  // You can await here
  const event = await eventDetails(id as string);
  // console.log("event",event);
  const res = await getSinglePayments(user.id,event.id,)
  const payment = res[0]
  // console.log("payment",payment);
  
  //    setIsevent(event)
  //   }
  //   fetchData();
  // }, [id]);

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Event not found
          </h1>
          <Link href="/explore">
            <Button>Back to Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  const host = getUserById(event.hostId);
  const participants = eventAndParticipents?.filter((ep:any) => ep.event.id === event.id)
    .map((ep:any) => ep.user!)
    .filter(Boolean);
    // console.log("participants",participants);
    
  const reviews = reviewsData?.filter((r:any) => r.hostId === event.hostId)
    .slice(0, 3);
  const isParticipant = user
    ? UserEventAndParticipents.some(
        (ep:any) => ep.eventId === event.id && ep.userId === user.id
      )
    : false;
  const isHost = user?.id === event.hostId;

  const statusVariant = {
    OPEN: "success",
    FULL: "warning",
    CANCELLED: "error",
    COMPLETED: "info",
  } as const;

 type EventStatus = keyof typeof statusVariant;

  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatTime = (date: Date) =>
    new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative h-64 md:h-96">
        <Image
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover"
          height={100}
          width={100}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        <div className="absolute top-4 left-4">
          <Link href="/explore">
            <Button
              variant="secondary"
              size="sm"
              // leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back
            </Button>
          </Link>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          {/* <Button variant="secondary" size="sm">
            <Share2 className="w-4 h-4" />
          </Button> */}
{ (event.id && user.role == 'USER' ) && <SaveEventBtn eventId={event.id} isSaved={isSaved} role={user.role} savedEvents={savedEvents}/>}
          
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant={statusVariant[event.status as EventStatus]}>
                  {EVENT_STATUS_LABELS[event.status as EventStatus]}
                </Badge>
                <Badge variant="default">
                  {EVENT_TYPE_LABELS[event.eventType as EventType]}
                </Badge>
                {event.isFeatured && (
                  <Badge variant="warning">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {event.name}
              </h1>
            </div>

            {/* Event Details */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Date */}
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium text-foreground">
                    {formatDate(event.dateTime)}
                  </p>
                </div>
              </div>
              {/* Time */}
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium text-foreground">
                    {formatTime(event.dateTime)}
                  </p>
                </div>
              </div>
              {/* Location */}
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium text-foreground">
                    {event.location}
                  </p>
                </div>
              </div>
              {/* Fee */}
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Joining Fee</p>
                  <p className="font-medium text-foreground">
                    {event.joiningFee === 0 ? "Free" : `$${event.joiningFee}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                About This Event
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {event.description || "No description provided for this event."}
              </p>
            </div>

            {/* Participants */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Participants ({event.currentParticipants}/
                {event.maxParticipants})
              </h2>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{
                      width: `${
                        (event.currentParticipants / event.maxParticipants) *
                        100
                      }%`,
                    }}
                  />
                </div>
                <span className="text-sm text-muted-foreground">
                  {event.maxParticipants - event.currentParticipants} spots left
                </span>
              </div>
              <ParticipantsList
                participants={participants}
                maxDisplay={8}
                size="lg"
              />
            </div>

            {/* Reviews */}
            {reviews.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Host Reviews
                </h2>
                <div className="space-y-4">
                  {reviews.map((review:Review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {host && (
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Event Host
                </h3>
                <Link
                  href={`/profile/${host.id}`}
                  className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <Image
                    src={host.image || "https://via.placeholder.com/60"}
                    alt={host.name}
                    className="w-14 h-14 rounded-full object-cover"
                    height={100}
                    width={100}
                  />
                  <div>
                    <p className="font-medium text-foreground">{host.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {host.location}
                    </p>
                    {host.rating && (
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {host.rating.toFixed(1)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({host.reviewCount} reviews)
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            )}

            {/* Action Card */}
            <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {event.joiningFee === 0 ? "Free" : `$${event.joiningFee}`}
                  </p>
                  <p className="text-sm text-muted-foreground">per person</p>
                </div>
                <Badge variant={statusVariant[event.status as EventStatus]} size="md">
                  {EVENT_STATUS_LABELS[event.status as EventStatus] }
                </Badge>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {event.currentParticipants} of {event.maxParticipants} spots
                    filled
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">
                    Min participants:
                  </span>
                  <span className="font-medium text-foreground">
                    {event.minParticipants}
                  </span>
                </div>
              </div>
{
  event.isApproved ? <EventEnrollCard
                isHost={isHost}
                isParticipant={isParticipant}
                event={event}
                id={id}
              /> 
              :
               <Button
                    variant="outline"
                    className="w-full"
                   
                    // isLoading={isLeaving}
                  >
                    Event is not approved by admin
                  </Button>
}
              
       
            </div>
          
            
{/* <PaymentUrlCard
payment={payment}
isParticipant={isParticipant}
/> */}
{/* {console.log("payment",payment)
} */}
{isParticipant && payment.paymentStatus === "UNPAID" && (
  <div className="bg-gray-800 border border-gray-700 text-gray-100 p-6 rounded-xl shadow-md sticky top-24 space-y-4 max-w-md mx-auto">
    <div className="flex items-start gap-3">
      <svg
        className="w-6 h-6 text-gray-300 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-lg font-semibold leading-snug">
        You have joined this event! Please complete the payment within <span className="font-bold">30 minutes</span>, otherwise your participation will be canceled.
      </p>
    </div>
    <Link
      href={payment.paymentUrl} 
      target="_blank"
      className="inline-block w-full text-center bg-gray-700 text-gray-100 font-medium py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
    >
       Payment Link
    </Link>
  </div>
)}

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
