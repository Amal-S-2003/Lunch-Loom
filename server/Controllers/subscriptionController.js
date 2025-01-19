// const subscriptions = require("../Model/subscriptionSchema");
// const stripe = require("stripe")(process.env.stripe_secret_key);

// exports.initiateSubscription = async (req, res) => {
//   const { name, details, price, duration, messName, messId, userId } = req.body;

//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         price_data: {
//           currency: "inr",
//           product_data: {
//             name: messName,
//             description: `Details: ${details} \n Duration: ${duration} `,
//           },

//           unit_amount: price * 100,
//         },
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url: `http://localhost:5173/success`,
//     cancel_url: "http://localhost:5173",
//   });
//   const startingDate = new Date();
//   const endingDate = new Date();

//   const match = duration.match(/\d+/); // Matches one or more digits
//   const number = match ? parseInt(match[0], 10) : null;
//   endingDate.setDate(startingDate.getDate() + number);
//   const newSubscription = new subscriptions({
//     subscriptionType: name,
//     details,
//     price,
//     duration,
//     messName,
//     messId,
//     userId,
//     startingDate,
//     endingDate,
//   });
//   await newSubscription.save();
//   res.status(200).json(session.url);
// };

// // 24

// exports.addSubscription = async () => {};


// ======================================
// const stripe = require("stripe")(process.env.stripe_secret_key);

// exports.initiateSubscription = async (req, res) => {
//   const { name, details, price, duration, messName, messId, userId } = req.body;
// try{


//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         price_data: {
//           currency: "inr",
//           product_data: {
//             name: messName,
//             description: `Details: ${details} \n Duration: ${duration} `,
//           },
//           unit_amount: price * 100,
//         },
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url: `http://localhost:5173/success`,
//     cancel_url: `http://localhost:5173/cancel`,
//     metadata: {
//       name,
//       details,
//       duration,
//       messName,
//       messId,
//       userId,
//     }, // Store extra details in metadata
//   });

//   res.status(200).json({ url: session.url });
// }catch(error){
//   console.log(error);
  
// }

// };
