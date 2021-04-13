import React, { Component } from "react";

class LeanCanvasLargeBox extends Component {
  constructor(props) {
    super();
    this.state = {
      listItems: [],
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
        <input
          className="plus"
          autoFocus
          onBlur={() => this.unselectAddButton()}
          onChange={this.updateText}
        ></input>
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

  render() {
    return (
      <div className={`canvas-box`} style={{ gridArea: this.props.grid }}>
        <h2>{this.props.title}</h2>
        <div className="list">{this.state.button}</div>
      </div>
    );
  }
}

export default LeanCanvasLargeBox;
