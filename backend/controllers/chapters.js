const { dbConnect, dbClose } = require('../db/db');

async function getDataByChapter(chapterNumber) {
    const db = await dbConnect();
    const main = db.collection("Main");
    const data = await main.find({ chapter_number: chapterNumber }).toArray();
    return data;
};

module.exports = {
    getDataByChapter
};
