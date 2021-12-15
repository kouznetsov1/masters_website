import "./App.css";
import React from 'react';

// Components
import CourseTableTest from "./components/CourseTableTest.js";
import Header from "./components/PageHeader.js";
import TableFilter from "./components/TableFilter.js";
import TestComponent from "./components/TestComponent.js";

function App() {
  return (
      <div className="App">
        <Header />
        <TableFilter />
        <CourseTableTest />
        {/*<TestComponent/>*/}
      </div>
  );
}

export default App;
