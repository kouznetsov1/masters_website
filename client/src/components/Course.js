import React, { useEffect, useState } from "react";
import "./Components.css";
import axios from "axios";

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/courses").then((res) => {
      const courses = res.data;
      this.setState({ courses });
    });
  }

  render() {
    return this.state.courses.map((course) => {
      // set up variables for checking what examination type
      var exam, lab, project, upg, ktr, hem, bas;
      var keys = [exam, lab, project, upg, ktr, hem, bas];
      var keys_string = ["exam", "lab", "project", "upg", "ktr", "hem", "bas"];

      // set variable of examination type to "X" if true
      Object.keys(course).forEach(function (key, index) {
        if (keys_string.includes(key) && course[key]) {
          var index_key = keys_string.indexOf(key);
          keys[index_key] = "X";
        }
      });

      var url = "http://www.google.com/search?q=" + course.code + " liu";

      return (
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
          <td>
            <a href={url} target="_blank">
              {course.name}
            </a>
          </td>
          <td>{course.points}</td>
          <td>{course.level}</td>
          <td>{course.block}</td>
          <td>{course.vof}</td>
          <td>{keys[0]}</td>
          <td>{keys[1]}</td>
          <td>{keys[2]}</td>
          <td>{keys[3]}</td>
          <td>{keys[4]}</td>
          <td>{keys[5]}</td>
          <td>{keys[6]}</td>
        </tr>
      );
    });
  }
}

export default Course;
