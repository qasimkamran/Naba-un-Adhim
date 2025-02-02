import Verse from '../features/verses/verseModel.js';

export const getVersesByChapterId = async (chapter_id) => {
  try {
    const verses = await Verse.find({ chapter_id });
    return verses.length ? verses : null;
  }
  catch (error) {
    throw new Error(error.message);;
  }
};

