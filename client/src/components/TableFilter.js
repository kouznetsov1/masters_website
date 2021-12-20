import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import "./TableFilter.css";
import { 
  nonHandledCourses as coursesToHandleAtom, 
  courses as handledCoursesAtom,
  areas as allAreasAtom,
} from "../atoms";
import { setCourses } from "./functions/CourseSetter";

class TableFilter extends React.Component {
  render() {
    return (
      <div className="filterBoxes">
        <ProgramFilter />
        <AreaFilter />
        <PrecisionFilter />
      </div>
    );
  }
}


// #TODO: 
// rewrite api to show other programs courses 
function ProgramFilter() {
  const [currentProgram, setProgram] = useState("D");
  const [coursesToHandle, setNonHandledCourses] = useRecoilState(coursesToHandleAtom);
  const [handledCourses, setHandledCourses] = useRecoilState(handledCoursesAtom);
  const [allAreas, setAllAreas] = useRecoilState(allAreasAtom);

  const [courses, areas] = setCourses(coursesToHandle);

  useEffect(() => {
    axios.get("http://localhost:5000/courses").then((res) => {
      setNonHandledCourses(res.data);
    })
    setHandledCourses(courses);
    setAllAreas(areas);
  }, currentProgram)

  return (
    <div className="filterBox">
      <h3>Program</h3>
      <div className="overflow-auto">
        <div
          class="col-4"
        >
          <div class="list-group" id="list-tab" role="tablist">
            <a
              class="list-group-item list-group-item-action active"
              program="D"
              id="list-home-list"
              data-toggle="list"
              href="#list-home"
              role="tab"
              aria-controls="home"
              onClick={(e) => setProgram(e.target.attributes.program.nodeValue)}
            >
              Datateknik
            </a>
            <a
              class="list-group-item list-group-item-action"
              program="U"
              id="list-profile-list"
              data-toggle="list"
              href="#list-profile"
              role="tab"
              aria-controls="profile"
              onClick={(e) => setProgram(e.target.attributes.program.nodeValue)}
            >
              Mjukvaruteknik
            </a>
            <a
              class="list-group-item list-group-item-action"
              id="list-messages-list"
              data-toggle="list"
              href="#list-messages"
              role="tab"
              aria-controls="messages"
            >
              DPU
            </a>
            <a
              class="list-group-item list-group-item-action"
              id="list-settings-list"
              data-toggle="list"
              href="#list-settings"
              role="tab"
              aria-controls="settings"
            >
              Indek
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function AreaFilter() {
  return (
    <div className="filterBox">
      <h3>Inriktning</h3>
      <div
        className="btn-group-vertical"
      >
        <button
          className="areaFilterButton"
          type="button"
          class="btn btn-secondary"
        >
          Area 1
        </button>
        <button
          className="areaFilterButton"
          type="button"
          class="btn btn-secondary"
        >
          Area 2
        </button>
        <button
          className="areaFilterButton"
          type="button"
          class="btn btn-secondary"
        >
          Area 2
        </button>
        <button
          className="areaFilterButton"
          type="button"
          class="btn btn-secondary"
        >
          Area 2
        </button>
        <button
          className="areaFilterButton"
          type="button"
          class="btn btn-secondary"
        >
          Area 2
        </button>
<button
          className="areaFilterButton"
          type="button"
          class="btn btn-secondary"
        >
          Area 2
        </button>

      </div>
    </div>
  );
}

function PrecisionFilter() {
  return (
    <div className="filterBox">
      <h3>PrecisionFilter</h3>
    </div>
  );
}

export default TableFilter;
