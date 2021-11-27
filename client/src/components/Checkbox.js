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
    this.onClickFunc = this.onClickFunc.bind(this);
  }

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
