import mongoose from 'mongoose';


/* Example of the chapters schema
 * -------------------------------
 * chapter_id: "C001"
 * chapter_number: 1
 * chapter_arabic: "الفاتحة"
 * chapter_english: "al-Fatihah"
 * chapter_arabic: "al-Fātiĥah
 */

const chapterSchema = new mongoose.Schema(
  {
    chapter_id: { type: String, required: true, unique: true },
    chapter_number: { type: Number, required: true },
    chapter_arabic: { type: String, required: true },
    chapter_english: { type: String, required: true },
    chapter_display: { type: String, required: true },
    verse_count: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Chapter', chapterSchema);

