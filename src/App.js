import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    counter: (new Date()).getSeconds(),
    users: []
  }

  userData =  [["Desmond", "Strickland", "Fishery"],
                   ['Thaddeus','Galvan','Professional Training & Coaching'],
                   ['Lamont','Friedman','Automotive'],
                   ['Martin','Holland','Information Technology and Services'],
                   ['Nancy','Carr','Information Technology and Services'],
                   ['Graham','Norris',' Ceramics & Concrete'],
                   ['Royce','Lester','Veterinary'],
                   ['Emily','Herman','Alternative Dispute Resolution'],
                   ['Odessa','Clay','Warehousing'],
                   ['Enid','Castaneda','Airlines/Aviation'],
                   ['Mara','Schultz','Facilities Services'],
                   ['Romeo','Navarro','Information Technology and Services'],
                   ['Jess','Clay','Banking'],
                   ['Aimee','Guerrero','Biotechnology'],
                   ['Dino','Payne','Computer Games'],
                   ['Susie','Velasquez','Nanotechnology'],
                   ['Velma','Walton','Restaurants'],
                   ['Rosario','Cook','Professional Training & Coaching'],
                   ['Maximo','Morgan','Transportation/Trucking/Railroad'],
                   ['Bettye','Sandoval','Tobacco'],
                   ['Eve','Malone','Judiciary'],
                   ['Daryl','Carney','Real Estate'],
                   ['Britney','Pennington','Recreational Facilities and Services'],
                   ['Phyllis','Chung','International Affairs']]

  componentWillMount() {
    this.userData.slice(this.state.counter % this.userData.length, this.state.counter % this.userData.length + 6).forEach(function(user, index) {
      this.state.users.push(
        <figure key={index}> {this.userHtml(user[0], user[1], user[2])}</figure>
      );
    }.bind(this));
  }

  componentDidMount() {
    setInterval(() => this.updateCounter(), 1000);
  }

  updateCounter() {
    var currentOffset = this.state.counter % this.userData.length;

    var newUsers = this.state.users.slice(1);

    newUsers.push(
      <figure key={currentOffset}> {this.userHtml(this.userData[currentOffset][0], this.userData[currentOffset][1], this.userData[currentOffset][2])} </figure>
    );

    this.setState({
      counter: (new Date()).getSeconds(),
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

  render() {
    return (
      <div id="attendee-drawing-overlay" className="overlay" style={{width: "100%"}}>
        <a href="javascript:void(0)" className="closebtn" style={{zIndex: "1000"}} >&times;</a>

        <div className="overlay-content container" style={{marginTop: "15%"}}>
            <div className="col-md-12 col-lg-8 col-lg-offset-2" id="carousel-wrapper">
                <div id="carousel" style={{"WebkitTransform": "rotateX(" + this.state.counter * -60 + "deg)"}}>
                  {this.state.users}
                </div>
            </div>

            <div className="col-md-12 col-lg-8 col-lg-offset-2" style={{textAlign: "center", marginTop: "22%", marginBottom: "5%"}}>
                <button id="start-stop-button" className="start-stop-button">
                    SPIN
                </button>
            </div>
        </div>
    </div>
    );
  }
}

export default App;
