import Verse from './verseModel.js'

export const getVerses = async (req, res) => {
  try {
    const verses = await Verse.find({});
    res.status(200).json(verses);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVerseById = async (req, res) => {
  try {
    const verse = await Verse.findOne({ verse_id: req.params.verse_id });
    if (!verse) return res.status(404).json({ message: 'Verse not found' });
    res.status(200).json(verse);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createVerse = async (req, res) => {
  const { verse_id, chapter_id, verse_arabic, verse_english } = req.body;
  try {
    const newVerse = new Verse({ verse_id, chapter_id, verse_arabic, verse_english  });
    const savedVerse = await newVerse.save();
    res.status(201).json(savedVerse);
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateVerse = async (req, res) => {
  try {
    const updatedVerse = await Verse.findOneAndUpdate(
      { verse_id: req.params.verse_id },
      req.body,
      { new: true });
    if (!updatedVerse) return res.status(404).json({ message: 'Verse not found' });
    res.status(200).json(updatedVerse);
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteVerse = async (req, res) => {
  try {
    const deletedVerse = await Verse.findOneAndDelete({ verse_id: req.params.verse_id });
    if (!deletedVerse) return res.status(404).json({ message: 'Verse not found' });
    res.status(200).json({ message: 'Verse deleted successfully' });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

