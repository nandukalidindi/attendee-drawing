import React, { Component } from 'react';
import './App.css';
import UploadIcon from 'react-icons/lib/fa/cloud-upload';
import Dropzone from 'react-dropzone';

import User from './User.js';

const sampleData = [
  [
    "Monkey D ",
    "Luffy",
    "Captain @Straw Hat Pirates"
  ],
  [
    "Roronoa",
    "Zoro",
    "Swordsman @Straw Hat Pirates"
  ],
  [
    "Sanji ",
    "Vinsmoke",
    "Chef @Straw Hat Pirates"
  ],
  [
    "Nami",
    "",
    "Navigator @Straw Hat Pirates"
  ],
  [
    "Portgas D ",
    "Ace",
    "Commander @Whitebeard Pirates"
  ],
  [
    "Aokiji",
    "",
    "Admiral @Navy"
  ],
  [
    "Akainu",
    "",
    "Adminra @Navy"
  ],
  [
    "Trafalgar",
    "Law",
    "Captain @Heart Pirates"
  ],
  [
    "Doflamingo",
    " Alias Broker",
    "Former Shichibukai @Navy"
  ]
]

class App extends Component {

  state = {
    counter: 0,
    fullData: sampleData,
    users: [],
    spin: false,
    interval: null,
    timeout: null
  }

  figureUserData = []

  // componentDidMount() {
  //   this.interval = setInterval(this.updateCounter, 1000);
  // }

  componentWillMount() {
    // if(this.state.fullData.length !== nextState.fullData.length) {
      if(this.state.interval)
        clearInterval(this.interval);

      this.figureUserData = [];
      this.state.fullData.forEach(function(user, index) {
        this.figureUserData.push(
          <figure key={index}> <User firstName={user[0]} lastName={user[1]} info={user[2]} /> </figure>
        );
      }.bind(this));

      this.state.users = this.figureUserData.slice(0, 6);
      this.state.interval = setInterval(() => this.updateCounter(), 1000)
      // this.setState({
      //   users: this.figureUserData.slice(0, 6),
      //   interval: setInterval(() => this.updateCounter(), 1000)
      // })
    // }
  }

  updateCounter() {
    var newUsers = this.figureUserData.slice(this.state.counter % this.state.fullData.length, (this.state.counter % this.state.fullData.length) + 6);

    if((this.state.counter % this.state.fullData.length) + 6 > this.state.fullData.length) {
      for(var i=0; i < ((this.state.counter % this.state.fullData.length) + 6) % this.state.fullData.length; i++) {
        newUsers.push(this.figureUserData[i]);
      }
    }

    this.setState({
      counter: this.state.counter + 1,
      users: newUsers
    })
  }

  userHtml(firstName, lastName, info) {
    return (
      <div className="user-drawing-element-div">
        <p>
          {firstName + lastName}
        </p>
        <p>
          {info}
        </p>
      </div>
    )
  }

  toggleSpin(event) {
    if(event.target.innerText === "SPIN") {
      this.state.spin = true;
      clearInterval(this.state.interval);
      clearTimeout(this.state.timeout);
      this.state.interval = setInterval(() => this.updateCounter(), 50);
    } else {
      clearInterval(this.state.interval);
      clearTimeout(this.state.timeout);
      this.state.timeout = setTimeout(function() {
        this.state.interval = setInterval(() => this.updateCounter(), 1000);
      }.bind(this), 2000);
      this.setState({spin: false});
    }
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout);
    clearInterval(this.state.interval);
  }

  onDrop(files) {
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) {
        var textFromFileLoaded = fileReader.result;
        var userDetails = [];
        textFromFileLoaded.split("\n").forEach(function(line, index) {
          if(index !== 0 && line !== "") {
            var splitter = line.split(",");
            userDetails.push([splitter[0], splitter[1], splitter[2]]);
          }
        });
        this.setState({fullData: userDetails});
    }.bind(this);

    fileReader.readAsBinaryString(files[0]);
  }

  render() {
    return (
      <div id="attendee-drawing-overlay" className="overlay" style={{width: "100%"}}>
        <Dropzone accept={".csv"} style={{width: "100px", height: "100px", float: "right"}} onDrop={this.onDrop.bind(this)}>
          <UploadIcon width="100px" height="100px"/>
        </Dropzone>
        <div className="overlay-content container" style={{marginTop: "15%"}}>
            <div className="col-md-12 col-lg-8 col-lg-offset-2" id="carousel-wrapper">
                <div id="carousel" style={{"WebkitTransform": "rotateX(" + (this.state.spin ? "60" : "-60") + "deg)"}}>
                  {this.state.users}
                </div>
            </div>

            <div className="col-md-12 col-lg-8 col-lg-offset-2" style={{textAlign: "center", marginTop: "15%", marginBottom: "5%"}}>
                <button id="start-stop-button" className="start-stop-button" onClick={this.toggleSpin.bind(this)}>
                  {this.state.spin ? "STOP" : "SPIN"}
                </button>
            </div>
        </div>
    </div>
    );
  }
}

export default App;
