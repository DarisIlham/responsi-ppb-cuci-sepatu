const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const dataPath = path.join(__dirname, "data", "items.json");

// 🔹 Helper untuk membaca & menulis file JSON
const readData = () => {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// ✅ GET /items (dengan filter opsional ?status=)
app.get("/items", (req, res) => {
  let items = readData();
  const { status } = req.query;

  if (status) {
    items = items.filter(
      (item) => item.status.toLowerCase() === status.toLowerCase()
    );
  }

  res.json(items);
});

// ✅ POST /items
app.post("/items", (req, res) => {
  const items = readData();
  const newItem = {
    id: items.length ? items[items.length - 1].id + 1 : 1,
    ...req.body,
  };

  items.push(newItem);
  writeData(items);
  res.json({ message: "Data sepatu berhasil ditambahkan." });
});

// ✅ PUT /items/:id
app.put("/items/:id", (req, res) => {
  const items = readData();
  const id = parseInt(req.params.id);
  const index = items.findIndex((i) => i.id === id);

  if (index === -1)
    return res.status(404).json({ message: "Sepatu tidak ditemukan." });

  items[index] = { ...items[index], ...req.body };
  writeData(items);
  res.json({ message: "Status sepatu berhasil diperbarui." });
});

// ✅ DELETE /items/:id
app.delete("/items/:id", (req, res) => {
  const items = readData();
  const id = parseInt(req.params.id);
  const filtered = items.filter((i) => i.id !== id);

  if (filtered.length === items.length)
    return res.status(404).json({ message: "Sepatu tidak ditemukan." });

  writeData(filtered);
  res.json({ message: "Data sepatu berhasil dihapus." });
});

// Jalankan server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
