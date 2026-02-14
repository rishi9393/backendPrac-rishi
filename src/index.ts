import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8000 });

wss.on("connection", function (socket) {
  console.log("socket Connected");
  setInterval(() => {
    socket.send("raja dhar");
  }, 5000);

  socket.on("message", (e) => {
    console.log(e.toString());
  });
});
