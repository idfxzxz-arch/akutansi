import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

let transactions = [
  {
    id: 1,
    type: "income",
    title: "Modal awal",
    category: "Modal",
    amount: 1000000,
    date: "2026-05-18",
  },
  {
    id: 2,
    type: "expense",
    title: "Beli perlengkapan",
    category: "Operasional",
    amount: 150000,
    date: "2026-05-18",
  },
];

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend accounting berjalan",
  });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {
    return res.json({
      success: true,
      message: "Login berhasil",
      token: "dummy-token-admin",
    });
  }

  return res.status(401).json({
    success: false,
    message: "Username atau password salah",
  });
});

app.get("/api/transactions", (req, res) => {
  res.json({
    success: true,
    data: transactions,
  });
});

app.post("/api/transactions", (req, res) => {
  const { type, title, category, amount, date } = req.body;

  if (!type || !title || !category || !amount || !date) {
    return res.status(400).json({
      success: false,
      message: "Data transaksi belum lengkap",
    });
  }

  const newTransaction = {
    id: Date.now(),
    type,
    title,
    category,
    amount: Number(amount),
    date,
  };

  transactions = [newTransaction, ...transactions];

  res.status(201).json({
    success: true,
    message: "Transaksi berhasil ditambahkan",
    data: newTransaction,
  });
});

app.put("/api/transactions/:id", (req, res) => {
  const id = Number(req.params.id);
  const { type, title, category, amount, date } = req.body;

  transactions = transactions.map((item) =>
    item.id === id
      ? {
          ...item,
          type,
          title,
          category,
          amount: Number(amount),
          date,
        }
      : item
  );

  res.json({
    success: true,
    message: "Transaksi berhasil diupdate",
  });
});

app.delete("/api/transactions/:id", (req, res) => {
  const id = Number(req.params.id);

  transactions = transactions.filter((item) => item.id !== id);

  res.json({
    success: true,
    message: "Transaksi berhasil dihapus",
  });
});

export default app;

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Backend berjalan di http://localhost:${PORT}`);
  });
}