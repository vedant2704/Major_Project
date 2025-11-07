import { socket } from "../socket";
useEffect(() => {
  socket.on("receiveMessage", (message) => {
    console.log("💬 New message received:", message);
  });

  return () => {
    socket.off("receiveMessage");
  };
}, []);

function sendMessage(msg) {
  socket.emit("sendMessage", msg);
}
