   "use client"
import { Button } from '@/components/ui/button'
import { fatchFunction, revalidatePathFunction } from '@/services/event/eventDetails';
import eventJoining from '@/services/event/eventJoning';
import leaveEvent from '@/services/event/leaveEvent';
import { CheckCircle, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react';
import { toast } from 'sonner';


   const EventEnrollCard = ({isHost,isParticipant,event,isAuthenticated,id}) => {
  const [isJoining, setIsJoining] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
    //   const router = useRouter();
  const handleJoin = async () => {
    // if (!isAuthenticated) {
    //   router.push("/login");
    //   return;
    // }
    setIsJoining(true);
    const result = await eventJoining(id as string)
    // toast(`congratulation`, {
    //   // autoClose: false default হলো manual dismiss
    //   // আপনি চাইলে custom action যোগ করতে পারেন 
    //   action: {
    //     label: "OK",
    //     onClick: () => {
    //       /* আপনি চাইলে অন্য কাজও করতে পারেন */
    //     //   console.log("User clicked OK");
    //     },
    //   },
    // });
    toast.success("Successfully joined the event!!")
    setIsJoining(false);
    // revalidatePathFunction(`events/${id}`)
    // console.log("eventJoining result",result.paymentUrl);
    
    
    // alert("Successfully joined the event!");
  };

  useEffect(()=>{
    async function fetchData() {
  await revalidatePathFunction(`events/${id}`)
    }
    fetchData()
  },[isJoining,isLeaving,id])

  const handleLeave = async () => {
    setIsLeaving(true);
    const resutl = await leaveEvent(id)
    setIsLeaving(false);
    
    toast.success("Successfully left the event")
  };
     return (
       <div>
         {isHost ? (
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-muted-foreground">You are hosting this event</p>
                </div>
              ) : isParticipant ? (
                (event.status === "FULL" || event.status === "COMPLETED") ? 
               ( <div className="flex items-center gap-2 p-3 bg-muted rounded-lg justify-center">
                  <XCircle className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground font-medium">
                    Event is not available
                    {/* {event.status === "FULL"
                      ? "Event is full"
                      : event.status === "COMPLETED" ?"Event is COMPLETED" : "Event is not available"} */}
                  </span>
                </div>) 
                :
                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-700 dark:text-green-400 font-medium">
                      You're attending this event
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleLeave}
                    // isLoading={isLeaving}
                  >
                    {isLeaving ? " Leaving Event..." : " Leave Event"}
                  </Button>
                </div>
              ) : event.status === "OPEN" ? (
                <Button
                  className={`w-full`}
                  size="lg"
                  onClick={handleJoin}
                //   disabled={isUserUserJoined}
                  // isLoading={isJoining}
                >
                  {isJoining ? "Joining Event..." : "Join Event"}
                  {/* Join Event */}
                  {/* Join Event */}
                </Button>
              ) : (
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg justify-center">
                  <XCircle className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground font-medium">
                    Event is not available
                    {/* {event.status === "FULL"
                      ? "Event is full"
                      : event.status === "COMPLETED" ?"Event is COMPLETED" : "Event is not available"} */}
                  </span>
                </div>
              )}
       </div>
     )
   }
   
   export default EventEnrollCard