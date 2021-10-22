import React, { useEffect, useState } from "react";
import "./Components.css";

class TableFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          width: "80%",
          margin: "auto",
        }}
      >
        <ProgramFilter />
        <AreaFilter />
        <PrecisionFilter />
      </div>
    );
  }
}

function ProgramFilter() {
  return (
    <div className="filterBox">
      <h3>Program</h3>
      <div className="overflow-auto">
        <div
          class="col-4"
          style={{
            display: "table",
            width: "29em",
            border: "solid",
          }}
        >
          <div class="list-group" id="list-tab" role="tablist">
            <a
              class="list-group-item list-group-item-action active"
              id="list-home-list"
              data-toggle="list"
              href="#list-home"
              role="tab"
              aria-controls="home"
            >
              Datateknik
            </a>
            <a
              class="list-group-item list-group-item-action"
              id="list-profile-list"
              data-toggle="list"
              href="#list-profile"
              role="tab"
              aria-controls="profile"
            >
              Mjukvaruteknik
            </a>
            <a
              class="list-group-item list-group-item-action"
              id="list-messages-list"
              data-toggle="list"
              href="#list-messages"
              role="tab"
              aria-controls="messages"
            >
              DPU
            </a>
            <a
              class="list-group-item list-group-item-action"
              id="list-settings-list"
              data-toggle="list"
              href="#list-settings"
              role="tab"
              aria-controls="settings"
            >
              Indek
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function AreaFilter() {
  return (
    <div className="filterBox">
      <h3>Inriktning</h3>
      <div
        className="btn-group-vertical"
        style={{ display: "inline-block", width: "100%" }}
      >
        <button
          className="filterButton"
          type="button"
          class="btn btn-secondary"
        >
          Area 1
        </button>
        <button
          className="filterButton"
          type="button"
          class="btn btn-secondary"
        >
          Area 2
        </button>
      </div>
    </div>
  );
}

function PrecisionFilter() {
  return (
    <div className="filterBox">
      <h3>PrecisionFilter</h3>
    </div>
  );
}

export default TableFilter;
