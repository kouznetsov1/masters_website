import React from "react";

class Checkbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: this.props.course,
      semester: this.props.semester,
      period: this.props.period,
      checked: false,
      checked_elsewhere: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    
  }

  handleInputChange() {
    const course = this.state.course;
    var checked = this.state.checked;

    if ((course.semester === this.state.semester) && (course.period && this.state.period)){
      checked = true;
    }
    this.setState({checked})
  }

  


  render() {
    return <input
      name="checkbox"
      type="checkbox"
      checked={this.state.checked}
      onChange={this.handleInputChange}
      />;
  }
}

export default Checkbox;
