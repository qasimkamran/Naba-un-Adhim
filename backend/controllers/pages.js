const { dbConnect, dbClose } = require('../db/db');

async function getDataByPage(pageNumber) {
    const db = await dbConnect();
    const pages = db.collection("Pages");
    const data = await pages.find({ page_number: pageNumber }).toArray();
    return data;
};

module.exports = {
    getDataByPage
};
