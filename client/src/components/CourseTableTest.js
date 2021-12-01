import React, { useEffect, useState } from "react";
import "./CourseTable.css";
import axios from "axios";
import Checkbox from "./Checkbox.js";
import {atom, selector, useRecoilState} from 'recoil';

function CourseTable() {
  
}
useEffect = () => {
  axios.get("http://localhost:5000/courses").then((res) => {
    const courses_mount = res.data;
    const all_areas = [];
    const courses = {
      name: [],
      course: [],
    };


    for (let i = 0; i < courses_mount.length; i++) {
      var course = courses_mount[i];

      if (!all_areas.includes(course.area)) {
        all_areas.push(course.area);
      }

      if (!courses.name.includes(course.name)) {
        course = this.fixCourseDatatypes(course);
        courses.name.push(course.name);
        courses.course.push(course);
        course.strike_through = false;
      } else {
        var index = courses.name.indexOf(course.name);

        if (!courses.course[index].area.includes(course.area)) {
          courses.course[index].area.push(course.area);
        }

        var dynamic_values = courses.course[index].dynamic_values;
        var dyn_values = this.setDynamicValues(course);

        courses.course[index].dynamic_values.push(dyn_values);

        var dyn_val_unique = courses.course[index].dynamic_values.reduce(
          (unique, o) => {
            if (
              !unique.some(
                (obj) =>
                  obj.semester === o.semester &&
                  obj.block === o.block &&
                  obj.period === o.period
              )
            ) {
              unique.push(o);
            }
            return unique;
          },
          []
        );
        courses.course[index].dynamic_values = dyn_val_unique;
      }
    }
    this.setState({ courses });
    this.setState({ all_areas });
  });
}

function setDynamicValues(course) {
  var dynamic_values = {
    semester: course.semester,
    block: course.block,
    period: course.period,
    checked_here: false,
  };
  return dynamic_values;
}

// variable needs to be of type array for the ones below
function fixCourseDatatypes(course) {
  course.dynamic_values = [this.setDynamicValues(course)];
  course.area = [course.area];
  return course;
}

function semester() {
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
            <div className="card-body">{this.areas(semester)}</div>
          </div>
        </div>
      </div>
    );
    semester++;
  } while (semester <= 9);
  return <div>{renderedSemesters}</div>;
}

function areas(semester) {
  var renderedAreas = [];

  for (let i = 0; i < this.state.all_areas.length; i++) {
    const area = this.state.all_areas[i];
    if (area !== ""){
      renderedAreas.push(
        <div className={"semester"}>
          <h3 className="area-header">{area}</h3>
          {this.period(semester, area)}
        </div>
      );
    }
    else{
      renderedAreas.push(
        <div className={"semester"}>
          {this.period(semester,area)}
        </div>
      )
    }
  }
  return <div>{renderedAreas}</div>;
}

function period(semester, area) {
  var period = 1;
  var renderedPeriods = [];

  do {
    renderedPeriods.push(
      <div className="periods">
        <div className={"period_" + period}>
          <h5>Period {period}</h5>
          {this.course(semester, area, period)}
        </div>
      </div>
    );
    period++;
  } while (period <= 2);
  //this.setState({ courses });
  //this.setState({ all_areas });
  return <div>{renderedPeriods}</div>;
}

function course(semester, area, period) {
  var renderedCourses = [];
  var courses = this.state.courses;
  var coursesToRender = [];

  for (let i = 0; i < courses.name.length; i++) {
    const course = courses.course[i];
    const to_render = this.shallCourseRender(
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
            <td>{this.examinationObject(course.exam)}</td>
            <td>{this.examinationObject(course.lab)}</td>
            <td>{this.examinationObject(course.project)}</td>
            <td>{this.examinationObject(course.upg)}</td>
            <td>{this.examinationObject(course.ktr)}</td>
            <td>{this.examinationObject(course.hem)}</td>
            <td>{this.examinationObject(course.bas)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  return <div>{renderedCourses}</div>;
}

function checkBox(courseCode, isPressed) {
  const [pressed, setPressed] = this.useState("option1");

  if (isPressed) {
    setPressed("option2");
  }

  console.log("hej");
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

export default semester;
