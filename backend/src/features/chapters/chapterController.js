import Chapter from './chapterModel.js'

export const getChapters = async (req, res) => {
  try {
    const chapters = await Chapter.find({});
    res.status(200).json(chapters);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getChapterById = async (req, res) => {
  try {
    const chapter = await Chapter.findOne({ chapter_id: req.params.chapter_id });
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });
    res.status(200).json(chapter);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createChapter = async (req, res) => {
  const { chapter_id, chapter_number, chapter_arabic, chapter_english, chapter_display, verse_count } = req.body;
  try {
    const newChapter = new Chapter({ chapter_id, chapter_number, chapter_arabic, chapter_english, chapter_display, verse_count });
    const savedChapter = await newChapter.save();
    res.status(201).json(savedChapter);
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateChapter = async (req, res) => {
  try {
    const updatedChapter = await Chapter.findOneAndUpdate(
      { chapter_id: req.params.chapter_id },
      req.body,
      { new: true });
    if (!updatedChapter) return res.status(404).json({ message: 'Chapter not found' });
    res.status(200).json(updatedChapter);
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteChapter = async (req, res) => {
  try {
    const deletedChapter = await Chapter.findOneAndDelete({ chapter_id: req.params.chapter_id });
    if (!deletedChapter) return res.status(404).json({ message: 'Chapter not found' });
    res.status(200).json({ message: 'Chapter deleted successfully' });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

