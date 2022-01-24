import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import "./TableFilter.css";
import {
  nonHandledCourses as coursesToHandleAtom,
  courses as handledCoursesAtom,
  areas as allAreasAtom,
  areaFilter as areaFilterAtom,
  examinationFilter as examinationFilterAtom,
} from "../atoms";
import { setCourses } from "./functions/CourseSetter";
import cloneDeep from "lodash/cloneDeep";

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
  const [currentProgram, setProgram] = useState();
  const [coursesToHandle, setNonHandledCourses] = useRecoilState(
    coursesToHandleAtom
  );
  const setHandledCourses = useSetRecoilState(handledCoursesAtom);
  const setAllAreas = useSetRecoilState(allAreasAtom);

  const [courses, areas] = setCourses(coursesToHandle);

  useEffect(() => {
    axios.get("http://localhost:5000/courses").then((res) => {
      setNonHandledCourses(res.data);
    });
    setHandledCourses(courses);
    setAllAreas(areas);
    console.log(currentProgram);
  }, [currentProgram]);

  var programs = {
    D: "Datateknik",
    DPU: "Design- & produktutveckling",
    ED: "Elektronikdesign",
    EMM: "Energi - miljö - management",
    I: "Industriell Ekonomi",
    IT: "Informationsteknologi",
    KB: "Kemisk biologi",
    KTS: "Kommunikation, transport och samhälle",
    M: "Maskinteknik",
    MED: "Medicinsk teknisk",
    MT: "Medieteknik",
    U: "Mjukvaruteknik",
    TBI: "Teknisk Biologi",
    Y: "Teknisk fysik och elektroteknik",
  };

  return (
    <div className="filterBox">
      <h3>Program</h3>
      <div className="overflow-auto">
        <div class="col-4">
          <div class="list-group" id="list-tab" role="tablist">
            {Object.entries(programs).map(([code, program]) => (
              <a
                class="list-group-item list-group-item-action"
                program={code}
                id="list-home-list"
                data-toggle="list"
                href="#list-home"
                role="tab"
                aria-controls="home"
                onClick={(e) =>
                  setProgram(e.target.attributes.program.nodeValue)
                }
              >
                {program}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AreaFilter() {
  const areas = cloneDeep(useRecoilValue(allAreasAtom));
  const [areaFilter, setAreaFilter] = useRecoilState(areaFilterAtom);

  for (var i = 0; i < areas.length; i++){
    if (areas[i] === ""){
      areas.splice(i, 1);
    }
  }

  function onCheckboxClick(area, value) {
    // delete from areafilter
    if (value){
      setAreaFilter((areaFilter) => areaFilter.filter((item) => item !== area));
    }
    // add to areafilter
    else {
      setAreaFilter((areaFilter) => 
        (areaFilter.find((item) =>
        item === area) ?
          area : [...areaFilter, area])); 
    }
  }

  return (
    <div className="filterBox">
      <h3>Profil</h3>
      <div className="overflow-auto">
        <div class="col-4">
          <div
            class="list-group"
            id="list-tab"
            role="tablist"
            style={{ backgroundColor: "white" }}
          >
            {areas.map((area) => { 
              return(
              <div class="form-check" style={{ margin: "5px" }}>
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="flexCheckDefault"
                  defaultChecked
                  onClick={(e) => {
                    if (e.target.checked){
                      onCheckboxClick(area, e.target.checked);
                    }
                    else{
                      onCheckboxClick(area, e.target.checked);
                    }
                  }}
                />
                <label class="form-check-label" for="flexCheckDefault">
                  {area}
                </label>
              </div>
            )})}
          </div>
        </div>
      </div>
    </div>
  );
}

function PrecisionFilter() {
  var examinations = [
    "TEN",
    "LAB",
    "UPG",
    "KTR",
    "HEM",
    "BAS",
    "PRA",
  ];

  function onCheckboxClick(examination) {
    console.log(examination);
  }

  return (
    <div className="filterBox">
      <h3>Examinationsmoment</h3>
      <div className="overflow-auto">
        <div class="col-4">
          <div
            class="list-group"
            id="list-tab"
            role="tablist"
            style={{ backgroundColor: "white" }}
          >
            {examinations.map((examination) => (
              <div class="form-check" style={{ margin: "5px" }}>
                <input
                  class="form-check-input"
                  type="checkbox"
                  value={examination}
                  id="flexCheckDefault"
                  onClick={() => onCheckboxClick(examination)}
                  defaultChecked
                />
                <label class="form-check-label" for="flexCheckChecked">
                  {examination}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableFilter;
