const express = require("express");
const { db } = require("../model/connectDB");
const QuestionRouter = express.Router();

QuestionRouter.get("/", async function (req, res) {
  try {
    const questions = await db.Questions.aggregate([
        {
            $match: { is_active: true }
        },
      {
        $lookup: {
          from: "Answer",
          localField: "answer",
          foreignField: "_id",
          as: "answer",
        },
      },
    ]).toArray();
    res.json({data:questions});
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = QuestionRouter;
