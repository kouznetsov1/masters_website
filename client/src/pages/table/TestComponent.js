import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState, selector, useRecoilValue } from "recoil";
import {courses as coursesToHandleAtom } from "../../atoms";

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

function TestFunc() {
    const courses = useRecoilValue(coursesToHandleAtom);

    console.log({courses});
    return (
        <p>tjena</p>
    );
};


export default TestComponent;
