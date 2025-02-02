import request from 'supertest';
import mongoose from 'mongoose';
import { app, server } from '../../../server.js';
import Verse from './verseModel.js';

describe("Verses API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  describe("GET /api/verses", () => {
    it("should return a list of all verses", async () => {
      const res = await request(app).get("/api/verses");
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });

  describe("GET /api/verses/:verse_id", () => {
    it("should return a specific verse by verse_id", async () => {
      const testVerse = new Verse({
        verse_id: "C001V999",
        chapter_id: "C001",
        verse_arabic: "اختبار",
        verse_english: "Test Verse"
      });

      await testVerse.save();

      const res = await request(app).get(`/api/verses/C001V999`);
      expect(res.statusCode).toBe(200);
      expect(res.body.verse_id).toBe("C001V999");

      await Verse.deleteOne({ verse_id: "C001V999" });
    });

    it("should return 404 if verse not found", async () => {
      const res = await request(app).get("/api/verses/C001V999");
      expect(res.statusCode).toBe(404);
    });
  });

  describe("POST /api/verses", () => {
    it("should create a new verse", async () => {
      const newVerse = {
        verse_id: "C001V999",
        chapter_id: "C001",
        verse_arabic: "جديد",
        verse_english: "New Verse"
      };

      const res = await request(app).post("/api/verses").send(newVerse);
      expect(res.statusCode).toBe(201);
      expect(res.body.verse_id).toBe("C001V999");

      await Verse.deleteOne({ verse_id: "C001V999" });
    });
  });

  describe("DELETE /api/verses/:verse_id", () => {
    it("should delete a verse", async () => {
      const testVerse = new Verse({
        verse_id: "C001V999",
        chapter_id: "C001",
        verse_arabic: "حذف",
        verse_english: "To Delete"
      });

      await testVerse.save();

      const res = await request(app).delete(`/api/verses/C001V999`);
      expect(res.statusCode).toBe(200);

      const check = await Verse.findOne({ verse_id: "C001V999" });
      expect(check).toBeNull();
    });
  });
});

