import mongoose from 'mongoose';


/* Example of the verse schema
 * -------------------------------
 * verse_id: "C078V001"
 * chapter_id: "C078"
 * verse_arabic: "عَمَّتَسَآءَلُوۡنَ"
 * verse_english: "What is it that they are questioning each other about?!"
 */

const verseSchema = new mongoose.Schema(
  {
    verse_id: { type: String, required: true, unique: true },
    chapter_id: { type: String, required: true, unique: true },
    verse_arabic: { type: String, required: true },
    verse_english: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Verse', verseSchema);

