'use strict'

const neo = require('../../db/neo.js');
const neo4jPromise = require('../neo4j/neo4jQueryPromiseReturn.js');
const placeUtil = require('../util/buildPlaceInformation.js');

module.exports = {

  addTaskAndLocationToHunt: (task, location, huntID) => {
    console.log("inside add tasks and location to hunt");
    let taskID = task.id;
    // console.log(task.id);
    // console.log(placeUtil);
    // console.log("location Object", location);
    let smallerLocation = placeUtil.createSmallerPlaceObject(location);
    console.log("this is the smaller location", smallerLocation);

    // console.log("this is the location data", location);

    const insertTaskAndLocationToHuntQuery =
    `MATCH (hunt:Hunt{huntID:"${huntID}"}), (task:Task{id:${taskID}})
    MERGE (location:Place{name:"${smallerLocation.name}", placeID:"${smallerLocation.id}", lat:${smallerLocation.lat}, lng:${smallerLocation.lng}, address:"${smallerLocation.address}"})
    CREATE (hunt)-[:OCCURRED_AT]->(location)-[:INCLUDES]->(task)
    RETURN hunt`;

    return neo4jPromise.databaseQueryPromise(insertTaskAndLocationToHuntQuery);
  }
}
