import express from 'express';
import { getChapters, getChapterById, updateChapter, createChapter, deleteChapter, getVersesByChapterId } from './chapterController.js';

const router = express.Router();

router.get('/', getChapters);
router.get('/:chapter_id', getChapterById);
router.post('/', createChapter);
router.put('/:chapter_id', updateChapter);
router.delete('/:chapter_id', deleteChapter);
router.get('/:chapter_id/verses', getVersesByChapterId);

export default router;

