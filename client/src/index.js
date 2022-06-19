import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Components
import MainPage from "./pages/table/MainPage";
import Header from "./pages/PageHeader.js";
import ChosenCoursePage from "./pages/chosen/ChosenCoursePage";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
    <Router>
    <Header/>
    <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/chosen" element={<ChosenCoursePage />} />
    </Routes>
    </Router>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
