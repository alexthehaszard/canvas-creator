import React, { Component } from "react";

class LeanCanvasWideBox extends Component {
  constructor(props) {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className={`canvas-box `} style={{ gridArea: this.props.grid }}>
        <h3>{this.props.title}</h3>
      </div>
    );
  }
}

export default LeanCanvasWideBox;