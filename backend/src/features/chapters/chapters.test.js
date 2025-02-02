import request from 'supertest';
import mongoose from 'mongoose';
import { app, server } from '../../../server.js';
import Chapter from './chapterModel.js';

describe("Chapters API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  describe("GET /api/chapters", () => {
    it("should return a list of all chapters", async () => {
      const res = await request(app).get("/api/chapters");
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });

  describe("GET /api/chapters/:chapter_id", () => {
    it("should return a specific chapter by chapter_id", async () => {
      const testChapter = new Chapter({
        chapter_id: "C999",
        chapter_number: 999,
        chapter_arabic: "اختبار",
        chapter_english: "Test Chapter",
        chapter_display: "Test Chapter",
        verse_count: 5,
      });

      await testChapter.save();

      const res = await request(app).get(`/api/chapters/C999`);
      expect(res.statusCode).toBe(200);
      expect(res.body.chapter_id).toBe("C999");

      await Chapter.deleteOne({ chapter_id: "C999" });
    });

    it("should return 404 if chapter not found", async () => {
      const res = await request(app).get("/api/chapters/C000");
      expect(res.statusCode).toBe(404);
    });
  });

  describe("POST /api/chapters", () => {
    it("should create a new chapter", async () => {
      const newChapter = {
        chapter_id: "C999",
        chapter_number: 999,
        chapter_arabic: "جديد",
        chapter_english: "New Chapter",
        chapter_display: "New Chapter",
        verse_count: 7,
      };

      const res = await request(app).post("/api/chapters").send(newChapter);
      expect(res.statusCode).toBe(201);
      expect(res.body.chapter_id).toBe("C999");

      await Chapter.deleteOne({ chapter_id: "C999" });
    });
  });

  describe("DELETE /api/chapters/:chapter_id", () => {
    it("should delete a chapter", async () => {
      const testChapter = new Chapter({
        chapter_id: "C999",
        chapter_number: 999,
        chapter_arabic: "حذف",
        chapter_english: "To Delete",
        chapter_display: "To Delete",
        verse_count: 6,
      });

      await testChapter.save();

      const res = await request(app).delete(`/api/chapters/C999`);
      expect(res.statusCode).toBe(200);

      const check = await Chapter.findOne({ chapter_id: "C999" });
      expect(check).toBeNull();
    });
  });
});

