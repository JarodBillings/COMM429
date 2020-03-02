import React, { Component } from "react"

class ChatWindow extends Component {
    constructor(props) {
        super(props);
        this.chatStyle = {
            height: props.height,
            width: props.height
        }

        this.onMessage = this.onMessage.bind(this);
        this.onOpen = this.onOpen.bind(this);
        let server = new WebSocket("ws://localhost:9876");
        let clientMsgs = []
        server.onopen = this.onOpen;
        server.onmessage = this.onMessage;
        this.state = {
            server: server,
            clientMsgs: clientMsgs
        }

        this.onChange = this.onChange.bind(this);
        this.send = this.send.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        console.log("Sent connection");
    }

    onOpen(e) {
        console.log("Connected to server");
        this.state.server.send(this.formatJSON({
            user: this.props.username,
            role: 1,
            connect: true
        }));
    }

    send(msg) {
        if (msg !== "") {


            this.state.server.send(this.formatJSON({
                user: this.props.username,
                role: 1,
                text: msg
            }));
            this.setState({
                msg: ""
            })
        }
    }

    onMessage(event) {
        this.setState((state) => {
            const newState = { ...state };
            newState.clientMsgs.push(event.data);
            return newState;
        });
        console.log(this.state);
    }

    onChange(e) {
        this.setState({
            msg: e.target.value
        });
    }


    onKeyPress(e) {
        if (e.key === "Enter") {
            this.send(this.state.msg)
        }
    }

    formatJSON(obj) {
        return JSON.stringify(obj);
    }

    render() {
        console.log(this.state)
        return (
            <div style={this.chatStyle}>
                {

                    this.state !== null ? (
                        this.state.clientMsgs.map((val, index) => {
                            return <div>{val}</div>
                        })
                    ) :
                        (<div></div>)
                }
                <input type="text" onKeyDown={this.onKeyPress} onChange={this.onChange} value={this.state.msg}></input>
            </div>

        );
    }

}

export default ChatWindow;