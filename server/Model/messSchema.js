// const mongoose = require("mongoose");

// const MessSchema = new mongoose.Schema(
//   {
//     messName: {
//       type: String,
//       required: true,
//     },
//     phoneNumber: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     emailAddress: {
//       type: String,
//       required: true,
//     },
//     location: {
//       type: String,
//       required: true,
//     },
//     address: {
//       type: String,
//       required: true,
//     },
//     googleMapLink: {
//       type: String,
//     },
//     homeDelivery: {
//       type: Boolean,
//       default: false,
//     },
//     messDescription: {
//       type: String,
//     },
//     messImage: {
//       type: String,
//     },
//     password: {
//       type: String,
//     },
//     customerList: [
//       {
//         name: {
//           type: String,
//           required: true,
//         },
//         phoneNumber: {
//           type: String,
//           required: true,
//         },
//         emailAddress: {
//           type: String,
//         },
//         subscriptionPlan: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "SubscriptionPlan",
//         },
//       },
//     ],
//     ratings: [
//       {
//         customerName: {
//           type: String,
//           required: true,
//         },
//         rating: {
//           type: Number,
//           min: 1,
//           max: 5,
//           required: true,
//         },
//         review: {
//           type: String,
//         },
//       },
//     ],
//     weeklyMenu: [
//       {
//         day: {
//           type: String,
//           required: true,
//         },
//         meals: [
//           {
//             name: {
//               type: String,
//               required: true,
//             },
//             description: {
//               type: String,
//             },
//             price: {
//               type: Number,
//               required: true,
//             },
//           },
//         ],
//       },
//     ],
//     subscriptionPlans: [
//       {
//         name: {
//           type: String,
//           required: true,
//         },
//         price: {
//           type: Number,
//           required: true,
//         },
//         duration: {
//           type: String, // Example: "1 Week", "1 Month"
//           required: true,
//         },
//         details: {
//           type: String,
//         },
//       },
//     ],
//   },
//   { timestamps: true }
// );
// const messes = mongoose.model("messes", MessSchema);

// module.exports = messes;

const mongoose = require("mongoose");

const MessSchema = new mongoose.Schema(
  {
    messName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    emailAddress: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    googleMapLink: {
      type: String,
    },
    homeDelivery: {
      type: Boolean,
      default: false,
    },
    messDescription: {
      type: String,
    },
    messImage: {
      type: String, // Stores the path/URL of the uploaded image
    },
    password: {
      type: String,
      required: true,
    },
    weeklyMenu: [
      {
        day: {
          type: String,
          required: true,
        },
        breakfast: {
          type: String,
        },
        lunch: {
          type: String,
        },
        dinner: {
          type: String,
        },
      },
    ],
    subscriptionPlans: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        duration: {
          type: String, // Example: "1 Week", "1 Month"
          required: true,
        },
        details: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Mess = mongoose.model("messes", MessSchema);

module.exports = Mess;
