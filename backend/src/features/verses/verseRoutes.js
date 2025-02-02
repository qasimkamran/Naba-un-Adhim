import express from 'express';
import { getVerses, getVerseById, updateVerse, createVerse, deleteVerse } from './verseController.js';

const router = express.Router();

router.get('/', getVerses);
router.get('/:verse_id', getVerseById);
router.post('/', createVerse);
router.put('/:verse_id', updateVerse);
router.delete('/:verse_id', deleteVerse);

export default router;

