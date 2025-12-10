/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
interface PaymentUrlCardProp{
  payment:any,
  isParticipant:any
}
const PaymentUrlCard = ({payment,isParticipant}:PaymentUrlCardProp) => {
    // console.log("console.log(isParticipant,payment.status);",isParticipant,payment.status);
    
  return (
    <div>
        {
            (isParticipant && payment.status == "UNPAID" )&&<div className="bg-card rounded-xl border border-border p-6 sticky top-24">
                  <p className="text-2xl font-bold text-foreground">
                    you are joined this event ,now please payment in 30 minutes
                  </p>
                 <Link href={payment.paymenyUrl}>payment link</Link>
                </div>
        }
    </div>
  )
}

export default PaymentUrlCard