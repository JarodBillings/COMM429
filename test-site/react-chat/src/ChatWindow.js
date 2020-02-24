import react, {Component} from "react"

class ChatWindow extends Component{
    constructor(props){
        super(props);
        this.chatStyle = {
            height: props.height,
            width: props.height
        }

        this.onMessage(event) = this.onMessage.bind(this);
    }

    render(){
        return (
            <div style={this.chatStyle}>
            </div>
        );
    }

}

export default ChatWindow;