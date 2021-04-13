import React, { Component } from "react";

class LeanCanvasLargeBox extends Component {
  constructor(props) {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className={`canvas-box`} style={{ gridArea: this.props.grid }}>
        <h2>{this.props.title}</h2>
      </div>
    );
  }
}

export default LeanCanvasLargeBox;
