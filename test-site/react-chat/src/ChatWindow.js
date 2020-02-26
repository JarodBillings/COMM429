import React, {Component} from "react"

class ChatWindow extends Component{
    constructor(props){
        super(props);
        this.chatStyle = {
            height: props.height,
            width: props.height
        }
        this.onMessage = this.onMessage.bind(this);
        this.onOpen = this.onOpen.bind(this);
    }

    onOpen(e){
        console.log("Connected to server");
        this.state.server.send(this.formatJSON({
            user: "Jarod",
            role: 1,
            connect: true
        }));
    }

    onMessage(event){
        this.setState((state) => {
            const newState = {...state};
            newState.clientMsgs.push(event.data);
            return newState;
        });
        console.log(this.state);
    }
    onClickButton(e){
        this.setState({
            server: new WebSocket("ws://localhost: 9876"),
            clientMsgs: []
        });
        this.state.server.onopen = this.onOpen;
        this.state.server.onmessage  = this.onMessage;
        console.log("Sent connection");
    }
    formatJSON(obj){
        return JSON.stringify(obj);
    }

    render(){
        return (
            <div style={this.chatStyle}>
                {
                        this.state.clientMsgs.map((val, index) =>{
                            return <div>{val}</div>
                        })

                }
                <button onClick={this.onClickButton}>Connect</button>
            </div>
        );
    }

}

export default ChatWindow;