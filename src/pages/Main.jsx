import React, { Component } from "react";
import { Link } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <main className="home">
          <div className="blurb intro">
            <div className="blurb-title">
              <h1>Canvas Creator</h1>
            </div>
            <h1>
              These tools are designed to assist entrepreneurs to create a solid
              foundation for a business idea, and lead them into the next step
              of the process.
            </h1>
          </div>
          <div className="blurb lean">
            <h1>The Lean Canvas can help flesh out your business idea.</h1>
            <Link to="/lean/">Create new lean canvas</Link>
          </div>
          <div className="blurb unique"></div>
        </main>
      </>
    );
  }
}

export default Main;
