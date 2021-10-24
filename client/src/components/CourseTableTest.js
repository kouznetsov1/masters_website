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

          if (!courses.course[index].area.includes(course.area)){
            courses.course[index].area.push(course.area);
          }

          var dynamic_values = courses.course[index].dynamic_values;
          var dyn_values = this.setDynamicValues(course);
          var added = false;

          for (let j = 0; j < dynamic_values.length; j++){
            
            if (!added){
              if (!(courses.course[index].dynamic_values[j].semester == course.semester)){
                courses.course[index].dynamic_values.push(dyn_values);
                added = true;
              }
              else if (!(courses.course[index].dynamic_values[j].period == course.period)){
                courses.course[index].dynamic_values.push(dyn_values);
                added = true;
              }
            }
          }

/*
          if (!(courses.course[index].dynamic_values.semester == course.semester)){
            var dyn_values = this.setDynamicValues(course);
            courses.course[index].dynamic_values.push(dyn_values);
          }
          else if (!(courses.course[index].dynamic_values.period == course.period)){
            var dyn_values = this.setDynamicValues(course);
            courses.course[index].dynamic_values.push(dyn_values);
          }
          */
        }
      }
      console.log(courses);
      this.setState({ courses });
      this.setState({ all_areas });
    });
  }

  setDynamicValues(course){
    var dynamic_values = {
      semester: course.semester,
      block: course.block,
      period: course.period,
      checked_here: false,
    }
    return dynamic_values;
  }

  // variable needs to be of type array for the ones below 
  fixCourseDatatypes(course){
    course.dynamic_values = [this.setDynamicValues(course)];
    course.area = [course.area];
    course.checked = false;
    return course;
  };


  render(){
    return <h1></h1>}
}


export default CourseTableTest;
