import "./App.css";

// Components
import CourseTableTest from "./components/CourseTableTest.js";
//import CourseTable from "./components/CourseTable.js";
import Header from "./components/PageHeader.js";
import TableFilter from "./components/TableFilter.js";

function App() {
  return (
    <div className="App">
      <Header />
      <TableFilter />
      <CourseTableTest />
    </div>
  );
}

export default App;
