import "./App.css";
import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

// Components
import CourseTable from "./pages/table/CourseTable.js";
import Header from "./pages/PageHeader.js";
import TableFilter from "./pages/table/TableFilter.js";
import ChosenCourses from "./pages/chosen/ChosenCourses";

function App() {
  return (
    <div className="App">
      <Header />
      <TableFilter />
      <CourseTable />
    </div>
  );
}

export default App;
