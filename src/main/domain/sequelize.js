require("custom-env").env("pmm");
var Sequelize = require("sequelize");
var pg = require("pg");
/*
var seq = new Sequelize(process.env.DATABASE_URL_LOCAL, {
  define: {
    timestamps: true,
    createdAt: 'date_created', // overriding field name
    updatedAt: 'last_updated' // overriding field name
  }
});

seq
  .authenticate()
  .then(function(data) {
    console.log(
      "Database connection SUCCESS [ " + process.env.DATABASE_URL_LOCAL + " ].\n"
    );
  })
  .catch(function(err) {
    console.error(
      "Unable to connect to the database: " + process.env.DATABASE_URL_LOCAL,
      err
    );
  });

pg.types.setTypeParser(1114, function(stringValue) {
  return new Date(stringValue + "+0300"); // ARG timezone
});

module.exports = seq;
*/