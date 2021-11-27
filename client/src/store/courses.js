import { combineReducers } from "redux";
const ADD_COURSE = "ADD_COURSE";
const ADD_AREA = "ADD_AREA";

// Actions
export function addCourse(course){
  return {
    type: "ADD_COURSE",
    course,
  }
}

export function addArea(area){
  return {
    type: "ADD_AREA",
    area,
  }
}

/*
// Default value - am I going to need one?
const defaultBirds = [
  {
    name: "daniel",
    views: 1,
  }
]*/

// Reducers
function courses(state=null, action) {
  switch(action.type){
    case ADD_COURSE:
      return [
        ...state,
        {
          course: action.course,
        }
      ];
    case ADD_AREA:
      return [
        ...state,
        {
          all_areas: action.area,
        }
      ]
    default:
      return state;
  }
}

const reduxReducers = combineReducers({
  courses
});

export default reduxReducers;
