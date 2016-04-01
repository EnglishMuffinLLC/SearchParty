'use strict'
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
const neo = require('../db/neo.js');

const userInfo = require('../lib/user/showUserHuntsAndInfo.js');
const userAuth = require('../lib/user/signUpAndSignIn.js')
const friends = require('../lib/user/friends.js');
const config = require('../config/config.js');
const secret = config.secret;


function error(error) {
  res.status(400).json(error);
}

module.exports = {
  signup: (req, res) => {
    console.log("signup request body ", req.body);
    userAuth.registerAndVerifyUser(req.body)
    .then(userData => {
      console.log("++line 28 user data from register and verify", userData)
      let token = jwt.encode({username: userData.username}, secret);
      console.log("++token", token);
      res.json({token: token});
    })
    .catch(error);
  },
  signin: (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    userAuth.verifyExistingUserCreds(username, password)
    .then(userData => {
      console.log("signin function userData", userData);
      if(userData) {
        let token = jwt.encode({username: userData.username}, secret);
        console.log('token:',token);
        res.json({token: token});
      }
    })
    .catch(error);
  },
  getUserInfo: (req, res) => {
    let username = jwt.decode(req.body.token, config.secret).username;
    userInfo.giveAllUserHuntData(username)
    .then(userObject => {
      res.json(userObject);
    })
    .catch(error);
  },
  addUserToFriendsList: (req, res) => {
    let mainFriendUsername = jwt.decode(req.body.token, config.secret).username;
    let addFriendUsername = req.body.friendusername;
    friends.addFriendToDBPromise(mainFriendUsername, addFriendUsername)
    .then(addedFriend => {
      res.json(addedFriend);
    })
    .catch(error);
  },
  retrieveUserFriends: (req, res) => {
    let username = jwt.decode(req.body.token, config.secret).username;
    friends.retrieveFriendsPromise(username)
    .then(friendsArray => {
      res.json(friendsArray);
    })
    .catch(error);
  },
  retrieveFriendHunt: (req, res) => {
    let username = req.body.username;
    userInfo.giveAllUserHuntData(username)
    .then(userObject => {
      res.json(userObject);
    })
    .catch(error);
  },
  addFriendToHunt: (req, res) => {

    let huntID = req.body.huntID;
    let friendUsername = req.body.friendUsername;

    friends.addFriendToHuntPromise(friendUsername, huntID)
    .then(friendAdded => {
      console.log("this friend was added to your hunt", friendAdded);
      res.json(friendAdded);
    })
    .catch(error);
  },
  retrieveAddedHunts: (req, res) => {
    
    let username = req.body.username
    console.log('calling retrieveAddedHunts!! with username ', username);
    friends.retrieveAddedHuntsPromise(username)
    .then(huntsArray => {
      console.log("these are the hunts you've been added to", huntsArray);
      res.json(huntsArray)
    })
    .catch(error);
  }
};
