const {
  getAllItems,
  addItem,
  updateItem,
  deleteItem,
} = require("../model/itemModel");

// GET /items
const getItems = async (req, res) => {
  try {
    const { status } = req.query;
    const items = await getAllItems(status);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /items
const createItem = async (req, res) => {
  try {
    await addItem(req.body);
    res.json({ message: "Data sepatu berhasil ditambah ke database." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /items/:id
const editItem = async (req, res) => {
  try {
    await updateItem(req.params.id, req.body);
    res.json({ message: "Berhasil memperbarui status pengerjaan sepatu." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /items/:id
const removeItem = async (req, res) => {
  try {
    await deleteItem(req.params.id);
    res.json({ message: "Data sepatu berhasil dihapus." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getItems, createItem, editItem, removeItem };
