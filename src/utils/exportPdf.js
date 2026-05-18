import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatRupiah } from "./formatRupiah";

export function exportReportPdf({ summary, periodLabel, transactions }) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Laporan Laba Rugi Sederhana", 14, 18);

  doc.setFontSize(10);
  doc.text(`Periode: ${periodLabel}`, 14, 28);

  doc.setFontSize(12);
  doc.text(`Pendapatan: ${formatRupiah(summary.income)}`, 14, 42);
  doc.text(`Pengeluaran: ${formatRupiah(summary.expense)}`, 14, 50);
  doc.text(`Laba / Rugi Bersih: ${formatRupiah(summary.profit)}`, 14, 58);
  doc.text(`Total Transaksi: ${summary.totalTransactions}`, 14, 66);

  autoTable(doc, {
    startY: 78,
    head: [["Tanggal", "Keterangan", "Jenis", "Kategori", "Nominal"]],
    body: transactions.map((item) => [
      item.date,
      item.title,
      item.type === "income" ? "Pemasukan" : "Pengeluaran",
      item.category,
      formatRupiah(item.amount),
    ]),
  });

  const fileName = periodLabel
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "");

  doc.save(`laporan-akuntansi-${fileName}.pdf`);
}