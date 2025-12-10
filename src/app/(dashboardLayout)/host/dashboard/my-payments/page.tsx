/* eslint-disable @typescript-eslint/no-explicit-any */

import getPaymentsForHost from "@/services/payment/getPaymentsForHost";
import { Payment } from "@/types";

export const dynamic = 'force-dynamic'

const PaymentsTable = async() => {

        const payments = await getPaymentsForHost();
      console.log("payments",payments);
      

  if (payments.length === 0) {
    return (
      <div className="text-center text-lg font-semibold py-10">
        No Payments Found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-base-100 shadow rounded-lg p-4">
      <table className="table w-full text-center">
        <thead>
          <tr className="bg-base-200 text-base font-semibold">
            <th>#</th>
            <th>User</th>
            <th>Event</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Transaction ID</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment:Payment, index:string) => (
            <tr key={payment.id}>
              <th>{index + 1}</th>

              {/* User Name */}
              <td>{payment.user?.name || "Unknown User"}</td>

              {/* Event Title */}
              <td>{payment.event?.name || "Unknown Event"}</td>

              {/* Amount */}
              <td>${payment?.event?.joiningFee}</td>

              {/* Payment Status with color */}
              <td
                className={
                  payment.paymentStatus === "PAID"
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {payment.paymentStatus}
              </td>

              {/* Transaction ID */}
              <td>{payment.transactionId ?? "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsTable;
