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
      <nav class="navbar sticky-top navbar-light bg-light">
        <a class="navbar-brand" href="/">
          MASTERS-LIU
        </a>

        <a class="nav-item nav-link" href="#">
          Valda kurser
        </a>

        </nav>
    );
  }
}

export default Header;
