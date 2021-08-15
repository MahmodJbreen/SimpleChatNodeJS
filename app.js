const express = require('express');

var http = require("http");
var fs = require("fs");

const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// Setup basic express server


app.use(express.static(path.join(__dirname, 'public')));



server.listen(3000);



io.on('connection', (socket) => {
 console.log("user connect sochet");
 socket.on("disconnect",function (){
    console.log("disconnected");
 });



 socket.on('chat message',function(msg){

    console.log(msg);
    io.emit('get message',{'usermsg' :msg.usermsg,'user':msg.user});
 });

 socket.on('isTyping',function(msg){
 console.log(msg);
   
    io.emit('isTyping',msg);
 });
 socket.on('StopTyping',function(msg){
 console.log(msg);
    io.emit('StopTyping',msg);
 });

  });