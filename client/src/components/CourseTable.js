import React, { useEffect, useState } from "react";
import "./Components.css";
import Course from "./Course.js";

class CourseTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderCourses() {
    var period = 1;
    var semester = 7;
    var area = "";
    var renderedCourses = [];
    do {
      renderedCourses.push(
        <div className={"period:" + period}>
          <h2>Termin {semester}</h2>
          <h3>Period {period}</h3>
          <h3>Area {area}</h3>
          <table className="table table-sm">
            <tr>
              <tbody>
                <p>skrrt</p>
              </tbody>
            </tr>
          </table>
        </div>
      );
    } while (this.state.semester <= 10);
  }

  render() {
    var tabls = this.renderCourses();
    return (
      <div>
        <p>{tabls}</p>
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
