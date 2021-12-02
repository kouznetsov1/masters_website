import React, { useEffect, useState } from "react";
import "./CourseTable.css";
import Checkbox from "./Checkbox.js";
import { selector, useRecoilState,useRecoilValue } from 'recoil';
import {courses as coursesAtom, areas as allAreasAtom} from "../atoms";

class CourseTableTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      allAreas: [],
    };
  }

  render() {
    return <Semester/>
  };
}

function Semester() {
  var semester = 7;
  var renderedSemesters = [];

  do {
    renderedSemesters.push(
      <div id="accordion" className="full-table">
        <div className="card">
          <div className="card-header" id={"semester_" + semester}>
            <h2 className="mb-0">
              <button
                className="btn btn-link"
                data-toggle="collapse"
                data-target={"#collapse" + semester}
                aria-expanded="true"
                aria-controls={"collapseOne" + semester}
              >
                Termin {semester}
              </button>
            </h2>
          </div>

          <div
            id={"collapse" + semester}
            className="collapse show"
            aria-labelledby={"semester_" + semester}
            data-parent="#accordion"
          >
            <div className="card-body">{Areas(semester)}</div>
          </div>
        </div>
      </div>
    );
    semester++;
  } while (semester <= 9);
  return <div>{renderedSemesters}</div>;
}

function Areas(semester) {
  var renderedAreas = [];
  const allAreas = useRecoilValue(allAreasAtom);

  console.log(allAreas);

  for (let i = 0; i < allAreas.length; i++) {
    const area = allAreas[i];
    if (area !== ""){
      renderedAreas.push(
        <div className={"semester"}>
          <h3 className="area-header">{area}</h3>
          {Period(semester, area)}
        </div>
      );
    }
    else{
      renderedAreas.push(
        <div className={"semester"}>
          {Period(semester,area)}
        </div>
      )
    }
  }
  return <div>{renderedAreas}</div>;
}

function Period(semester, area) {
  var period = 1;
  var renderedPeriods = [];

  do {
    renderedPeriods.push(
      <div className="periods">
        <div className={"period_" + period}>
          <h5>Period {period}</h5>
          {Course(semester, area, period)}
        </div>
      </div>
    );
    period++;
  } while (period <= 2);
  return <div>{renderedPeriods}</div>;
}

function Course(semester, area, period) {
  var renderedCourses = [];
  var courses = useRecoilValue(coursesAtom);
  var coursesToRender = [];

  for (let i = 0; i < courses.name.length; i++) {
    const course = courses.course[i];
    const to_render = shallCourseRender(
      semester,
      period,
      course.dynamic_values
    );

    if (to_render && course.area.includes(area)) {
      coursesToRender.push(course);
    }
  }

  renderedCourses.push(
    <table className="table table-sm">
      <thead>
        <tr>
          <th scope="col">Check</th>
          <th scope="col">Kurskod</th>
          <th scope="col">Kurs</th>
          <th scope="col">Hp</th>
          <th scope="col">Nivå</th>
          <th scope="col">Block</th>
          <th scope="col">VOF</th>
          <th scope="col">TEN</th>
          <th scope="col">LAB</th>
          <th scope="col">PRA</th>
          <th scope="col">UPG</th>
          <th scope="col">KTR</th>
          <th scope="col">HEM</th>
          <th scope="col">BAS</th>
        </tr>
      </thead>
      <tbody>
        {coursesToRender.map((course) => (
          <tr>
            <Checkbox course={course}
              semester={course.semester}
              period={course.period}
            />
            {/*
            <td style={{width: "1.2em"}}>
              <div className="form-check">
                <input
                  type="checkbox"
                  name="prop1"
                  id="string"
                  className="modal__checkbox-input"
                />
              </div>
            </td>*/}
            <td style={{width: "5em"}}>
              <a
                href={
                  "http://www.google.com/search?q=" + course.code + "+liu"
                }
              >
                {course.code}
              </a>
            </td>
            <td style={{width: "40em"}}>
              <a href={course.url}>{course.name}</a>
            </td>
            <td style={{ width: "4em" }}>{course.points}</td>
            <td style={{ width: "4em" }}>{course.level}</td>
            <td style={{ width: "5em" }}>{course.block}</td>
            <td style={{ width: "4em" }}>{course.vof}</td>
            <td>{examinationObject(course.exam)}</td>
            <td>{examinationObject(course.lab)}</td>
            <td>{examinationObject(course.project)}</td>
            <td>{examinationObject(course.upg)}</td>
            <td>{examinationObject(course.ktr)}</td>
            <td>{examinationObject(course.hem)}</td>
            <td>{examinationObject(course.bas)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  return <div>{renderedCourses}</div>;
}

function examinationObject(examination) {
  if (examination === true){
    return "X";
  }
  return;
}

function shallCourseRender(semester, period, dyn_values) {
  for (let i = 0; i < dyn_values.length; i++) {
    if (
      dyn_values[i].semester === semester &&
      dyn_values[i].period === period
    ) {
      return true;
    }
  }
  return false;
}

export default CourseTableTest;
