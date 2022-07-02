import React from "react";
import CourseTable from "./CourseTable";
import TableFilter from "./TableFilter";
import "./MainPage.css";

function MainPage() {
    return (
    <div className="mainPage">
        <TableFilter className="filterBox"/>
        <CourseTable className="tableBox"/>
    </div>
    )
}

export default MainPage;