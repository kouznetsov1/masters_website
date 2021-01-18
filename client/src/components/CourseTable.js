import React, { useEffect, useState } from "react";
import "./Components.css";
import Course from "./Course.js";
import axios from "axios";

class CourseTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: [],
      all_areas: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/courses").then((res) => {
      const courses = res.data;
      const all_areas = [];
      for (let i = 0; i < courses.length; i++) {
        const course = courses[i];
        if (!all_areas.includes(course.area)) {
          all_areas.push(course.area);
        }
      }
      this.setState({ courses });
      this.setState({ all_areas });
    });
  }

  semester() {
    var semester = 7;
    var renderedSemesters = [];

    do {
      renderedSemesters.push(
        <div id="accordion">
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

        /*
        <div className={"period"}>
          <h2>Termin {semester}</h2>
          {this.areas(semester)}
        </div>
        */
      );
      semester++;
    } while (semester <= 9);
    return <div>{renderedSemesters}</div>;
  }

  areas(semester) {
    var renderedAreas = [];

    for (let i = 0; i < this.state.all_areas.length; i++) {
      const area = this.state.all_areas[i];
      renderedAreas.push(
        <div className={"semester"}>
          <h4>{area}</h4>
          {this.period(semester, area)}
        </div>
      );
    }
    return <div>{renderedAreas}</div>;
  }

  period(semester, area) {
    var period = 1;
    var renderedPeriods = [];

    do {
      renderedPeriods.push(
        <div className={"period_" + period}>
          <h6>Period {period}</h6>
          {this.course(semester, area, period)}
        </div>
      );
      period++;
    } while (period <= 2);
    return <div>{renderedPeriods}</div>;
  }

  course(semester, area, period) {
    var renderedCourses = [];
    var courses = this.state.courses;
    var coursesToRender = [];

    for (let i = 0; i < courses.length; i++) {
      const course = courses[i];
      if (
        course.semester === semester &&
        course.area === area &&
        course.period === period
      ) {
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
              <td>
                <div className="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox1"
                    value="option1"
                  />
                </div>
              </td>
              <td>{course.code}</td>
              <td>{course.name}</td>
              <td>{course.points}</td>
              <td>{course.level}</td>
              <td>{course.block}</td>
              <td>{course.vof}</td>
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

  examinationObject(examination) {
    if (examination === true) {
      return "X";
    }
    return;
  }

  tableHead() {
    return (
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
      </table>
    );
  }

  render() {
    var table_test = this.semester();
    console.log(this.state.all_areas);
    return <div>{table_test}</div>;
  }
}

export default CourseTable;
