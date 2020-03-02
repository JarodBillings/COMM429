let  WebSocketServer = require('websocket').server;
const http = require('http');

let server = http.createServer((req, res) => {
    console.log("Invalid request to WSS server");
    res.writeHead(500);
    res.end();
});

server.listen(9876, () =>{
    console.log(`Server is starting on 9876`);
});

const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: true
});
var clients = [];
wsServer.on("connect", (ws) => {
    clients.push(ws);
    ws.on("message", (msg) => {
        const userMsg = JSON.parse(msg.utf8Data);
        console.log(userMsg);
        console.log(`${userMsg.user} (${userMsg.role}) sent ${userMsg.text}`);
        let msgText;
        if(userMsg.connect){
            msgText = `${userMsg.user} has connected!`;
        }else{
            const dateSent = new Date(Date.now());
            console.log(dateSent);
            msgText = `(${dateSent.getHours()}:${dateSent.getMinutes()}) ${userMsg.user}: ${userMsg.text}`         
        }
        clients.forEach((c) => {
            c.send(msgText) 
        })
    });
});
