import React, { Component } from "react";
import LeanCanvas from "../components/LeanCanvas";

class Lean extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <main>
        <nav>
          <h1>Computer Value NZ</h1>
        </nav>
        <main>
          <LeanCanvas />
        </main>
      </main>
    );
  }
}

export default Lean;
