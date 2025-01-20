// import React, { useEffect, useState } from "react";
// import { customers } from "../assets/assets";
// import { getMessCustomers } from "../services/all_api";

// function CustomerListing() {
//   const [customersList, setCustomersList] = useState(customers);
//   const [messId, setMessId] = useState(sessionStorage.getItem('messId'));

//   const [customerss,setCustomerss]=useState([])
//   const fetchMessCustomers=async()=>{
//     const result=await getMessCustomers({messId})
//     console.log(result.data);
    
//   }
//   useEffect(() => {
//     fetchMessCustomers()

//   }, [messId]);
//   return (
//     <>
//       <div className="container p-4 max-w-5xl">
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border-gray-200 max-sm:text-sm">
//             <thead>
//               <tr>
//                 <th className="py-2 px-4 border-b text-left max-sm:hidden">
//                   #
//                 </th>
//                 <th className="py-2 px-4 border-b text-left">Username</th>
//                 <th className="py-2 px-4 border-b text-left">Phone Number </th>
//                 <th className="py-2 px-4 border-b text-left max-sm:hidden">
//                   lastSubscriptionDate
//                 </th>
//                 <th className="py-2 px-4 border-b text-center">
//                   Current Status
//                 </th>
//                 <th className="py-2 px-4 border-b text-left">Remaining Days</th>
//               </tr>
//             </thead>
//             <tbody>
//               {customersList.map((customer, index) => (
//                 <tr className="text-gray-700" key={index}>
//                   <td className="py-2 px-4 border-b max-sm:hidden">
//                     {index + 1}
//                   </td>
//                   <td className="py-2 px-4 border-b">{customer.userName}</td>
//                   <td className="py-2 px-4 border-b max-sm:hidden">
//                     {/* {moment(job.date).format("ll")} */}
//                     {customer.phoneNumber}
//                   </td>
//                   <td className="py-2 px-4 border-b max-sm:hidden">
//                     {customer.lastSubscriptionDate}
//                   </td>
//                   <td className="py-2 px-4 border-b text-center">
//                     {customer.currentUser?
//                   <p className="bg-green-100 text-green-600"> Active</p>  :<p className="bg-red-100 text-red-600">Inactive</p>
//                   }
//                   </td>
//                   <td className="py-2 px-4 border-b">
//                     {customer.remainingDays}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
       
//       </div>
//     </>
//   );
// }

// export default CustomerListing;


import React, { useEffect, useState } from "react";

function CustomerListing() {
  const [customersList, setCustomersList] = useState([]);
  const messId = sessionStorage.getItem("messId");

  // Sample subscription data (replace with API data if needed)
  const subscriptions = [
    {
      details: "Good Food For 30 Days",
      duration: "30 Days",
      endingDate: "Tue Feb 18 2025 15:48:21 GMT+0530 (India Standard Time)",
      messId: "67893c865576ae167099c9ce",
      messName: "Full On Cafe",
      price: 2500,
      startingDate: "Sun Jan 19 2025 15:48:21 GMT+0530 (India Standard Time)",
      subscriptionType: "Monthly",
      userId: "678a2b6880e2e582c9d227bc",
      _id: "678cd16d2a655dc9f1f70adc",
    },
    {
      details: "Good Food For 7 Days",
      duration: "7 Days",
      endingDate: "Sun Jan 26 2025 16:36:55 GMT+0530 (India Standard Time)",
      messId: "67893c865576ae167099c9ce",
      messName: "Full On Cafe",
      price: 700,
      startingDate: "Sun Jan 19 2025 16:36:55 GMT+0530 (India Standard Time)",
      subscriptionType: "Weekly",
      userId: "678a2b6880e2e582c9d227bc",
      _id: "678cdccf2a655dc9f1f70af6",
    },
  ];

  // Calculate remaining days based on the ending date
  const calculateRemainingDays = (endingDate) => {
    const today = new Date();
    const endDate = new Date(endingDate);
    const difference = endDate - today; // Time difference in milliseconds
    const days = Math.ceil(difference / (1000 * 60 * 60 * 24)); // Convert to days
    return days > 0 ? days : 0; // Return 0 if already expired
  };

  useEffect(() => {
    // Simulate fetching data and adding `remainingDays`
    const updatedSubscriptions = subscriptions.map((subscription) => ({
      ...subscription,
      remainingDays: calculateRemainingDays(subscription.endingDate),
      userName: "User " + subscription.userId.slice(-4), // Simulated username
      phoneNumber: "123-456-7890", // Placeholder phone number
      lastSubscriptionDate: subscription.startingDate,
      currentUser: calculateRemainingDays(subscription.endingDate) > 0,
    }));

    setCustomersList(updatedSubscriptions);
  }, [messId]);

  return (
    <>
      <div className="container p-4 max-w-5xl">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-gray-200 max-sm:text-sm">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left max-sm:hidden">#</th>
                <th className="py-2 px-4 border-b text-left">Username</th>
                <th className="py-2 px-4 border-b text-left">Phone Number</th>
                <th className="py-2 px-4 border-b text-left max-sm:hidden">
                  Last Subscription Date
                </th>
                <th className="py-2 px-4 border-b text-center">Current Status</th>
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
                  <td className="py-2 px-4 border-b">{customer.phoneNumber}</td>
                  <td className="py-2 px-4 border-b max-sm:hidden">
                    {new Date(customer.lastSubscriptionDate).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {customer.currentUser ? (
                      <p className="bg-green-100 text-green-600 px-2 py-1 rounded">
                        Active
                      </p>
                    ) : (
                      <p className="bg-red-100 text-red-600 px-2 py-1 rounded">
                        Inactive
                      </p>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {customer.remainingDays} days
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
