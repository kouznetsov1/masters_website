import React, { useEffect, useState } from "react";
import "./Components.css";
import axios from "axios";

class CourseTableTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: [],
      all_areas: [],
      picked_courses: [],
    };
  }

  /* courses = {
   *  course = {
   *     name: string
   *     areas: array
   *     period: int
   *     semester: int 
   *     etc......
   *  }
   * }
   * */

  componentDidMount() {
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
        if (!courses.name.includes(course.name)){
          course = this.fixCourseDatatypes(course);
          courses.name.push(course.name);
          courses.course.push(course);
        }
        else{
          var index = courses.name.indexOf(course.name);
          if (!courses.course[index].semester.includes(course.semester)){
            courses.course[index].semester.push(course.semester);
          }
          if (!courses.course[index].area.includes(course.area)){
            courses.course[index].area.push(course.area);
          }
          if (!courses.course[index].block.includes(course.block)){
            courses.course[index].block.push(course.block);
          }
          if (!courses.course[index].period.includes(course.period)){
            courses.course[index].period.push(course.period);
          }
        }
      }
      //console.log(courses_mount.length);
      console.log(courses);
      this.setState({ courses });
      this.setState({ all_areas });
    });
  }


  fixCourseDatatypes(course){
    var semester = course.semester;
    var area = course.area;
    var block = course.block;
    var period = course.period;
    course.semester = [semester];
    course.area = [area];
    course.block = [block];
    course.period = [period];
    return course;
  };


  render(){
    return <h1></h1>}
}


export default CourseTableTest;
