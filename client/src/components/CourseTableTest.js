import React, { useEffect, useState } from "react";
import "./CourseTable.css";
import axios from "axios";
import Checkbox from "./Checkbox.js";
import {configureStore} from '@reduxjs/toolkit'
import { useDispatch, useSelector } from "react-redux";

const CourseTableTest = () => {
  const [all_areas, setAllAreas] = useState([]);
  const [course, setCourses] = useState([]);
  const [course_name, setCourseName] = useState([]);
  const dispatch = useDispatch();


  useEffect(() => {
    axios.get("http://localhost:5000/courses").then((res) => {
      const courses_mount = res.data;

      for (let i = 0; i < courses_mount.length; i++) {
        var curr_course = courses_mount[i];

        if (!all_areas.includes(curr_course.area)) {
          all_areas.push(curr_course.area);
        }

        if (!course_name.includes(curr_course.name)) {
          curr_course = fixCourseDatatypes(curr_course);
          course_name.push(curr_course.name);
          course.push(curr_course);
          curr_course.strike_through = false;
        } 
        else {
          var index = course_name.indexOf(curr_course.name);

          if (!course[index].area.includes(curr_course.area)) {
            course[index].area.push(curr_course.area);
          }

          var dynamic_values = course[index].dynamic_values;
          var dyn_values = setDynamicValues(curr_course);

          course[index].dynamic_values.push(dyn_values);

          var dyn_val_unique = course[index].dynamic_values.reduce(
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
          course[index].dynamic_values = dyn_val_unique;
        }
      }
      semester();
    });
  })

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
    course.dynamic_values = [setDynamicValues(course)];
    course.area = [course.area];
    return course;
  }

  function semester() {
    var semester = 7;
    var renderedSemesters = [];
    console.log(course);

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
              <div className="card-body">{areas(semester)}</div>
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

    for (let i = 0; i < all_areas.length; i++) {
      const curr_area = all_areas[i];
      if (curr_area !== ""){
        renderedAreas.push(
          <div className={"semester"}>
            <h3 className="area-header">{curr_area}</h3>
            {period(semester, curr_area)}
          </div>
        );
      }
      else{
        renderedAreas.push(
          <div className={"semester"}>
            {period(semester, curr_area)}
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
            {render_course(semester, area, period)}
          </div>
        </div>
      );
      period++;
    } while (period <= 2);
    return <div>{renderedPeriods}</div>;
  }

  function render_course(semester, area, period) {
    var renderedCourses = [];
    var coursesToRender = [];

    for (let i = 0; i < course_name.length; i++) {
      const to_render = shallCourseRender(
        semester,
        period,
        course[i].dynamic_values
      );

      if (to_render && course[i].area.includes(area)) {
        coursesToRender.push(course[i]);
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
          {coursesToRender.map((courseToRender) => (
            <tr>
              <Checkbox course={courseToRender}
                semester={courseToRender.semester}
                period={courseToRender.period}
              />
              <td style={{width: "5em"}}>
                <a
                  href={
                    "http://www.google.com/search?q=" + courseToRender.code + "+liu"
                  }
                >
                  {courseToRender.code}
                </a>
              </td>
              <td style={{width: "40em"}}>
                <a href={courseToRender.url}>{courseToRender.name}</a>
              </td>
              <td style={{ width: "4em" }}>{courseToRender.points}</td>
              <td style={{ width: "4em" }}>{courseToRender.level}</td>
              <td style={{ width: "5em" }}>{courseToRender.block}</td>
              <td style={{ width: "4em" }}>{courseToRender.vof}</td>
              <td>{examinationObject(courseToRender.exam)}</td>
              <td>{examinationObject(courseToRender.lab)}</td>
              <td>{examinationObject(courseToRender.project)}</td>
              <td>{examinationObject(courseToRender.upg)}</td>
              <td>{examinationObject(courseToRender.ktr)}</td>
              <td>{examinationObject(courseToRender.hem)}</td>
              <td>{examinationObject(courseToRender.bas)}</td>
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
  return semester();
}

export default CourseTableTest;
