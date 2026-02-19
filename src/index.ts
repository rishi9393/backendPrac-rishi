import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8000 });

let count = 0;
// let allSockets: WebSocket[] = [];

interface User {
  socket: WebSocket;
  room: string;
}

let allSockets: User[] = [];

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    const parseMessage = JSON.parse(message);
    if (parseMessage.type == "join") {
      allSockets.push({
        socket,
        room: parseMessage.payload.roomId,
      });
    }

    if (parseMessage.type == "chat") {
      // const currentUerRoom =  allSockets.find((x)=> x.socket == socket).room
      let currentUerRoom = null;
      for (let i = 0; i < allSockets.length; i++) {
        if(allSockets[i].socket == socket){
            currentUerRoom = allSockets[i].room;
        }
      }
    }
  });

  socket.on("disconnect", () => {
    allSockets = allSockets.filter((x) => x != socket);
  });

  // allSockets.push(socket);

  // count = count + 1;
  // console.log("the server is connected : and the count is : " + count);

  // socket.on("message", (message) => {
  //   console.log("message received" + message.toString());
  //   for (const s of allSockets) {
  //     s.send(message.toString() + ": send from the server ");
  //   }
  //   setTimeout(() => {
  //     socket.send(message.toString() + " " + "message from server sended");
  //   }, 1000);
  // });
});
