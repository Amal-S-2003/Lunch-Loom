import { commonAPI } from "./common_api";
import { server_url } from "./server_url";

// User register
export const registerAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${server_url}/register`, reqBody, reqHeader);
}; 

// updateProfile
export const updateProfile = async (reqBody, reqHeader) => {
  console.log("updateProfile reqBody",reqBody);
  
  return await commonAPI("POST", `${server_url}/updateProfile`, reqBody, reqHeader?reqHeader:"");
}; 


// User addNewFood
export const addNewFood = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${server_url}/add-food`, reqBody, reqHeader);
}; 
// User Login
export const loginApi = async (user) => {
  return await commonAPI("POST", `${server_url}/login`, user, "");
};

// getUserData
export const getUserData = async (userId) => {
  return await commonAPI("POST", `${server_url}/get-user`, userId, "");
};
// getMessData
export const getMessData = async (messId) => {
  return await commonAPI("POST", `${server_url}/get-mess`, messId, "");
};

// getAllOrders
export const getAllOrders = async () => {
  return await commonAPI("GET", `${server_url}/get-all-orders`, "", "");
};
// updateOrderStatus
export const updateOrderStatus = async (reqBody) => {
  return await commonAPI("PUT", `${server_url}/update-delivery-status`, reqBody, "");
};
// updateWeeklyMenu
export const updateWeeklyMenu = async (newMenu) => {  
  return await commonAPI("PUT", `${server_url}/update-menu`, newMenu, "");
};

// Mess register
export const messRegistrationAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "POST",
    `${server_url}/mess-register `,
    reqBody,
    reqHeader
  );
};

// Mess Login
export const messLoginAPI = async (mess) => {
  return await commonAPI("POST", `${server_url}/mess-login `, mess, "");
};

// Add Menu of A Mess
export const addMenu = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${server_url}/edit-menu`, reqBody, reqHeader);
};

// Get Mess Deatails of Owner
export const getMessDetails = async (messId) => {
  return await commonAPI("POST", `${server_url}/get-mes`, messId, "");
};

// GEt ALLMESS DETAILS
export const getAllMesses = async () => {
  return await commonAPI("GET", `${server_url}/get-all-mess`, "", "");
};
// GEt USERS DETAILS
export const getAllUsers = async () => {
  return await commonAPI("GET", `${server_url}/get-all-user`, "", "");
};
// ==========================
// GEt ALL FOODS
export const getAllFoods = async () => {
  return await commonAPI("GET", `${server_url}/get-all-foods`, "", "");
};

// AddToCart
export const AddToCart = async (reqBody) => {
  return await commonAPI("PUT", `${server_url}/add-to-cart`, reqBody, "");
};
// updateCart
export const updateCart = async (reqBody) => {
  return await commonAPI("PUT", `${server_url}/update-cart`, reqBody, "");
};

// PlaceOrder
export const placeOrder = async (reqBody) => {
  return await commonAPI("POST", `${server_url}/place-order`, reqBody, "");
};

// addComment
export const addComment = async (reqBody) => {
  return await commonAPI("POST", `${server_url}/add-comment`, reqBody, "");
};
// getAllComment
export const getAllComment = async (messId) => {
  return await commonAPI("POST", `${server_url}/get-comments`, messId, "");
};
// getUserOrders
export const getUserOrders = async (userId) => {
  return await commonAPI("POST", `${server_url}/getUserOrders`, userId, "");
};

// getUserSubscriptions
export const getUserSubscriptions = async (userId) => {
  return await commonAPI("POST", `${server_url}/getUserSubscriptions`, userId, "");
}; 
// getMessCustomers
export const getMessCustomers = async (messId) => {
  return await commonAPI("POST", `${server_url}/getMessCustomers`, messId, "");
}; 

// getUserSubscriptions
export const deleteLastSub = async () => {
  return await commonAPI("GET", `${server_url}/cancelSub`, "", "");
};

//Delete Menu  by MEss Owner
export const deleteMenu = async (messId) => {
  return await commonAPI("DELETE", `${server_url}/delete-mess`, messId, "");
};


export const subcriptionFunction=async(reqBody)=>{
  return await commonAPI("POST",  `${server_url}/checkout`,reqBody,"")
}

