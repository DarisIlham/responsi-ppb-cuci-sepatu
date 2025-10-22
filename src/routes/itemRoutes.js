const express = require("express");
const router = express.Router();
const {
  getItems,
  createItem,
  editItem,
  removeItem,
} = require("../controller/itemController");

router.get("/", getItems);
router.post("/", createItem);
router.put("/:id", editItem);
router.delete("/:id", removeItem);

module.exports = router;
