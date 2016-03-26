'use strict'
const bcrypt = require('bcrypt-nodejs');


module.exports = {
  passwordEncrypt: userData => {
    //assuming that the properly formatted for neo4j object is being sent in
    let password = userData.props.password;
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, null, (err, hash) => {
          userData.props.password = hash;
          console.log("hashed password?: ", userData.props.password);
        });
        resolve(userData);
        reject(err)
      })
    })
  },


  passwordDecrypt: (passwordFromRequest, passwordFromDB) => {
    return new Promise((resolve, reject) => {
      console.log("request pw", passwordFromRequest)
      console.log("db pw", passwordFromDB)
      bcrypt.compare(passwordFromRequest, passwordFromDB, (err, result) => {
        console.log("signin compare passwords", result);
        resolve(result);
        reject(err);
      })
    })
  }
}