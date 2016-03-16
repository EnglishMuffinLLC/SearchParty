'use strict'
const config = require('../server.js');
const host = 'localhost';
const port = 7474;
const username = config.neoUsername;
const password = config.neoPassword;

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
        return resolve(results);
      })
      .on('error', (error) => {
        console.error('neo_api.runCypherStatementPromise line 56', error);
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
