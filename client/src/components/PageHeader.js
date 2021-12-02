import React from "react";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: "",
    };
  }

  render() {
    return (
      <nav className="navbar sticky-top navbar-light bg-light">
        <a className="navbar-brand" href="/">
          MASTERS-LIU
        </a>

        <a className="nav-item nav-link" href="#">
          Valda kurser
        </a>

        </nav>
    );
  }
}

export default Header;
