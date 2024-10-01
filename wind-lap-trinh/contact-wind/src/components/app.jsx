// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";

import Home from "../pages/home/Home.jsx";
import Product from "../pages/product/Home.jsx";
import Cart from "../pages/cart/Home.jsx";
import Category from "../pages/product/Category.jsx";
import HomeNewForm from "../pages/newform/Home.jsx";
import Shop from "../pages/shop/Home.jsx";
import Favorites from "../pages/favorites/Home.jsx";
import Profile from "../pages/profile/Home.jsx";
import Inbox from "../pages/profile/Inbox.jsx";
import MemberRewards from "../pages/profile/MemberRewards.jsx";

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
                      <Route path="/product" element={<Product setTasks={setTasks} tasks={tasks} />} />
                      <Route path="/category" element={<Category setTasks={setTasks} tasks={tasks} />} />
                      <Route path="/cart" element={<Cart setTasks={setTasks} tasks={tasks} />} />
                      <Route path="/home/newform" element={<HomeNewForm setTasks={setTasks} tasks={tasks} />} />
                      <Route path="/shop" element={<Shop setTasks={setTasks} tasks={tasks} />} />
                      <Route path="/favorites" element={<Favorites setTasks={setTasks} tasks={tasks} />} />
                      <Route path="/profile" element={<Profile setTasks={setTasks} tasks={tasks} />} />
                      <Route path="/inbox" element={<Inbox setTasks={setTasks} tasks={tasks} />} />
                      <Route path="/memberRewards" element={<MemberRewards setTasks={setTasks} tasks={tasks} />} />

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
