const { dbConnect, dbClose } = require("./db/db");
const express = require('express');
const EventEmitter = require('events').EventEmitter;
const cors = require('cors');
const chaptersRoute = require('./routes/chapters');
const pagesRoute = require('./routes/pages');

const app = express();

const eventEmitter = new EventEmitter();

app.use(express.json());
app.use(cors());

app.use('/api/', chaptersRoute);
app.use('/api/', pagesRoute);

eventEmitter.on('exit', async () => {
    console.log('The application is exiting.');
    console.log('Cleaning up...');
    await dbClose();
    console.log("Cleanup complete!, Goodbye.");
    process.exit();
});

process.on('SIGINT', () => { eventEmitter.emit('exit'); })
process.on('SIGTERM', () => { eventEmitter.emit('exit'); })

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
