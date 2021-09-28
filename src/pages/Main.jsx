import React, { Component } from "react";
import { Link } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previous: { text: "", id: "" },
    };
  }

  componentDidMount = () => {
    this.getPreviousCanvasID();
  };

  getPreviousCanvasID = () => {
    const id = localStorage.getItem("canvasID");
    console.log(id);
    if (id) {
      this.setState({
        previous: { text: "Edit your previously used Lean Canvas", id: id },
      });
    }
  };

  render() {
    return (
      <>
        <main className="home">
          <div className="blurb intro">
            <div className="blurb-title">
              <h1>Canvas Creator</h1>
            </div>
            <h1>
              A Lean Canvas is a quick way to map out your product idea and
              business model on one page. <br />
              It gets you thinking about your product and your business from the
              point of view of your customer.
            </h1>
          </div>
          <div className="blurb lean">
            <h1>Create or Edit your Lean Canvas</h1>
            <div className="main-link-wrapper">
              <Link to="/lean/" className="main-link">
                Create new Lean Canvas
              </Link>
            </div>
            <br />
            <Link to={`/lean/${this.state.previous.id}`} className="main-link">
              {this.state.previous.text}
            </Link>
          </div>
        </main>
      </>
    );
  }
}

export default Main;
