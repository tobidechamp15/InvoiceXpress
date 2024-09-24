import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const saveUser = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, saveUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
