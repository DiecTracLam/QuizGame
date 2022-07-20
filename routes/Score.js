const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const { ObjectId } = require("mongodb");
const { db } = require("../model/connectDB");
const ScoreRouter = express.Router();

ScoreRouter.get("/", async function (req, res) {
  try {
    const scores = await db.ScoreTables.aggregate([
      { $sort: { bestScore: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "User",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unset: ["_id", "userId", "user._id", "user.email", "user.password"],
      },
    ]).toArray();
    res.json({ data: scores });
  } catch (error) {
    res.json({ success: false, message: "Internal server error" });
  }
});

ScoreRouter.post("/upload", verifyToken, async (req, res) => {
  const { score } = req.body;
  try {
    const user = await db.ScoreTables.findOne({ userId: new ObjectId(req.userId) });
    if (user) {
      if (user.bestScore < score) {
        const uploadedScore = await db.ScoreTables.updateOne(
          { userId: new ObjectId(req.userId) },
          { $set: { bestScore: score } },
        );
      }
    } else {
      const InsertScore = await db.ScoreTables.insertOne({
        userId: new ObjectId(req.userId),
        bestScore: score,
      });
    }
    res.json({ success: true, message: "Upload Successfully" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = ScoreRouter;
