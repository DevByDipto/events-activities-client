/* eslint-disable @typescript-eslint/no-explicit-any */


import Link from "next/link";
import { MapPin, Star, Calendar, Mail } from "lucide-react";
import { Button } from "@/components/ui/button"; 
import { Badge } from "@/components/shared/Badge"; 
import { EventCard } from "@/components/shared/EventCard"; 
import ReviewCard from "@/components/shared/ReviewCard"; 
import {

  mockReviews,
} from "@/utils/mockData";
import { INTEREST_LABELS, } from "@/types";
import userInfo from "@/services/user/userInfo";
import Image from "next/image";
import ProfileEdit from "@/components/modules/profile/ProfileEdit";
import allEvents from "@/services/event/allEvents";
import getAllEventAndParticipents from "@/services/eventParticipants/getAllEventAndParticipents";
import getAllReview from "@/services/review/getAllReview";

const ProfilePage: React.FC = async () => {
  // const id = params?.id as string;
  // const { user: currentUser, updateUser } = useAuth();
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     const fetchUser = async () => {
  const user = await userInfo();
  // setUser(user);
  //   };

  //   fetchUser();
  // }, []);
const events = await allEvents()
const eventParticipants = await getAllEventAndParticipents()
const reviewsData = await getAllReview()
const currentUser = user
console.log("currentUser",currentUser);

  // const currentUser = mockUsers.find((u) => u.id === id);
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            User not found
          </h1>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === currentUser.id;
  const hostedEvents = events.filter((e) => e.hostId === currentUser.id);
  const joinedEventIds = eventParticipants
    .filter((ep) => ep.userId === currentUser.id)
    .map((ep) => ep.eventId);
  const joinedEvents = events.filter((e) => joinedEventIds.includes(e.id));
  const reviews = reviewsData.filter((r) => r.hostId === currentUser.id);

 

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        
        <div className="bg-card rounded-xl border border-border overflow-hidden mb-8">
          <div className="h-32 md:h-48 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20" />
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-12 md:-mt-16">
              <Image
                src={currentUser.image || "https://via.placeholder.com/150"}
                alt={currentUser.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-card object-cover"
                width={100}
                height={100}
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                    {currentUser.name}
                  </h1>
                  <Badge
                    variant={currentUser.role === "HOST" ? "info" : "default"}
                  >
                    {currentUser.role}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  {currentUser.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{currentUser.location}</span>
                    </div>
                  )}
                  {currentUser.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-foreground">
                        {currentUser.rating.toFixed(1)}
                      </span>
                      <span>({currentUser.reviewCount} reviews)</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Joined{" "}
                      {new Date(currentUser.createdAt).toLocaleDateString(
                        "en-US",
                        { month: "long", year: "numeric" }
                      )}
                    </span>
                  </div>
                </div>
              </div>
            <ProfileEdit
            isOwnProfile={isOwnProfile}
            currentUser={currentUser}
            />
            </div>

            {currentUser.bio && (
              <p className="mt-4 text-muted-foreground max-w-2xl">
                {currentUser.bio}
              </p>
            )}

            {currentUser.interests && currentUser.interests.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {currentUser.interests.map((interest) => (
                  <Badge key={interest} variant="default">
                    {INTEREST_LABELS[interest]}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content Sections */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Hosted Events */}
            {hostedEvents.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Hosted Events ({hostedEvents.length})
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {hostedEvents.slice(0, 4).map((event) => (
                    <EventCard key={event.id} event={event} showHost={false} />
                  ))}
                </div>
              </div>
            )}

            {/* Joined Events */}
            {joinedEvents.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Joined Events ({joinedEvents.length})
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {joinedEvents.slice(0, 4).map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Events Hosted</span>
                  <span className="font-semibold text-foreground">
                    {hostedEvents.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Events Joined</span>
                  <span className="font-semibold text-foreground">
                    {joinedEvents.length}
                  </span>
                </div>
                {currentUser.rating && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Average Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-foreground">
                        {currentUser.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Reviews */}
            {reviews.length > 0 && (
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Recent Reviews ({reviews.length})
                </h3>
                <div className="space-y-4">
                  {reviews.slice(0, 3).map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              </div>
            )}

            {!isOwnProfile && (
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Contact
                </h3>
                <Button className="w-full" leftIcon={<Mail className="w-4 h-4" />}>
                  Send Message
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default ProfilePage;
