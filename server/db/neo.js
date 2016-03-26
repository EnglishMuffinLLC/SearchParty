'use strict'
const host = '159.203.239.26';
const port = 7474;
const config = require('../config/config.js');
const password = config.neoPassword;
const username = config.neoUsername;

const cypher = require('cypher-stream')(`http://${username}:${password}@${host}:${port}`);

module.exports = {
  runCypherStatementPromise: (statement, params) => {
    return new Promise((resolve, reject) => {
      let results = [];
      let transaction =
      cypher.transaction()
      .on('data', (result) => {
        for (let key in result) {
          results.push(result[key]);
        }
      })
      .on('end', () => {
        console.log("ended");
        return resolve(results);
      })
      .on('error', (error) => {
        console.error('neo4j-error', JSON.stringify(error,null,2));
        return reject(error);
      });

      transaction.write({
        statement: statement,
        parameters: params
      });

      transaction.commit();
    });
  }
}
