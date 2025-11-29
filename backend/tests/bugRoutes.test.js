const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const bugRoutes = require("../routes/bugRoutes");
const Bug = require("../models/Bug");

const app = express();
app.use(express.json());
app.use("/api/bugs", bugRoutes);

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Bug API Tests", () => {
  it("should create a new bug", async () => {
    const res = await request(app)
      .post("/api/bugs")
      .send({
        title: "Test Bug",
        description: "Example bug",
        priority: "high"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Bug");
  });

  it("should get all bugs", async () => {
    const res = await request(app).get("/api/bugs");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should update bug status", async () => {
    const bug = await Bug.create({
      title: "Status Change Bug",
      description: "To be updated",
      priority: "low"
    });

    const res = await request(app)
      .put(`/api/bugs/${bug._id}/status`)
      .send({ status: "resolved" });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("resolved");
  });

  it("should delete a bug", async () => {
    const bug = await Bug.create({
      title: "Delete Bug",
      description: "Delete me",
      priority: "medium"
    });

    const res = await request(app).delete(`/api/bugs/${bug._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Bug deleted successfully");
  });
});
