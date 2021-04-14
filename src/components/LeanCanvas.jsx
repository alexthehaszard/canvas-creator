import React, { Component } from "react";
import LeanCanvasBox from "./LeanCanvasBox";

class LeanCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="lean-canvas">
        <LeanCanvasBox title="Problem" grid="large-1" h="45" />
        <LeanCanvasBox title="Target Market" grid="large-2" h="45" />
        <LeanCanvasBox title="Solution" grid="large-3" h="45" />
        <LeanCanvasBox title="Existing Alternatives" grid="small-1" h="18" />
        <LeanCanvasBox title="Sales Channels" grid="small-2" h="18" />
        <LeanCanvasBox title="Unique Value Proposition" grid="small-3" h="18" />
        <LeanCanvasBox title="Competitive Advantage" grid="small-4" h="18" />
        <LeanCanvasBox title="Costs" grid="wide-1" h="18" />
        <LeanCanvasBox title="Revenue Streams" grid="wide-2" h="18" />
      </div>
    );
  }
}

export default LeanCanvas;
