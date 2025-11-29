const Bug = require("../models/Bug");

// CREATE BUG
exports.createBug = async (req, res) => {
  try {
    const bug = await Bug.create(req.body);
    res.status(201).json(bug);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET ALL BUGS
exports.getBugs = async (req, res) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.json(bugs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE BUG STATUS
exports.updateBugStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const bug = await Bug.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!bug) return res.status(404).json({ message: "Bug not found" });

    res.json(bug);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE BUG
exports.deleteBug = async (req, res) => {
  try {
    const bug = await Bug.findByIdAndDelete(req.params.id);

    if (!bug) return res.status(404).json({ message: "Bug not found" });

    res.json({ message: "Bug deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
