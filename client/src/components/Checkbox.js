import React from "react";

class Checkbox extends React.Component {
 constructor(props) {
   super(props);

   this.state = {
    course: [],
   };
 }


  render() {
    return <h4>{this.props.course.name}</h4>;
  }
}

export default Checkbox;
