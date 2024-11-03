const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pages');

router.get('/page/:pageNumber', async (req, res) => {
    const pageNumber = parseInt(req.params.pageNumber, 10);
    try {
        const data = await pagesController.getDataByPage(pageNumber);
        res.json(data);
    } catch (error) {
        console.error("Error fetching data by page:", error);
        res.status(500).json({ error: "Failed to retrieve data" });
    }
});

module.exports = router;
