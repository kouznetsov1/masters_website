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

    this.onChange = this.onChange.bind(this);
    this.onClickFunc = this.onClickFunc.bind(this);
  }

  onChange() {
    /*
    if ((course.semester === this.state.semester) && (course.period && this.state.period)){
      checked = true;
    }*/
    this.setState({checked: true})
  }

  /*
  handleInputChange() {
    const course = this.state.course;
    var checked = this.state.checked;

    if ((course.semester === this.state.semester) && (course.period && this.state.period)){
      checked = true;
    }
    this.setState({checked})
  }*/

  onClickFunc(){
    this.setState(prevState => ({checked: !prevState.checked}));
    console.log();
  }

  render() {
    return <input
      name="checkbox"
      type="checkbox"
      checked={this.state.checked}
      onChange={this.handleInputChange}
      //onClick={() => this.setState(prevState => ({checked: !prevState.checked}))}
      onClick={this.onClickFunc}
      />;
  }
}

export default Checkbox;
