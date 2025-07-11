// controllers/tableController.js
const db = require("../models");
const Table = db.Table; // This is the initialized Sequelize model

exports.addTable = async (req, res) => {
  try {
    const { tableNo, seats } = req.body;

    const table = await Table.create({
      tableNo,
      seats,
      status: "Available",
      initial: "-",
    });

    res.status(201).json(table);
  } catch (error) {
    console.error("Add Table Error:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.getTables = async (req, res) => {
  try {
    const tables = await Table.findAll();
    res.json(tables);
  } catch (error) {
    res.status(500).json({ error: "Failed to get tables" });
  }
};
