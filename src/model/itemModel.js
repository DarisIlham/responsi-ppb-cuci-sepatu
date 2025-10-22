const { supabase } = require("../config/db");

// GET all items
const getAllItems = async (status) => {
  let query = supabase.from("items").select("*");

  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

// ADD item
const addItem = async (newItem) => {
  const { error } = await supabase.from("items").insert([{
    nama: newItem.nama,
    status: newItem.status,
    tanggal_masuk: newItem.tanggalMasuk,
    tanggal_selesai: newItem.tanggalSelesai,
  }]);
  if (error) throw error;
};

// UPDATE item
const updateItem = async (id, updatedData) => {
  const { error } = await supabase
    .from("items")
    .update({
      status: updatedData.status,
      tanggal_selesai: updatedData.tanggalSelesai,
    })
    .eq("id", id);
  if (error) throw error;
};

// DELETE item
const deleteItem = async (id) => {
  const { error } = await supabase.from("items").delete().eq("id", id);
  if (error) throw error;
};

module.exports = { getAllItems, addItem, updateItem, deleteItem };
