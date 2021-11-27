import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from 'react';
import { incrementBird, addBird } from "../src/store/birds";

// Components
import CourseTableTest from "./components/CourseTableTest.js";
import Header from "./components/PageHeader.js";
import TableFilter from "./components/TableFilter.js";

/*
function App() {
  return (
    <div className="App">
      <Header />
      <TableFilter />
      <CourseTableTest />
    </div>
  );
}*/

function App() {
  const [birdName, setBird] = useState('');
  const birds = useSelector(state => state.birds);
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(addBird(birdName))
    setBird('');
  };

  return (
    <div>
      <h1>
      Bird List
      </h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>
            Add Bird
          </p>
          <input type="text"
            onChange={e => setBird(e.target.value)}
            value={birdName}
          />
        </label>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <ul>
        {birds.map(bird => (
          <li key={bird.name}>
            <h3>{bird.name}</h3>
            <div>
              Views: {bird.views}
              <button onClick={() => dispatch(incrementBird(bird.name))}><span role="img" aria-label="add">+</span></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App;
