'use strict'
const app = require('./server/server.js');
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening to ${port}`);
});
