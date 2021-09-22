import React, { Component } from "react";
import LeanCanvasBox from "./LeanCanvasBox";
import firebase from "firebase";
import { debounce } from "debounce";

class LeanCanvas extends Component {
  constructor(props) {
    super(props);

    // Initiate all of the different strings in the state
    this.state = {
      p: ["", ""],
      tm: ["", ""],
      s: ["", ""],
      ea: ["", ""],
      sc: ["", ""],
      uvp: ["", ""],
      ca: ["", ""],
      c: ["", ""],
      rs: ["", ""],
      showingTut: "none",
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
    this.p.current.updateFromDB(this.state.p[0]);
    this.tm.current.updateFromDB(this.state.tm[0]);
    this.s.current.updateFromDB(this.state.s[0]);
    this.ea.current.updateFromDB(this.state.ea[0]);
    this.sc.current.updateFromDB(this.state.sc[0]);
    this.uvp.current.updateFromDB(this.state.uvp[0]);
    this.ca.current.updateFromDB(this.state.ca[0]);
    this.c.current.updateFromDB(this.state.c[0]);
    this.rs.current.updateFromDB(this.state.rs[0]);
  };

  getCanvasData = () => {
    console.log(this.props.id);
    localStorage.setItem("canvasID", this.props.id);
    // Instantiate a connection to the database, and get live information from it
    let ref = firebase.database().ref(`/${this.props.id}/`);
    ref.on("value", (snapshot) => {
      const state = snapshot.val();
      this.setState(state);
      this.updateBoxes();
      if (!localStorage.getItem("seenTutorial")) {
        localStorage.setItem("seenTutorial", true);
        this.showTutorial("p");
      }
    });
  };

  writeCanvasData = () => {
    console.log("sent");
    // Write information to the database when it is updated
    firebase.database().ref(`/${this.props.id}/`).set(this.state);
  };

  componentDidMount = () => {
    // When the component is mounted, start getting information from the database
    this.getCanvasData();
    console.log(localStorage.getItem("seenTutorial"));
  };

  callbackFunction = (data, key, showTut) => {
    if (!showTut) {
      let temp = [data, this.state[key][1]];
      /* When information is received from the individual elements, 
      update the state and send the information to the database */
      this.setState({
        [key]: temp,
      });
      this.debounceInformation();
    } else {
      this.showTutorial(showTut);
    }
  };

  updateTitle = (value) => {
    this.setState({
      title: value.target.value,
    });
    this.debounceInformation();
  };

  debounceInformation = debounce(() => this.writeCanvasData(), 2000);

  closeTutorial = () => {
    let state = this.state;
    state.p[1] = "";
    state.tm[1] = "";
    state.s[1] = "";
    state.ea[1] = "";
    state.sc[1] = "";
    state.uvp[1] = "";
    state.ca[1] = "";
    state.c[1] = "";
    state.rs[1] = "";
    state.showingTut = "none";
    state.blurbText = "";
    this.setState(state);
  };

  nextTutorial = () => {
    let keys = ["p", "tm", "s", "ea", "sc", "uvp", "ca", "c", "rs"];
    for (let i = 0; i < keys.length; i++) {
      if (this.state[keys[i]][1] === "zindex-top") {
        this.closeTutorial();
        if (i < keys.length - 1) this.showTutorial(keys[i + 1]);
        i = keys.length;
      }
    }
  };

  showTutorial = (key) => {
    let text = "";
    if (key === "p") {
      text =
        "This is where you can put problems that your product idea can solve.";
    } else if (key === "tm") {
      text =
        "This is where you can put information about the people that will use your product. Age, location, occupation etc.";
    } else if (key === "s") {
      text =
        "This is where you put ideas for solutions to the problems your target market faces.";
    } else if (key === "ea") {
      text =
        "This is where you can put existing alternatives that already exist to solve your problems.";
    } else if (key === "sc") {
      text =
        "This is where you can put where you will be selling your product. Online store, retailers, door-to-door etc.";
    } else if (key === "uvp") {
      text =
        "This is where you put what makes your product unique, and will make it stand out from the existing alternatives.";
    } else if (key === "ca") {
      text =
        "This is where you put the advantage that you have over the existing alternatives of your product.";
    } else if (key === "c") {
      text =
        "This is where you put all of the costs that are associated with you business";
    } else if (key === "rs") {
      text =
        "This is where you list all of the money that is coming into the business";
    }
    let temp = this.state[key];
    temp[1] = "zindex-top";
    this.setState({
      [key]: temp,
      showingTut: "initial",
      blurbText: text,
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
          <div className="blurb-text">
            <p style={{ paddingRight: "10px" }}>{this.state.blurbText}</p>
            <button onClick={this.closeTutorial}>Close</button>
            <button onClick={this.nextTutorial}>Next</button>
          </div>
        </div>
        <div className="lean-nav">
          <input value={this.state.title} onChange={this.updateTitle}></input>
        </div>
        <LeanCanvasBox
          name="p"
          title="Problem"
          grid="large-1"
          zindex={this.state.p[1]}
          parentCallback={this.callbackFunction}
          ref={this.p}
        />
        <LeanCanvasBox
          name="tm"
          title="Target Market"
          grid="large-2"
          zindex={this.state.tm[1]}
          parentCallback={this.callbackFunction}
          ref={this.tm}
        />
        <LeanCanvasBox
          name="s"
          title="Solution"
          grid="large-3"
          zindex={this.state.s[1]}
          parentCallback={this.callbackFunction}
          ref={this.s}
        />
        <LeanCanvasBox
          name="ea"
          title="Existing Alternatives"
          grid="small-1"
          zindex={this.state.ea[1]}
          parentCallback={this.callbackFunction}
          ref={this.ea}
        />
        <LeanCanvasBox
          name="sc"
          title="Sales Channels"
          grid="small-2"
          zindex={this.state.sc[1]}
          parentCallback={this.callbackFunction}
          ref={this.sc}
        />
        <LeanCanvasBox
          name="uvp"
          title="Unique Value Proposition"
          grid="small-3"
          zindex={this.state.uvp[1]}
          parentCallback={this.callbackFunction}
          ref={this.uvp}
        />
        <LeanCanvasBox
          name="ca"
          title="Competitive Advantage"
          grid="small-4"
          zindex={this.state.ca[1]}
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
          zindex={this.state.c[1]}
          parentCallback={this.callbackFunction}
          ref={this.c}
        />
        <LeanCanvasBox
          name="rs"
          title="Revenue Streams"
          grid="wide-2"
          zindex={this.state.rs[1]}
          parentCallback={this.callbackFunction}
          ref={this.rs}
        />
      </div>
    );
  }
}

export default LeanCanvas;
