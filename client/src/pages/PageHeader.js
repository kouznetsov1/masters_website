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
      <div className="header">
      <nav className="navbar sticky-top navbar-light bg-light">
        <a className="navbar-brand" href="/" style={{borderStyle: "solid", padding: "0.2em", borderWidth: "0.1em", margin: "0.1em"}}>
          MASTERS-LIU
        </a>

        <a className="nav-item nav-link" href="/chosen">
          Valda kurser
        </a>

        </nav>
        </div>
    );
  }
}

export default Header;
