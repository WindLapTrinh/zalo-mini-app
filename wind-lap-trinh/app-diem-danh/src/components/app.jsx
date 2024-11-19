// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";

import HomeLogin from "../pages/login/HomeLogin.jsx";
import HomePage from "../pages/home/Home.jsx";

const MyApp = () => {
  const [tasks, setTasks] = useState([]);
  return (
    <RecoilRoot>
              <App>
                <SnackbarProvider>
                  <ZMPRouter>
                    <AnimationRoutes>
                      <Route path="/" element={<HomeLogin setTasks={setTasks} tasks={tasks} />} />
                      <Route path="/homePage" element={<HomePage setTasks={setTasks} tasks={tasks} />} />
                    </AnimationRoutes>
                  </ZMPRouter>
                </SnackbarProvider>
              </App>
    </RecoilRoot>
  );
};

export default MyApp;
