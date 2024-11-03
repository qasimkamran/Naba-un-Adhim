const express = require('express');
const router = express.Router();
const chaptersController = require('../controllers/chapters');

router.get('/chapter/:chapterNumber', async (req, res) => {
    const chapterNumber = parseInt(req.params.chapterNumber, 10);
    try {
        const data = await chaptersController.getDataByChapter(chapterNumber);
        res.json(data);
    } catch (error) {
        console.error("Error fetching data by chapter:", error);
        res.status(500).json({ error: "Failed to retrieve data" });
    }
});

module.exports = router;
