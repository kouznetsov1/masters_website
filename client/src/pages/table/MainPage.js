import React from "react";
import CourseTable from "./CourseTable";
import TableFilter from "./TableFilter";

function MainPage() {
    return (
    <div>
        <TableFilter/>
        <CourseTable/>
    </div>
    )
}

export default MainPage;