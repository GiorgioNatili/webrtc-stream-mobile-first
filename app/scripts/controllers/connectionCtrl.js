'use strict'
angular.module('webrtcStreamMobileFirstApp')
.controller('connectionCtrl', function ($scope) {

  var key;
  var signalingChannel;
  var weWaited;
  var pc, dc,
  doNothing = function() {},
  data = {},
  constraints = {mandatory: {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true}
  };

  $scope.connectionKey = 'kg-test-2015';
  $scope.log = 'Data will be displayed here...'

  var output = document.getElementById('output');


  console.log('connection controller', $scope);
  
  $scope.connect = function() {
    var errorCB, scHandlers, handleMsg;
    
    // First, get the key used to connect
    key = $scope.connectionKey;

    // This is the handler for all messages received on the
    // signaling channel.
    handleMsg = function (msg) {
      // First, we clean up the message and post it on-screen
      //  var msgE = document.getElementById("inmessages");
      var msgString = JSON.stringify(msg).replace(/\\r\\n/g,'\n');
     
      $scope.log += msgString + '\n';
      output.innerHTML += msgString + '\n';

      // Then, we take action based on the kind of message
      if (msg.type === "offer") {
        pc.setRemoteDescription(new RTCSessionDescription(msg));
        answer();
      } else if (msg.type === "answer") {
        pc.setRemoteDescription(new RTCSessionDescription(msg));
      } else if (msg.type === "candidate") {
        pc.addIceCandidate(
          new RTCIceCandidate({sdpMLineIndex:msg.mlineindex,
                              candidate:msg.candidate}));
      }
    };

    // handlers for signaling channel
    scHandlers = {
      'onWaiting' : function () {
       // setStatus("Waiting");
        // weWaited will be used later for auto-call
        weWaited = true;
      },
      'onConnected': function () {
       // setStatus("Connected");
        // set up the RTC Peer Connection since we're connected
        createPC();
      },
      'onMessage': handleMsg
    };

    // Finally, create signaling channel
    signalingChannel = createSignalingChannel(key, scHandlers);
    errorCB = function (msg) {
      $scope.log += msg;
      output.innerHTML += msg;
    };

    // and connect.
    signalingChannel.connect(errorCB);
  }


  function createPC() {
    var stunuri = true,
    turnuri = false,
    myfalse = function(v) {
      return ((v==="0")||(v==="false")||(!v)); },
      config = new Array();

      if (stunuri) {
        // this is one of Google's public STUN servers
        config.push({"url":"stun:stun.l.google.com:19302",
                    "urls":"stun:stun.l.google.com:19302"});
      }
      if (turnuri) {
        if (stunuri) {
          // can't use TURN-only TURN server in this case because of
          // bug in Chrome that causes STUN server responses to be
          // ignored, so we use TURN server that also does STUN
          config.push({"url":"turn:giorgionatili@192.184.87.98",
                      "urls":"turn:192.184.87.98",
                      "username":"giorgionatili",
                      "credential":"3uph0n1c0"});
        } else {
          // this is our TURN-only TURN server
          config.push({"url":"turn:turn.webrtcbook.com",
                      "urls":"turn:192.184.87.98",
                      "username":"giorgionata",
                      "credential":"3uph0n1c0"});
        }
      }
      console.log("config = " + JSON.stringify(config));

      pc = new RTCPeerConnection({iceServers:config});
      pc.onicecandidate = onIceCandidate;
      pc.ondatachannel = onDataChannelAdded;

  }

  // When our browser has another candidate, send it to the peer
  function onIceCandidate(e) {
    if (e.candidate) {
      send({type:  'candidate',
           mlineindex:  e.candidate.sdpMLineIndex,
           candidate:  e.candidate.candidate});
    }
  }

  function onDataChannelAdded(e) {
    dc = e.channel;
    setupDataHandlers();
  }

  function call() {
    dc = pc.createDataChannel('chat');
    setupDataHandlers();

    pc.createOffer(gotDescription, doNothing, constraints);
  }

  // and this generates it for an answer.
  function answer() {
    pc.createAnswer(gotDescription, doNothing, constraints);
  }

  // In either case, once we get the session description we tell
  // our browser to use it as our local description and then send
  // it to the other browser.  It is the setting of the local
  // description that allows the browser to send media and prepare
  // to receive from the other side.
  function gotDescription(localDesc) {
    pc.setLocalDescription(localDesc);
    send(localDesc);
  }

  function setupDataHandlers() {
    data.send = function(msg) {
      msg = JSON.stringify(msg);
      console.log("sending " + msg + " over data channel");
      dc.send(msg);
    }
    dc.onmessage = function(e) {
      var msg = JSON.parse(e.data),
      cb = document.getElementById("chatbox"),
      rtt = document.getElementById("rtt");

      if (msg.rtt) {
        // if real-time-text (per keypress) message, display in
        // real-time window
        console.log("received rtt of '" + msg.rtt + "'");
        rtt.value = msg.rtt;
        msg = msg.rtt;
      } else if (msg.chat) {
        // if full message, display in chat window,
        // reset real-time window,
        // and force chat window to last line
        console.log("received chat of '" + msg.chat + "'");
        cb.value += "<- " + msg.chat + "\n";
        rtt.value = "";
        cb.scrollTop = cb.scrollHeight;
        msg = msg.chat;
      } else {
        console.log("received " + msg + "on data channel");
      }
    };
  }

  function send(msg) {
    var handler = function (res) {

      var data;
      if(typeof res !== 'string'){

        data = '';
        for(var i in res){

          data += i + ': ' + res[i] + '\n';

        }

      }else{

        data = res;
      }

      document.getElementById("response").innerHTML += data;
      return;
    },
    msgString = JSON.stringify(msg).replace(/\\r\\n/g,'\n');

    $scope.log += msgString + '\n';
    output.innerHTML += msgString + '\n';

    // and send on signaling channel
    signalingChannel.send(msg, handler);
  }

});


