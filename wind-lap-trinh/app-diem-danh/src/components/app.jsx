import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import Login from "../pages/login/Home.jsx";
import "../pages/shared/styles/app.css"
const MyApp = () => {
  const [tasks, setTasks] = useState([]);
 
  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <AnimationRoutes>
              <Route path="/" element={<Login></Login>}></Route>
            </AnimationRoutes>
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};
export default MyApp;
