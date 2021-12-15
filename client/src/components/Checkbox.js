import React, { useEffect } from "react";

class Checkbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: this.props.course,
      semester: this.props.semester,
      period: this.props.period,
      checked: false,
      checkedElsewhere: false,
    };
    this.onClickFunc = this.onClickFunc.bind(this);
  }

  onClickFunc(){
    this.setState(prevState => ({checked: !prevState.checked}));
    this.checkDynValues();
  }

  checkDynValues() {
    const course = this.state.course;
    const currSemester = this.state.semester;
    const currPeriod = this.state.period;

    for (let i = 0; i < course.dynamic_values.length; i++) {
      const dynValues = course.dynamic_values[i];
      if (dynValues.period === currPeriod && dynValues.semester === currSemester){
        course.dynamic_values[i].checked_here = true;
      }
    };

  }

  render() {
    return <input
      name="checkbox"
      type="checkbox"
      checked={this.state.checked}
      onChange={this.handleInputChange}
      onClick={this.onClickFunc}
      />;
  }
}

export default Checkbox;
