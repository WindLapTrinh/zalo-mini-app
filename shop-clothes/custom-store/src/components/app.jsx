import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";

import Notice from "../pages/Notice.jsx";
import DayScorses from "../pages/DayScorses.jsx";
import Register from "../pages/Register.jsx";
import DetailHome from "../pages/DetailHome.jsx";
import TimeTable from "../pages/TimeTable.jsx";
import TranScript from "../pages/TranScript.jsx";
import DetailBranch from "../pages/DetailBranch.jsx";
import Account from "../pages/Account.jsx";
import Reg from "../pages/Reg.jsx";
import DateStudent from "../pages/DateStudent.jsx";
import DateAccount from "../pages/DateAccount.jsx";
import DateReg from "../pages/DateReg.jsx";
import DateTimeTable from "../pages/DateTimeTable.jsx";
import DateTranScript from "../pages/DateTranScript.jsx";
import DateNotice from "../pages/DateNotice.jsx";
import FillterStudent from "../pages/FillterStudent.jsx";
import RouterStudent from "../pages/RouterStudent.jsx";

const MyApp = () => {
  const [tasks, setTasks] = useState([]);
 
  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <AnimationRoutes>
              <Route path="/" element={<DetailHome setTasks={setTasks} tasks={tasks} />} />
              <Route path="/notice" element={<Notice setTasks={setTasks} tasks={tasks} />}/>
              <Route path="/dayscorses" element={<DayScorses setTasks={setTasks} tasks={tasks} />} />
              <Route path="/register" element={<Register setTasks={setTasks} tasks={tasks} />} />
              <Route path="/timetable" element={<TimeTable setTasks={setTasks} tasks={tasks} />} />
              <Route path="/transcript" element={<TranScript setTasks={setTasks} tasks={tasks} />} />
              <Route path="/detailbranch" element={<DetailBranch setTasks={setTasks} tasks={tasks} />} />
              <Route path="/account" element={<Account setTasks={setTasks} tasks={tasks} />} />
              <Route path="/reg" element={<Reg setTasks={setTasks} tasks={tasks} />} />
              <Route path="/datestudent" element={<DateStudent setTasks={setTasks} tasks={tasks} />} />
              <Route path="/dateaccount" element={<DateAccount setTasks={setTasks} tasks={tasks} />} />
              <Route path="/datereg" element={<DateReg setTasks={setTasks} tasks={tasks} />} />
              <Route path="/datetimetable" element={<DateTimeTable setTasks={setTasks} tasks={tasks} />} />
              <Route path="/datetranscript" element={<DateTranScript setTasks={setTasks} tasks={tasks} />} />
              <Route path="/datenotice" element={<DateNotice setTasks={setTasks} tasks={tasks} />} />
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
