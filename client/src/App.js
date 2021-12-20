import "./App.css";
import React from 'react';

// Components
import CourseTable from "./components/CourseTable.js";
import Header from "./components/PageHeader.js";
import TableFilter from "./components/TableFilter.js";
import TestComponent from "./components/TestComponent.js";

function App() {
  return (
      <div className="App">
        <Header />
        <TableFilter />
        <CourseTable />
        {/*<TestComponent/>*/}
      </div>
  );
}

export default App;
