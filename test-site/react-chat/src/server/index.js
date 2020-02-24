let  WebSocketServer = require('ws').server;
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
    autoAcceptConnections: false
});

wsServer.on("connection", (ws) => {
    wsServer.on("message", (msg) => {
        const userMsg = JSON.parse(msg);
        console.log(`${msg.user} (${msg.role}) sent ${msg.text}`);
    });
    ws.send(JSON.stringify({
        role: -1,
        user: "server",
        text: "Connected to Server"
    }));
});