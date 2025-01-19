import { createContext, useEffect, useState } from "react";
import { getUserData } from "../services/all_api";

export const UserContext = createContext();
export const UserContextProvider = (props) => {
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  const [loggedUserData, setLoggedUserData] = useState({});
  const fetchLoggedUserData = async () => {    
    const result = await getUserData({userId});
    setLoggedUserData(result.data)
  };

  useEffect(() => {    
    fetchLoggedUserData();
  }, [userId]);

  const value = { userId, setUserId,loggedUserData, setLoggedUserData };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
