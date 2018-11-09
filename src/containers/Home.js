import React, { Component } from "react";
import { API } from "aws-amplify";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      notes: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    //API call in constructor
    // try {
    //   const notes = await this.notes();
    //   this.setState({ notes });
    // } catch (e) {
    //   alert(e);
    // }

    this.setState({ isLoading: false });
  }

  // notes() {
  //   return API.get("notes", "/notes");
  // }

  renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
      </div>
    );
  }

  renderAuthHome() {
    return <div>Welcome to your logged in home!</div>;
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated
          ? this.renderAuthHome()
          : this.renderLander()}
      </div>
    );
  }
}
