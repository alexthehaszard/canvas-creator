import React, { Component } from "react";

class LeanCanvasBox extends Component {
  constructor(props) {
    super();
    this.state = {
      listItems: [],
      over: "none",
      button: (
        <button className="plus" onClick={() => this.addListItem()}>
          +
        </button>
      ),
      inputText: "",
    };
    this.updateText = this.updateText.bind(this);
  }

  addListItem() {
    this.setState({
      button: (
        <textarea
          className="plus"
          autoFocus
          onBlur={() => this.unselectAddButton()}
          onChange={this.updateText}
          style={{ maxHeight: this.props.h + "vh" }}
        ></textarea>
      ),
    });
  }

  updateText(event) {
    this.setState({
      inputText: event.target.value,
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
          <div style={{ display: this.state.over, width: "100%" }}>
            {this.state.button}
          </div>
        </div>
      </div>
    );
  }
}

export default LeanCanvasBox;
