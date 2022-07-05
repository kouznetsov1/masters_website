import React from "react";
import "./PageHeader.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: "",
    };
  }

  render() {
    return (
      <div className="header">
        <nav className="navbar navbar-dark navbar-custom">
          <a
            className="navbar-brand"
            href="/"
          >
            <p className="navLink">MASTERS - LIU</p>
          </a>

          <a className="nav-item nav-link" href="/chosen">
            <p className="navLink">Valda kurser</p>
          </a>
        </nav>
      </div>
    );
  }
}

export default Header;
