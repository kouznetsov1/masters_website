import React, { useEffect, useState } from "react";
import "./CourseTable.css";
import Checkbox from "./Checkbox.js";
import { useRecoilValue } from 'recoil';
import {courses as coursesAtom,
  areas as allAreasAtom,
  areaFilter as areaFilterAtom,
  examinationFilter as examinationFilterAtom} from "../../atoms";

const CourseTable = () => {
  const courses = useRecoilValue(coursesAtom);
  const areas = useRecoilValue(allAreasAtom);
  const filteredAreas = useRecoilValue(areaFilterAtom); 
  const examinationFilter = useRecoilValue(examinationFilterAtom);

  return Semester(courses, areas, filteredAreas, examinationFilter);
}

const Semester = (courses, areas, filteredAreas, examinationFilter) => {
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
            <div className="card-body">{Areas(semester, 
              courses, areas, filteredAreas, examinationFilter)}</div>
          </div>
        </div>
      </div>
    );
    semester++;
  } while (semester <= 9);
  return <div>{renderedSemesters}</div>;
}

const Areas = (semester, courses, areas, filteredAreas, examinationFilter) => {
  var renderedAreas = [];

  for (let i = 0; i < areas.length; i++) {
    const area = areas[i];
    if (area !== "" && !filteredAreas.includes(area)) {
      renderedAreas.push(
        <div className={"semester"}>
          <h3 className="area-header">{area}</h3>
          {Period(semester, area, courses, filteredAreas, examinationFilter)}
        </div>
      );
    }
    else if (area === ""){
      renderedAreas.push(
        <div className={"semester"}>
          {Period(semester, area, courses, filteredAreas, examinationFilter)}
        </div>
      )
    }
  }
  return <div>{renderedAreas}</div>;
}

const Period = (semester, area, courses, filteredAreas, examinationFilter) => {
  var period = 1;
  var renderedPeriods = [];

  do {
    renderedPeriods.push(
      <div className="periods">
        <div className={"period_" + period}>
          <h5>Period {period}</h5>
          {Course(semester, area, period, courses, filteredAreas, examinationFilter)}
        </div>
      </div>
    );
    period++;
  } while (period <= 2);
  return <div>{renderedPeriods}</div>;
}


const Course = (semester, area, period, courses, filteredAreas, examinationFilter) => {
  var renderedCourses = [];
  var coursesToRender = [];

  for (let i = 0; i < courses.name.length; i++) {
    const course = courses.course[i];
    const to_render = shallCourseRender(
      semester,
      period,
      course,
      filteredAreas,
      examinationFilter
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
              semester={semester}
              period={period}
            />
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
            <td>{ExaminationObject(course.ten)}</td>
            <td>{ExaminationObject(course.lab)}</td>
            <td>{ExaminationObject(course.pra)}</td>
            <td>{ExaminationObject(course.upg)}</td>
            <td>{ExaminationObject(course.ktr)}</td>
            <td>{ExaminationObject(course.hem)}</td>
            <td>{ExaminationObject(course.bas)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  return <div>{renderedCourses}</div>;
}

const ExaminationObject = (examination) => {
  if (examination === true){
    return "X";
  }
  return;
}

const shallCourseRender = ((semester, period, course, filteredAreas, examinationFilter) => {
  var dyn_values = course.dynamic_values
  
  //console.log(course)

  // checks if course uses filtered examination type
  const is_examination = () => {
    for (let i = 0; i < examinationFilter.length; i++) {
      var exam_type = examinationFilter[i].toLowerCase();
      if (course[exam_type] === true) {
        return true;
      }
    }
    return false;
  }

  for (let i = 0; i < dyn_values.length; i++) {
    if (
      dyn_values[i].semester === semester &&
      dyn_values[i].period === period &&
      !is_examination() && !filteredAreas.includes(course.area)
    ) {
      return true;
    }
  }
  return false;
});


export default CourseTable;
