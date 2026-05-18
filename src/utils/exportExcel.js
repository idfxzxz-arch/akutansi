import * as XLSX from "xlsx";

export function exportTransactionsExcel(transactions) {
  const rows = transactions.map((item) => ({
    Tanggal: item.date,
    Keterangan: item.title,
    Jenis: item.type === "income" ? "Pemasukan" : "Pengeluaran",
    Kategori: item.category,
    Nominal: item.amount,
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);

  worksheet["!cols"] = [
    { wch: 14 },
    { wch: 30 },
    { wch: 16 },
    { wch: 20 },
    { wch: 16 },
  ];

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Transaksi");

  XLSX.writeFile(workbook, "data-transaksi.xlsx");
}