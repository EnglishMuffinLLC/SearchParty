# Search Party #

---


Table of Contents
-----------------

1. [About](#about)
2. [Requirements](#requirements)
3. [Demo](#demo)
4. [Getting Started](#getting-started)
5. [Usage](#usage)
6. [Structure](#structure)
7. [Troubleshooting](#troubleshooting)
8. [Contributing](#contributing)


About
--------

Search Party is a hybrid app that takes a user on spontaneous adventures through geolocated scavenger hunts.

Some technologies we used:
  * [Angular 2](https://angular.io/) for component class based data binding and scalable, fast updates to UI
  * [Ionic 2](http://ionic.io/2) for a fast hybrid frontend 
  * [Google Maps](https://developers.google.com/maps/documentation/javascript/) for maps and distance calculations
  * [Socket.io](http://socket.io/) for real-time data handling
  * [neo4j](http://neo4j.com/) for a highly scalable native graph database with data relationships
  * [bcrypt](https://www.npmjs.com/package/bcrypt-nodejs) and [jwt-simple](https://www.npmjs.com/package/jwt-simple) for user authentication
  * [Node](https://nodejs.org/en/)/[Express](http://expressjs.com/en/index.html) server
  
Requirements
----

Node v5.8.0+, Typscript, and Ionic 2 beta are required.


Demo
----

Check out [Search Party](https://search-party-dev.herokuapp.com).


Getting Started
---------------

Clone the repo and install the necessary node modules:

```shell
$ git clone https://github.com/EnglishMuffinLLC/SearchParty.git
$ cd searchparty
$ npm install       # Install Node modules listed in ./package.json
$ cd client 
$ npm install       # Install frontend Node Modeules listed in ./client/package.json
$ ionic serve       # Serves up Ionic app
```


Usage
-----

#### `node index.js` 
Runs the server (by default found at `localhost:8000`).


Structure
---------

```
.
├── client                # Client-facing source code
|   ├── app               # Application source code
│   |    ├── pages        # Components that dictate pages
│   |    ├── services     # Components that dictate server api calls
│   |    ├── theme        # Styling
│   |    ├── app.html     # General app html
│   |    └── app.ts       # Application bootstrap and rendering
│   ├── etc               # Ionic specific bootstrapping
│   ├── hooks             # Ionic specific bootstrapping
│   ├── platform          # Ionic specific bootstrapping
│   ├── resources         # Ionic specific bootstrapping
│   ├── typings           # TypeScript defintions
│   └── www               # Client-facing deployment code
│        ├── build        # Minified code for deployment
│        ├── img          # Image requirements
│        └── index.html   # Client-facing deployment html
├── server                # Server-side source code
|   ├── config            # Config requirements for api and database keys
|   ├── controllers       # Server controllers that interact with client side actions
|   ├── db                # Database schema 
|   ├── lib               # General functions handling api and database calls
|   ├── routes            # Routing for server side interaction
|   └── server.js         # Server bootstrap
├── post_install.sh       # Handles post installing for deployment
└── index.js              # Starts the Express server
```



Troubleshooting
---------------

Having an issue? Please let us know! Report it, and we'll get to it as soon as possible.


Contributing
------------

If you would like to submit a pull request, please make an effort to follow the guide in [CONTRIBUTING.md](CONTRIBUTING.md).

Thanks for checking our app out!

– EnglishMuffinLLC Dev Team (Cam, Ellie, Ethaniel, & Monica)
