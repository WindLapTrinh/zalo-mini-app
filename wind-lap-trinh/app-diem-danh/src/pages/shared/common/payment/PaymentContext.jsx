import React, { createContext, useContext, useState } from "react";

const PaymentContext = createContext();

export const paymentContext = () => useContext(PaymentContext);

export const PaymentProvider = ({ children }) => {
  const [paymentData, setPaymentData] = useState({ items: [], total: 0 });

  return (
    <PaymentContext.Provider value={{ paymentData, setPaymentData }}>
      {children}
    </PaymentContext.Provider>
  );
};
