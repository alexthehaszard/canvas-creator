import React, { Component } from "react";
import LeanCanvas from "../components/LeanCanvas";
import { debounce } from "debounce";

class Lean extends Component {
  constructor(props) {
    super(props);

    this.lean = React.createRef();

    this.state = {
      title: "untitled",
    };
  }

  updateTitle = (value) => {
    this.setState({
      title: value.target.value,
    });
    console.log("trying to send");
    this.sendUpdatedTitle();
  };

  sendUpdatedTitle = debounce(() => this.lean.current.writeCanvasData(), 1000);

  callbackFunction = (title) => {
    this.setState({
      title: title,
    });
  };

  render() {
    return (
      <main>
        <nav>
          <input value={this.state.title} onChange={this.updateTitle}></input>
        </nav>
        <main>
          <LeanCanvas
            title={this.state.title}
            parentCallback={this.callbackFunction}
            ref={this.lean}
          />
        </main>
      </main>
    );
  }
}

export default Lean;
