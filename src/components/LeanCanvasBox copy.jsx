import React, { Component } from "react";
import TextareaAutosize from "react-textarea-autosize";

class LeanCanvasBox extends Component {
  constructor(props) {
    super(props);

    let b = (
        <button className="plus" onClick={() => this.addListItem()}>
          +
        </button>
      ),
      o = "none",
      i = "";

    i = localStorage.getItem(this.props.name);

    if (i) {
      b = (
        <TextareaAutosize
          className="plus"
          onBlur={() => this.unselectAddButton()}
          onChange={this.updateText}
          value={i}
        ></TextareaAutosize>
      );
      o = "flex";
    }
    this.state = {
      over: o,
      button: b,
      inputText: i,
    };
    this.updateText = this.updateText.bind(this);
  }

  addListItem(text) {
    this.setState({
      button: (
        <TextareaAutosize
          className="plus"
          autoFocus
          onBlur={() => this.unselectAddButton()}
          onChange={this.updateText}
        ></TextareaAutosize>
      ),
    });
  }

  updateText = (event) => {
    this.setState({
      inputText: event.target.value,
    });
    this.updateButton(event.target.value);
    localStorage.setItem(this.props.name, event.target.value);
  };

  updateButton(text) {
    let b = (
      <TextareaAutosize
        className="plus"
        onBlur={() => this.unselectAddButton()}
        onChange={this.updateText}
        value={text}
      ></TextareaAutosize>
    );
    this.setState({
      button: b,
    });
  }

  unselectAddButton() {
    if (!this.state.inputText) {
      this.setState({
        button: (
          <button className="plus" onClick={() => this.addListItem()}>
            +
          </button>
        ),
      });
    }
  }

  mouseOver() {
    console.log("over");
    this.setState({ over: "flex" });
  }

  mouseOff() {
    if (!this.state.inputText) {
      console.log("off");
      this.setState({ over: "none" });
    }
  }

  render() {
    return (
      <div
        className={`canvas-box`}
        style={{ gridArea: this.props.grid }}
        onMouseEnter={() => this.mouseOver()}
        onMouseLeave={() => this.mouseOff()}
      >
        <h3>{this.props.title}</h3>
        <div className="list">
          <div
            style={{
              display: this.state.over,
              width: "100%",
              flexWrap: "true",
            }}
            className="grow-wrap"
          >
            {this.state.button}
          </div>
        </div>
      </div>
    );
  }
}

export default LeanCanvasBox;
