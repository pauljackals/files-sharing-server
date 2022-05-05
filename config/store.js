const mongoose = require("./mongoose");
const MongoStore = require("connect-mongo");

module.exports = MongoStore.create({
  client: mongoose.connection.client,
  collectionName: "sessions",
  stringify: false
})
