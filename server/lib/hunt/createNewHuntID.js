'use strict'

const neo = require('../../db/neo.js');
const shortid = require('shortid');
const neo4jPromise = require('../neo4j/neo4jQueryPromiseReturn.js');
const moment = require('moment');

module.exports = {
  initializeHunt: (username, nameOfHunt, taskNumber, templateName) => {
    //creates a new hunt tied to the current username which is taken from the jwt
    //adds a chat module to be associated with the hunt
    let huntID = "h" + shortid();
    let chatID = "c" + shortid();
    let huntStartTime = Date.now();
    let huntName = nameOfHunt;
    //TODO: add extra hunt parameters, such as end time and distance traveled, leave blank for now
    const initializeHuntQuery =
    `MATCH (user:User{username:"${username}"})
    CREATE (user)-[:PARTICIPATED_IN]->(hunt:Hunt{huntID:"${huntID}", starttime:${huntStartTime}, huntname:"${huntName}", tasknumber: 0, totalnumberoftasks:${taskNumber}, templatename:"${templateName}"})-[:HAS_CHAT]->(:Chatroom{chatID:"${chatID}"}) RETURN hunt`;

    return neo4jPromise.databaseQueryPromise(initializeHuntQuery);
  }
}
