import axios from "axios"
import { useDispatch } from "react-redux";
import React from "react";
import { addCourse, addArea } from "../../store/courses";

async function getCourses() {
  axios.get("http://localhost:5000/courses").then((res) => {
    const courses_mount = res.data;
    const all_areas = [];
    const courses = {
      name: [],
      course: [],
    };
    //const dispatch = useDispatch();

    const handleCourseAdd = event => {
      //event.preventDefault();
      //dispatch(addCourse(course))
      //setCourse('');
    };
    
    const handleAreaAdd = event => {
      //dispatch(addArea(event));
    };

    for (let i = 0; i < courses_mount.length; i++) {
      var course = courses_mount[i];

      if (!all_areas.includes(course.area)) {
        all_areas.push(course.area);
        //handleAreaAdd(course.area);
      }

      if (!courses.name.includes(course.name)) {
        course = fixCourseDatatypes(course);
        courses.name.push(course.name);
        courses.course.push(course);
        course.strike_through = false;
      } else {
        var index = courses.name.indexOf(course.name);

        if (!courses.course[index].area.includes(course.area)) {
          courses.course[index].area.push(course.area);
        }

        var dynamic_values = courses.course[index].dynamic_values;
        var dyn_values = setDynamicValues(course);

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
    return [courses, all_areas];
  });
};



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

export default getCourses;