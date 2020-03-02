import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import ChatWindow from "./ChatWindow";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connect: false,
      error: '',
      username: ''
    }
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onClick() {
    if (this.state.username === "") {
      this.setState({
        error: "Username cannot be blank"
      })
    } else {
      this.setState({
        connect: true,
      });
    }
  }

  onChange(e) {
    this.setState({
      username: e.target.value
    });
  }
  render() {
    return (
      <div>
        {
          this.state.connect ? (
            <ChatWindow height={1000} width={1000} username={this.state.username} />
          ) : (
              <Fragment>
                <p id="username-text" style={{ display: "inline" }} >username: </p>
                <input type="text" value={this.state.username} onChange={this.onChange}></input>
                <button id="connect-button" onClick={this.onClick}>Connect</button>
                <h1>{this.state.error}</h1>
              </Fragment>
            )}

      </div>
    );
  }

}

export default App;