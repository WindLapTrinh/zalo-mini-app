import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import Login from "../pages/login/Home.jsx";
import Students from "../pages/students/Home.jsx";
import DetailHome from "../pages/home/Home.jsx";
import Infomation from "../pages/shared/pages/Infomation.jsx";
import TuitionFees from "../pages/accountant/Home.jsx";
import Register from "../pages/registrationform/Home.jsx";
import TranScript from "../pages/transcript/Home.jsx";
import RollCall from "../pages/rollcall/Home.jsx";
import TimeTable from "../pages/timetable/Home.jsx";
import Survey from "../pages/survey/Home.jsx";
import DetailSurvey from "../pages/survey/DetailSurvey.jsx";
import HomeNotify from "../pages/notify/Home.jsx";
import DateNotify from "../pages/notify/DateNotice.jsx";
import RegisterOnline from "../pages/resgisteronline/Home.jsx";
import FillterStudent from "../pages/learningpath/FillterStudent.jsx";
import RouterStudent from "../pages/learningpath/Home.jsx";
import Contact from "../pages/contact/Home.jsx";
import "../pages/shared/styles/app.css"
const MyApp = () => {
  const [tasks, setTasks] = useState([]);
 
  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <AnimationRoutes>

              {/* <Route path="/" element={<Contact/>}></Route> */}

              <Route path="/" element={<Login></Login>}></Route>
              {/* <Route path="/" element={<Students />} />  */}
              <Route path="/students" element={<Students />} /> 

               <Route path="/home" element={<DetailHome setTasks={setTasks} tasks={tasks} />} />
               <Route path="/survey" element={<Survey setTasks={setTasks} tasks={tasks} />} />
              <Route path="/detailsurvey" element={<DetailSurvey setTasks={setTasks} tasks={tasks} />} />
              <Route path="/resistoronline" element={<RegisterOnline etTasks={setTasks} tasks={tasks} />} />
              <Route path="/notify" element={<HomeNotify setTasks={setTasks} tasks={tasks} />}/>
              <Route path="/datenotify" element={<DateNotify setTasks={setTasks} tasks={tasks} />}/>
              <Route path="/register" element={<Register setTasks={setTasks} tasks={tasks} />} />
              <Route path="/transcript" element={<TranScript setTasks={setTasks} tasks={tasks} />} />
              <Route path="/rollcall" element={<RollCall setTasks={setTasks} tasks={tasks} />} />
              <Route path="/timetable" element={<TimeTable setTasks={setTasks} tasks={tasks} />} />
              <Route path="/tuitionFees" element={<TuitionFees setTasks={setTasks} tasks={tasks} />} />
              <Route path="/fillterstudent" element={<FillterStudent setTasks={setTasks} tasks={tasks} />} />
              <Route path="/routerstudent" element={<RouterStudent setTasks={setTasks} tasks={tasks} />} />
            </AnimationRoutes>
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};
export default MyApp;
