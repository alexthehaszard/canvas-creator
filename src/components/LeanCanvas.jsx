import React, { Component } from "react";
import LeanCanvasBox from "./LeanCanvasBox";
import firebase from "firebase";
import { debounce } from "debounce";

class LeanCanvas extends Component {
  constructor(props) {
    super(props);

    // Initiate all of the different strings in the state
    this.state = {
      p: "",
      tm: "",
      s: "",
      ea: "",
      sc: "",
      uvp: "",
      ca: "",
      c: "",
      rs: "",
      showingTut: "none",
      pZindex: "",
      title: this.props.title,
    };

    // Connect to the Firebase Realtime Database
    !firebase.apps.length
      ? firebase.initializeApp({
          apiKey: process.env.REACT_APP_API_KEY,
          authDomain: process.env.REACT_APP_AUTH_DOMAIN,
          databaseURL: process.env.REACT_APP_DATABASE_URL,
          storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        })
      : firebase.app();

    // Create a reference for all of the different elements to get callbacks from
    this.p = React.createRef();
    this.tm = React.createRef();
    this.s = React.createRef();
    this.ea = React.createRef();
    this.sc = React.createRef();
    this.uvp = React.createRef();
    this.ca = React.createRef();
    this.c = React.createRef();
    this.rs = React.createRef();

    // Bind the callback function to the component
    this.callbackFunction = this.callbackFunction.bind(this);
  }

  updateBoxes = () => {
    // Update all of the boxes from new database information
    this.p.current.updateFromDB(this.state.p);
    this.tm.current.updateFromDB(this.state.tm);
    this.s.current.updateFromDB(this.state.s);
    this.ea.current.updateFromDB(this.state.ea);
    this.sc.current.updateFromDB(this.state.sc);
    this.uvp.current.updateFromDB(this.state.uvp);
    this.ca.current.updateFromDB(this.state.ca);
    this.c.current.updateFromDB(this.state.c);
    this.rs.current.updateFromDB(this.state.rs);
  };

  getCanvasData = () => {
    console.log(this.props.id);
    // Instantiate a connection to the database, and get live information from it
    let ref = firebase.database().ref(`/${this.props.id}/`);
    ref.on("value", (snapshot) => {
      const state = snapshot.val();
      this.setState(state);
      this.updateBoxes();
      this.callbackTitle();
    });
  };

  writeCanvasData = () => {
    // Write information to the database when it is updated
    firebase.database().ref(`/${this.props.id}/`).set(this.state);
  };

  componentDidMount = () => {
    // When the component is mounted, start getting information from the database
    this.getCanvasData();
  };

  callbackFunction = (data, key, showTut) => {
    if (!showTut) {
      /* When information is received from the individual elements, 
      update the state and send the information to the database */
      this.setState({
        [key]: data,
      });
      this.writeCanvasData();
    } else {
      if (showTut === "p") {
        this.showProblemTutorial();
      }
    }
  };

  updateTitle = (value) => {
    console.log(this.state.title, value.target.value);
    this.setState({
      title: value.target.value,
    });
    this.debounceTitle();
    console.log(this.state.title);
  };

  debounceTitle = debounce(() => this.writeCanvasData(), 5000);

  callbackTitle = () => {
    // When the title is updated in the database, send it back to the "Lean" component
    this.props.parentCallback(this.state.title);
  };

  showProblemTutorial = () => {
    this.setState({
      pZindex: "zindex-top",
      showingTut: "initial",
      blurbText:
        "This is where you can put some problems that people have in their lives that your product idea can solve.",
    });
  };

  // All components need to be individually called as they all have individual requirements
  render() {
    return (
      <div className="lean-canvas">
        <div
          className="background-gray"
          style={{ display: this.state.showingTut }}
        >
          <p class="zindex-top blurb-text">{this.state.blurbText}</p>
        </div>
        <div className="lean-nav">
          <input value={this.state.title} onChange={this.updateTitle}></input>
        </div>
        <LeanCanvasBox
          name="p"
          title="Problem"
          grid="large-1"
          zindex={this.state.pZindex}
          parentCallback={this.callbackFunction}
          ref={this.p}
        />
        <LeanCanvasBox
          name="tm"
          title="Target Market"
          grid="large-2"
          parentCallback={this.callbackFunction}
          ref={this.tm}
        />
        <LeanCanvasBox
          name="s"
          title="Solution"
          grid="large-3"
          parentCallback={this.callbackFunction}
          ref={this.s}
        />
        <LeanCanvasBox
          name="ea"
          title="Existing Alternatives"
          grid="small-1"
          parentCallback={this.callbackFunction}
          ref={this.ea}
        />
        <LeanCanvasBox
          name="sc"
          title="Sales Channels"
          grid="small-2"
          parentCallback={this.callbackFunction}
          ref={this.sc}
        />
        <LeanCanvasBox
          name="uvp"
          title="Unique Value Proposition"
          grid="small-3"
          parentCallback={this.callbackFunction}
          ref={this.uvp}
        />
        <LeanCanvasBox
          name="ca"
          title="Competitive Advantage"
          grid="small-4"
          parentCallback={this.callbackFunction}
          ref={this.ca}
        />
        <div
          style={{
            gridArea: "bar",
            width: "100%",
            backgroundColor: "#bdd0e2",
            borderRadius: "10px",
          }}
        ></div>
        <LeanCanvasBox
          name="c"
          title="Costs"
          grid="wide-1"
          parentCallback={this.callbackFunction}
          ref={this.c}
        />
        <LeanCanvasBox
          name="rs"
          title="Revenue Streams"
          grid="wide-2"
          parentCallback={this.callbackFunction}
          ref={this.rs}
        />
      </div>
    );
  }
}

export default LeanCanvas;
