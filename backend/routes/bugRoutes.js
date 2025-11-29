const express = require("express");
const router = express.Router();
const {
  createBug,
  getBugs,
  updateBugStatus,
  deleteBug
} = require("../controllers/bugController");

router.post("/", createBug);            // CREATE
router.get("/", getBugs);               // READ
router.put("/:id/status", updateBugStatus); // UPDATE STATUS
router.delete("/:id", deleteBug);       // DELETE

module.exports = router;
