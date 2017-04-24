import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UploadIcon from 'react-icons/lib/fa/cloud-upload';
import Dropzone from 'react-dropzone';

class App extends Component {

  state = {
    counter: 0,
    fullData: [],
    users: [],
    spin: false,
    interval: null
  }

  // userData =  [["Desmond", "Strickland", "Fishery"],
  //                  ['Thaddeus','Galvan','Professional Training & Coaching'],
  //                  ['Lamont','Friedman','Automotive'],
  //                  ['Martin','Holland','Information Technology and Services'],
  //                  ['Nancy','Carr','Information Technology and Services'],
  //                  ['Graham','Norris',' Ceramics & Concrete'],
  //                  ['Royce','Lester','Veterinary'],
  //                  ['Emily','Herman','Alternative Dispute Resolution'],
  //                  ['Odessa','Clay','Warehousing'],
  //                  ['Enid','Castaneda','Airlines/Aviation'],
  //                  ['Mara','Schultz','Facilities Services'],
  //                  ['Romeo','Navarro','Information Technology and Services'],
  //                  ['Jess','Clay','Banking'],
  //                  ['Aimee','Guerrero','Biotechnology'],
  //                  ['Dino','Payne','Computer Games'],
  //                  ['Susie','Velasquez','Nanotechnology'],
  //                  ['Velma','Walton','Restaurants'],
  //                  ['Rosario','Cook','Professional Training & Coaching'],
  //                  ['Maximo','Morgan','Transportation/Trucking/Railroad'],
  //                  ['Bettye','Sandoval','Tobacco'],
  //                  ['Eve','Malone','Judiciary'],
  //                  ['Daryl','Carney','Real Estate'],
  //                  ['Britney','Pennington','Recreational Facilities and Services'],
  //                  ['Phyllis','Chung','International Affairs']]

  figureUserData = []

  componentWillUpdate(nextProps, nextState) {
    if(this.state.fullData.length !== nextState.fullData.length) {
      if(this.state.interval)
        clearInterval(this.state.interval);
      this.figureUserData = [];
      nextState.fullData.forEach(function(user, index) {
        this.figureUserData.push(
          <figure key={index}> {this.userHtml(user[0], user[1], user[2])}</figure>
        );
      }.bind(this));
      this.setState({
        users: this.figureUserData.slice(0, 6),
        interval: setInterval(() => this.updateCounter(), 1000)
      })
    }
  }

  updateCounter() {
    var currentOffset = this.state.counter % this.state.fullData.length;
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
      this.state.interval = setInterval(() => this.updateCounter(), 50);
    } else {
      clearInterval(this.state.interval);
      // this.state.interval = setInterval(() => this.updateCounter(), 1000);
      this.setState({spin: false});
    }
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
        }.bind(this));
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
