import React, { Component } from "react";
import LeanCanvas from "../components/LeanCanvas";

class Lean extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <nav>
          <h1>Lean Canvas</h1>
        </nav>
        <main>
          <LeanCanvas />
        </main>
      </>
    );
  }
}

export default Lean;
