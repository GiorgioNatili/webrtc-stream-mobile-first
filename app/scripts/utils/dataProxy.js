'use strict'
var connector  = (function(){

  var socket;

  var connect = function (cameraIp){

    socket = parent.io.connect(cameraIp + '/liveview.JPG?%211234%21http-get%3a%2a%3aimage%2fjpeg%3a%2a%21%21%21%21%21');

    socket.on('welcome', function(data) {
      $('.lead').append('<li>' + data.message + '</li>');

      socket.emit('i am client', {data: 'foo!'});
    });

    socket.on('time', function(data) {
      console.log(data);
      $('.lead').append('<li>' + data.time + '</li>');
    });

    socket.on('error', function() { console.error(arguments) });
    socket.on('message', function() { console.log(arguments) });

  };

  var close = function(){

    if(socket){

      socket.close();

    }

  };

  return {
    connect: connect,
    close: close    
  }

  }());

