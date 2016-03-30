'use strict'
const app = require('./server/server.js');
const config = require('./server/config/config.js');
const httpPort = config.HTTPPORT || 8000;
const httpsPort = config.HTTPSPORT || 8001;
const https = require('https');
const http = require('http');
const fs = require('fs');
const ioServer = require('socket.io');
const chatPromises = require('./server/lib/chat/chatPromises.js');

const ca = [];
let chain = fs.readFileSync('getsearchparty_com.ca-bundle', 'utf8');
chain = chain.split('\n');
let cert = [];

for (let i = 0; i < chain.length; i++) {
  let line = chain[i];
  if (!(line.length !== 0)) {
    continue;
  }
  cert.push(line);
  if (line.match(/-END CERTIFICATE-/)) {
    ca.push(cert.join('\n'));
    cert = [];
  }
}

const options = {
  ca: ca,
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('server.crt')
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);

// Create an HTTP service.
httpServer.listen(httpPort, () => console.log(`express HTTP server listening on port ${httpPort}`));
// Create an HTTPS service identical to the HTTP service.
httpsServer.listen(httpsPort, () => console.log(`express HTTPS server listening on port ${httpsPort}`) );

const io = new ioServer();

io.attach(httpServer);
io.attach(httpsServer);

io.on('connection', socket => {
  // console.log('a user connected');
  // chatPromises.retrieveChatMessages("cNkgYkThXAx")
  // .then(data =>{
  //    console.log('Fetching message history from Database.');
  //    console.log(data);
  //    //We recieve our data backwards and es6 wont easily allow
  //    //iterating backwards in an array, so we use a stack
  //    let tempStack = [];
  //    for(let messages of data) {
  //      if(messages.username) {
  //       tempStack.push(messages);
  //      }
  //    }
  //    while(tempStack.length >= 0 ) {
  //      let last = tempStack[tempStack.length-1];
  //      io.emit('chat_message', last.text, last.username);
  //      tempStack.pop();
  //    }
  //  });

    socket.on('location', location => {
      if (location.id != userInfo.id) {
         location_callback(location);
      }
    });

  socket.on('chat_message', (msg, username) => {
    console.log('socket: ', msg, username);
    io.emit('chat_message', msg, username);
    // chatPromises.addChatMessageToDB(msg, 'cNkgYkThXAx', username);
  });

  socket.on('disconnect', () => {
   //   io.to('some room').emit(username)
    console.log('user disconnected');
  });

  socket.on('typing', data => {
      console.log('is typing', data);
      io.emit('isTyping', data);
  });
 });
