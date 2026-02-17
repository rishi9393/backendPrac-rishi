import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8000 });

wss.on("connection", function (socket) {
  console.log("socket Connected");
  setInterval(() => {
    socket.send("Maje Maje");
  }, 5000);

  socket.on("message", (e) => {
    if (e.toString() === "Maje Maje") {
      socket.send("salami de raja ");
    }
  });
});
