import {atom} from "recoil";

export const nonHandledCourses = atom({
    key: "nonHandledCourses",
    default: [],
});

export const courses = atom({
    key: "courses",
    default: [],
});

export const areas = atom({
    key: "areas",
    default: [],
});

export const areaFilter = atom({
  key: "areaFilter",
  default: [],
});

export const examinationFilter = atom({
  key: "examinationFilter",
  default: [],
});

export const chosenCourses = atom({
  key: "chosenCourses",
  default: [],
});
