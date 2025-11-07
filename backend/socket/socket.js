import http from "http"
import express from "express"
import { Server } from "socket.io"

let app = express()

const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173"
    }
})
 const userSocketMap ={}
 export const getReceiverSocketId=(receiver)=>{
    return userSocketMap[receiver]
 }
io.on("connection",(socket)=>{
  const userId=socket.handshake.query.userId
  if(userId!=undefined){
    userSocketMap[userId]=socket.id
  }
  io.emit("getOnlineUsers",Object.keys(userSocketMap))

socket.on("disconnect",()=>{
  delete userSocketMap[userId]  
 io.emit("getOnlineUsers",Object.keys(userSocketMap))

})
   
})



export {app,server,io}


// frontend/src/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";
export const socket = io(SOCKET_URL, { withCredentials: true });

// optionally export default
export default socket;
