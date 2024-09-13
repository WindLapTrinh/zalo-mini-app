import React, { useState, useEffect, createContext, useContext } from "react";

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [address, setAddress] = useState(() => {
    // Retrieve the address from local storage if it exists
    const savedAddress = localStorage.getItem("address");
    return savedAddress ? JSON.parse(savedAddress) : [];
  });

  useEffect(() => {
    // Save the address to local storage whenever it changes
    localStorage.setItem("address", JSON.stringify(address));
  }, [address]);

  return (
    <AddressContext.Provider value={{ address, setAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => useContext(AddressContext);
