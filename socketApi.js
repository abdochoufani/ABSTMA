var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};
var Chat=require("./models/chat")

socketApi.io = io;


io.on('connection', function(socket){
    console.log('A user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
      });
});


io.on('connection', function(socket){
  Chat.find().toArray((err,result)=>{
    if(err){
      throw err
    }
    io.sockets.emit("chat message",msg)
  })
    socket.on('chat message', function(msg){
        debugger
        io.sockets.emit('chat message', msg);
            console.log(msg)
    });
  });


module.exports = socketApi;
