'use strict'
const neo4jPromise = require('../neo4j/neo4jQueryPromiseReturn.js');
const messageFormatter = require('./formatChatMessageForDB.js');

module.exports = {
  addChatMessageToDB: (messageBody, huntID) => {
    console.log("message body insdie of chat promises", messageBody);

     let formattedMessageObject = messageFormatter.formatChatMessageWithProps(messageBody);
     console.log("formatted chat object ", formattedMessageObject);

    const addChatMessageQuery = `
    MATCH (:Hunt{huntID:"${huntID}"})-[:HAS_CHAT]->(root)
    OPTIONAL MATCH (root)-[r:CURRENT]-(secondlatestmessage)
    DELETE r
    CREATE (root)-[:CURRENT]->(latest_message :Message{props})
    WITH latest_message, collect(secondlatestmessage) AS seconds
    FOREACH (x IN seconds | CREATE (latest_message)-[:NEXT]->(x))
    RETURN latest_message.text`;

    return neo4jPromise.databaseQueryPromise(addChatMessageQuery, formattedMessageObject)
    .then(latestMessage => {
      return new Promise((resolve, reject) => {
        if(latestMessage.length > 0) {
          resolve(latestMessage);
        } else {
          reject({"error": "could not add message to db"});
        }
      })
    }).catch(error => console.error(error));
  },

  retrieveChatMessages: huntID => {
    const retrieveChatQuery =
    `MATCH (:Hunt{huntID:"${huntID}"})-[:HAS_CHAT]->(chat)
    WITH chat
    MATCH (chat)-[:CURRENT]-(latestmessage)-[:NEXT*0..10]-(oldermessages)
    RETURN oldermessages ORDER BY oldermessages.datetime`;

    return neo4jPromise.databaseQueryPromise(retrieveChatQuery)
    .then(chatMessageArray => {
      return new Promise((resolve, reject) => {
        if(chatMessageArray) {
          resolve(chatMessageArray);
        } else {
          reject({"error": "could not retrieve chat messages"});
        }
      })
    }).catch(error => console.error(error));
  }
}
