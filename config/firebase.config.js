var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccout.js");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
module.exports = admin;
