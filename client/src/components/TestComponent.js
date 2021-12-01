import axios from "axios";
import React, { useEffect, useState } from "react";
import { atom, useRecoilState, selector, useRecoilValue } from "recoil";

class TestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="filterBoxes">
        <TestFunc/>
      </div>
    );
  }
}

const courses = useRecoilValue(nonHandledCourses);

function TestFunc() {
    console.log(courses);
    return (
        <p>hej {courses}</p>
    );
};


export default TestComponent;
