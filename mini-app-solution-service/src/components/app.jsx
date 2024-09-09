// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";

import Home from "../pages/home/Home.jsx";
import CategoryByProduct from "../pages/category/CategoryByProduct.jsx";
import ProductDetail from "../pages/category/ProductDetail.jsx";
import NotificationPage from "../pages/notify/NotificationPage.jsx";
import UserPage from "../pages/user/UserPage.jsx";
import PurchaseHistory from "../pages/cart/PurchaseHistory.jsx";
import HomeCart from "../pages/cart/HomeCart.jsx";
import UpdatePage from "../pages/shared/pages/Update.jsx";
import Language from "../pages/shared/pages/Language.jsx";
import AddressPage from "../pages/cart/AddressCart.jsx";
import ListAddress from "../pages/cart/ListAddress.jsx";
import HomePayment from "../pages/payment/HomePayment.jsx";
import { CartProvider } from "../pages/shared/common/cart/CartContext";
import { PaymentProvider } from "../pages/shared/common/payment/PaymentContext";
import { AddressProvider } from "../pages/shared/common/cart/AddressContext.jsx";

import "../pages/shared/styles/app.css"
const MyApp = () => {
  const [tasks, setTasks] = useState([]);
  return (
    <RecoilRoot>
      <CartProvider>
        <AddressProvider>
          <PaymentProvider>
              <App>
                <SnackbarProvider>
                  <ZMPRouter>
                    <AnimationRoutes>
                      <Route path="/" element={<Home setTasks={setTasks} tasks={tasks} />} />
                      <Route path="/categoryByProduct" element={<CategoryByProduct setTasks={setTasks} tasks={tasks} />} />
                      <Route path="/detailProduct" element={<ProductDetail setTasks={setTasks} tasks={tasks} />} />
                      <Route path="/notificationPage" element={<NotificationPage setTasks={setTasks} tasks={tasks} />} />
                      <Route path="/contactUser" element={<UserPage setTasks={setTasks} tasks={tasks} />} />
                      <Route path="/purchaseHistory" element={<PurchaseHistory setTasks={setTasks} tasks={tasks} />} />
                      <Route path="/update" element={<UpdatePage setTasks={setTasks} tasks={tasks} />} />
                      <Route path="/addressCart" element={<AddressPage setTasks={setTasks} tasks={tasks} />} />
                      <Route path="/homeCart" element={<HomeCart setTasks={setTasks} tasks={tasks} />} />
                      <Route path="/homePayment" element={<HomePayment setTasks={setTasks} tasks={tasks} />} />
                      <Route path="/listAddress" element={<ListAddress setTasks={setTasks} tasks={tasks} />} />
                    </AnimationRoutes>
                  </ZMPRouter>
                </SnackbarProvider>
              </App>
          </PaymentProvider>
        </AddressProvider>
      </CartProvider>
    </RecoilRoot>
  );
};

export default MyApp;
