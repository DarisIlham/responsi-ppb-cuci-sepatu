import { supabase } from "../config/db.js";

// 🔹 Ambil semua data (bisa pakai filter status)
export const getAllItems = async (status) => {
  let query = supabase.from("items").select("*");
  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

// 🔹 Tambah item baru
export const addItem = async (item) => {
  const { data, error } = await supabase.from("items").insert([item]);
  if (error) throw new Error(error.message);
  return data;
};

// 🔹 Update item berdasarkan ID
export const updateItem = async (id, updatedData) => {
  const { data, error } = await supabase
    .from("items")
    .update(updatedData)
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data;
};

// 🔹 Hapus item berdasarkan ID
export const deleteItem = async (id) => {
  const { data, error } = await supabase.from("items").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return data;
};
