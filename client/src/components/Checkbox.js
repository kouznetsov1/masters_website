import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {courses as coursesAtom} from "../atoms.js";
import cloneDeep from "lodash/cloneDeep";


const Checkbox = (props) => {
  const [courses, setCourses] = useRecoilState(coursesAtom);
  const courseState = courses.course[props.course.id];
  const [disabled, setDisabled] = useState(false);
  const [checked, setChecked] = useState(false);

  function handleCheckboxClick(semester, period) {
    setCourses(originalState => {
      // set new state
      const newState = cloneDeep({ ...originalState });
      const course = newState.course[props.course.id];

      // set dynamic values and checked variable
      if (course.checked === true) {
        course.checked = false;
        for (var i = 0; i < course.dynamic_values.length; i++){
          if (course.dynamic_values[i].semester === semester && course.dynamic_values[i].period === period) {
            course.dynamic_values[i].checked_here = false;
          }
        }
      } else {
        course.checked = true;
        for (var i = 0; i < course.dynamic_values.length; i++){
          if (course.dynamic_values[i].semester === semester && course.dynamic_values[i].period === period) {
            course.dynamic_values[i].checked_here = true;
          }
        }
      }

      return newState;
    });
  }

  useEffect(() => {

    if (courseState.checked) {
      var checked = false;
      for (var i = 0; i < courseState.dynamic_values.length; i++){
        if (courseState.dynamic_values[i].semester === props.semester && courseState.dynamic_values[i].period === props.period && courseState.dynamic_values[i].checked_here) {
          checked = true;
        }
      }

      if (!checked) {
        setDisabled(true);
      }

      if (checked) {
        setChecked(true);
      }
    }
    else{
      setDisabled(false);
      setChecked(false);
    }
    // this is not effective, it "changes" all course objects, not just the one that is clicked
  }, [courseState]);


  if (disabled){
    return (
      <div className="mdc-checkbox" 
      style={{ margin: "auto", width: "35px"}} >
        <input type="checkbox" 
        className="mdc-checkbox__native-control" 
        id="checkbox-1"
        disabled
        />
      </div>
    );
  }
  else {
    return (
      <div className="mdc-checkbox" 
      style={{ width: "15px", margin: "auto", }}
      onClick={() => handleCheckboxClick(props.semester, props.period)}>
        <input type="checkbox" 
        className="mdc-checkbox__native-control" 
        id="checkbox-1"
        checked={checked}/>
      </div>
    );
  }
}

export default Checkbox;
