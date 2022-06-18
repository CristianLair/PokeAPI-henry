  
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
server.keepAliveTimeout = 61 * 1000;
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
})