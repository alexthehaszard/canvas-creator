import React, { Component } from "react";
import LeanCanvasSmallBox from "./LeanCanvasSmallBox";
import LeanCanvasLargeBox from "./LeanCanvasLargeBox";
import LeanCanvasWideBox from "./LeanCanvasWideBox";

class LeanCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="lean-canvas">
        <LeanCanvasLargeBox title="Problem" grid="large-1" />
        <LeanCanvasLargeBox title="Target Market" grid="large-2" />
        <LeanCanvasLargeBox title="Solution" grid="large-3" />
        <LeanCanvasSmallBox title="Existing Alternatives" grid="small-1" />
        <LeanCanvasSmallBox title="Sales Channels" grid="small-2" />
        <LeanCanvasSmallBox title="Unique Value Proposition" grid="small-3" />
        <LeanCanvasSmallBox title="Competitive Advantage" grid="small-4" />
        <LeanCanvasWideBox title="Costs" grid="wide-1" />
        <LeanCanvasWideBox title="Revenue Streams" grid="wide-2" />
      </div>
    );
  }
}

export default LeanCanvas;
