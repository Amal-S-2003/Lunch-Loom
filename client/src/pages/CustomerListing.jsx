import React, { useState } from "react";
import { customers } from "../assets/assets";

function CustomerListing() {
  const [customersList, setCustomersList] = useState(customers);

  return (
    <>
      <div className="container p-4 max-w-5xl">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-gray-200 max-sm:text-sm">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left max-sm:hidden">
                  #
                </th>
                <th className="py-2 px-4 border-b text-left">Username</th>
                <th className="py-2 px-4 border-b text-left">Phone Number </th>
                <th className="py-2 px-4 border-b text-left max-sm:hidden">
                  lastSubscriptionDate
                </th>
                <th className="py-2 px-4 border-b text-center">
                  Current Status
                </th>
                <th className="py-2 px-4 border-b text-left">Remaining Days</th>
              </tr>
            </thead>
            <tbody>
              {customersList.map((customer, index) => (
                <tr className="text-gray-700" key={index}>
                  <td className="py-2 px-4 border-b max-sm:hidden">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-b">{customer.userName}</td>
                  <td className="py-2 px-4 border-b max-sm:hidden">
                    {/* {moment(job.date).format("ll")} */}
                    {customer.phoneNumber}
                  </td>
                  <td className="py-2 px-4 border-b max-sm:hidden">
                    {customer.lastSubscriptionDate}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {customer.currentUser?
                  <p className="bg-green-100 text-green-600"> Active</p>  :<p className="bg-red-100 text-red-600">Inactive</p>
                  }
                  </td>
                  <td className="py-2 px-4 border-b">
                    {customer.remainingDays}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       
      </div>
    </>
  );
}

export default CustomerListing;
