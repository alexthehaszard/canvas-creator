import React, { Component } from "react";
import LeanCanvas from "../components/LeanCanvas";
import { debounce } from "debounce";
import { withRouter } from "react-router";

class Lean extends Component {
  constructor(props) {
    super(props);

    this.lean = React.createRef();

    /* On load the title should start as Untitled, but will get a title
    from the database if one exists */
    this.state = {
      title: "Untitled",
      id: this.props.match.params.id,
    };
  }

  // When the title is changed locally, update the function
  updateTitle = (value) => {
    this.setState({
      title: value.target.value,
    });
    // Send an updated debounced version of the new title to the database
    this.sendUpdatedTitle();
  };

  /* Create an instance of the debounce function that will be called on change
  of the title */
  sendUpdatedTitle = debounce(() => this.lean.current.writeCanvasData(), 1000);

  // When a new title is received from the database, update the state
  callbackFunction = (title) => {
    this.setState({
      title: title,
    });
  };

  render() {
    return (
      <div>
        <main>
          <LeanCanvas
            title={this.state.title}
            id={this.state.id}
            parentCallback={this.callbackFunction}
            ref={this.lean}
            nav={
              <div className="lean-nav">
                <input
                  value={this.state.title}
                  onChange={this.updateTitle}
                ></input>
              </div>
            }
          />
        </main>
      </div>
    );
  }
}

export default withRouter(Lean);
