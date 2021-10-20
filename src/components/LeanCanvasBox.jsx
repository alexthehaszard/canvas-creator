import React, { Component } from "react";

class LeanCanvasBox extends Component {
  constructor(props) {
    super(props);
    let i = "";
    let b = (
      <textarea
        onChange={this.updateText}
        onKeyUp={this.sendToDB}
        value={i}
      ></textarea>
    );
    let o = "flex";

    this.state = {
      over: o,
      button: b,
      inputText: i,
    };
    this.updateText = this.updateText.bind(this);
  }

  updateFromDB = (text) => {
    this.setState({
      inputText: text,
    });
    this.updateButton(text);
  };

  addListItem = (text) => {
    this.setState({
      button: (
        <textarea
          onChange={this.updateText}
          onKeyUp={this.callbackToParent}
        ></textarea>
      ),
    });
  };

  updateText = (event) => {
    this.setState({
      inputText: event.target.value,
    });
    this.updateButton(event.target.value);
  };

  sendToDB = () => {
    this.props.parentCallback(this.state.inputText, this.props.name);
  };

  updateButton = (text) => {
    let b = (
      <textarea
        onChange={this.updateText}
        onKeyUp={this.sendToDB}
        value={text}
      ></textarea>
    );
    this.setState({
      button: b,
    });
  };

  render() {
    return (
      <div
        className={`canvas-box ${this.props.zindex}`}
        style={{ gridArea: this.props.grid }}
        // onMouseEnter={() => this.mouseOver()}
        // onMouseLeave={() => this.mouseOff()}
      >
        <div className="canvas-box-header">
          <h3>{this.props.title}</h3>
          <button
            onClick={() =>
              this.props.parentCallback(null, null, this.props.name)
            }
            title="Help"
            className="canvas-box-tut"
          >
            ?
          </button>
        </div>
        <div className="list">
          <div
            style={{
              display: this.state.over,
              width: "100%",
              flexWrap: "true",
              height: "100%",
            }}
          >
            {this.state.button}
          </div>
        </div>
      </div>
    );
  }
}

export default LeanCanvasBox;
