const express = require('express');
const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const serverUtils = require('./serverModel');
const pollRoutes = require('./routes/pollRoutes');

const app = express();
const adapter = new FileSync('db.json');
const db = low(adapter);
const port = 1111;


app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

serverUtils.serverInit(db);
pollRoutes(app, db);

app.listen(port, () => console.log(`http://localhost:${port}!`));