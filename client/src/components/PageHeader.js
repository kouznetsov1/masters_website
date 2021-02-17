import React, { useEffect, useState } from "react";
import "./Components.css";
import axios from "axios";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: "",
    };
  }

  render() {
    return (
      <nav class="navbar sticky-top navbar-light bg-light">
        <a class="navbar-brand" href="#">
          MASTERS-LIU
        </a>

        <a class="nav-item nav-link" href="#" style={{ color: "#43464b" }}>
          Valda kurser
        </a>

        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Sök på kurs..."
          />
          <button
            class="btn btn-outline-success my-2 my-sm-0"
            type="submit"
            style={{ color: "blue", borderColor: "blue" }}
          >
            Sök
          </button>
        </form>
      </nav>
    );
  }
}

export default Header;
