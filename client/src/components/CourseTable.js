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

  renderSemester() {
    var semester = 7;
    var renderedSemesters = [];
    do {
      renderedSemesters.push(
        <div className={"period_" + semester}>
          <h2>Termin {semester}</h2>
          {this.renderAreas(semester)}
        </div>
      );
      semester++;
    } while (semester <= 10);
    return <div>{renderedSemesters}</div>;
  }

  renderAreas(semester) {
    var renderedAreas = [];

    for (let i = 0; i < this.state.all_areas.length; i++) {
      const area = this.state.all_areas[i];
      renderedAreas.push(
        <div className={"semester_" + semester + " area_" + area}>
          <h4>{area}</h4>
          {this.renderNewPeriod(semester, area)}
        </div>
      );
    }
    return <div>{renderedAreas}</div>;
  }

  renderNewPeriod(semester, area) {
    var period = 1;
    var renderedPeriods = [];

    do {
      renderedPeriods.push(
        <div className={"period_" + period}>
          <h6>Period {period}</h6>
          {this.renderNewCourse(semester, area, period)}
        </div>
      );
      period++;
    } while (period <= 2);
    return <div>{renderedPeriods}</div>;
  }

  renderNewCourse(semester, area, period) {
    var renderedCourses = [];
    var courses = this.state.courses;
    var current_course;

    // TODO: Index cannot reset after every new period/area/semester
    var index = 0;

    do {
      current_course = courses[index];
      renderedCourses.push(
        <div className={"course_" + current_course.name}>
          <p>{current_course.name}</p>
        </div>
      );
      index++;
    } while (current_course.period === period && current_course.area === area);
    return renderedCourses;
  }

  render() {
    var table_test = this.renderSemester();
    console.log(this.state.all_areas);
    return (
      <div>
        {table_test}
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
      </div>
    );
  }
}

export default CourseTable;
