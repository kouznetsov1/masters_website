import cloneDeep from "lodash/cloneDeep";

export function setCourses(nonHandledCourses) {
  const courses_mount = cloneDeep(nonHandledCourses);
  const all_areas = [];
  const courses = {
    name: [],
    course: [],
  };

  var course_id = 0;

  for (let i = 0; i < courses_mount.length; i++) {
    var course = courses_mount[i];

    if (!all_areas.includes(course.area)) {
      all_areas.push(course.area);
    }

    if (!courses.name.includes(course.name)) {
      course = fixCourseDatatypes(course);
      course.id = course_id;
      course_id++;
      courses.name.push(course.name);
      courses.course.push(course);
      course.checked = false;
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

export default setCourses;