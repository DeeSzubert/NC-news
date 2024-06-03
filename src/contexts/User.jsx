import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        username,
        setUsername,
        loginStatus,
        setLoginStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
