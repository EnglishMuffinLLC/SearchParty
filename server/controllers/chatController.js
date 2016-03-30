'use strict'

const chatPromises = require('../lib/chat/chatPromises.js');
// const jwt = require('jwt-simple');
const config = require('../config/config.js');

module.exports = {
  insertChatMessage: (req, res) => {

    console.log("request body ", req.body);
    let huntID = req.body.huntID;

    let messageBody = {
      text: req.body.message,
      username: req.body.username,
      datetime: Date.now()
    };

    console.log("message body? ", messageBody);

    chatPromises.addChatMessageToDB(messageBody, huntID)
    .then(messageAdded => {
      console.log('message added in chat controller', messageAdded);
      res.json(messageAdded);
    })
    .catch(error => console.error(error));
  },
  retrieveChatMessages: (req, res) => {
    console.log("retrieve chat messages called");
    let huntID = req.body.huntID;

    chatPromises.retrieveChatMessages(huntID)
    .then(chatMessageArray => {
      console.log("10 latest messages from db ", chatMessageArray);
      res.json({"chatMessages": chatMessageArray})
    })
    .catch(error => console.error(error));
  }
}
