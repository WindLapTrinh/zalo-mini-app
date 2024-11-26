import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import Login from "../pages/login/Home.jsx";
import Class from "../pages/class/Home.jsx"
import Student from "../pages/student/Home.jsx"

import "../pages/shared/styles/app.css"
const MyApp = () => {
  const [tasks, setTasks] = useState([]);
 
  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <AnimationRoutes>
              {/* <Route path="/" element={<Login></Login>}></Route> */}
              <Route path="/class" element={<Class setTasks={setTasks} tasks={tasks} />} />
              <Route path="/" element={<Student setTasks={setTasks} tasks={tasks} />} />
            </AnimationRoutes>
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};
export default MyApp;
