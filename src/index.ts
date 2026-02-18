import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8000 });

let count = 0;
let allSockets = [];

wss.on("connection", (socket) => {
  allSockets.push(socket);

  count = count + 1;
  console.log("the server is connected : and the count is : " + count);

  socket.on("message", (message) => {
    console.log("message received" + message.toString());
    for(let i = 0 ; i < allSockets.length;i++ ){
      const s =  allSockets[i];
       s?.send(message  )
    }
    setTimeout(() => {
      socket.send(message.toString() +" "+  "message from server sended");
    },1000);
  });
});
