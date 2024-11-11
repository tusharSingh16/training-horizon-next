const express = require("express");
const zod = require("zod");
const { SearchAlert } = require("../models/SearchAlert");
const searchAlertRouter = express.Router();

const Schema = zod.object({
  userId: zod.string(),
  category: zod.string().optional(),
  minPrice: zod.string().optional(),
  maxPrice: zod.string().optional(),
  mode: zod.string().optional(),
  location: zod.string().optional(),
  gender: zod.string().optional(),
  startTime: zod.string().optional(),
  endTime: zod.string().optional(),
  minAge: zod.string().optional(),
  maxAge: zod.string().optional(),
});
searchAlertRouter.post("/", async function (req, res) {
  const inputData = req.body
  console.log(inputData);
  
  const result = Schema.safeParse(inputData);

  if (!result.success) {
    return res.status(411).json({
      message: "Incorrect inputs",
      result,
    });
  }

  try {
    const isUnique = await SearchAlert.findOne(inputData);
    if (isUnique) {
      return res.status(411).json({
        message: "Similar searchAlert found ",
      });
    }

    const result = await SearchAlert.create(inputData);
    res.status(200).json({
      message: "searchAlert created successfully",
      searchAlert:result
    });
  } catch (error) {
    res.status(411).json({
      message: " Incorrect searchAlert input",
      error,
    });
  }
});

searchAlertRouter.get("/:userId", async function (req, res) {
  try {
    const { userId } = req.params;
    const data= await SearchAlert.find({ userId });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = searchAlertRouter;
