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
