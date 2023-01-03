import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthProvider } from "../AuthContext/AuthContext";

export const UserInfo = createContext();

const UserInfoContext = ({ children }) => {
  const { user } = useContext(AuthProvider);
  const [users, setUsers] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/usersData?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, [user?.email]);
  const userInfo = { users };
  return (
    <>
      <UserInfo.Provider value={userInfo}>{children}</UserInfo.Provider>
    </>
  );
};

export default UserInfoContext;
