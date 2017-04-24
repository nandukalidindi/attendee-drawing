import React, { Component } from 'react';
import './User.css';

class User extends Component {
  render() {
    return (
      <div className="user-drawing-element-div">
        <p> {this.props.firstName + this.props.lastName} </p>
        <p> {this.props.info} </p>
      </div>
    );
  }
}

export default User;
