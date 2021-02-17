import "./App.css";

// Components
import CourseTable from "./components/CourseTable.js";
import Header from "./components/PageHeader.js";

function App() {
  return (
    <div className="App">
      <Header />
      <CourseTable />
    </div>
  );
}

export default App;
