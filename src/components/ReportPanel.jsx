import { formatRupiah } from "../utils/formatRupiah";

function ReportPanel({ summary, periodLabel }) {
  return (
    <section id="laporan" className="panel report-panel">
      <div className="panel-header">
        <h2>Laporan Laba Rugi Sederhana</h2>
        <p>Periode laporan: {periodLabel}</p>
      </div>

      <div className="report-table">
        <div>
          <span>Total Transaksi</span>
          <strong>{summary.totalTransactions}</strong>
        </div>

        <div>
          <span>Pendapatan</span>
          <strong>{formatRupiah(summary.income)}</strong>
        </div>

        <div>
          <span>Beban / Pengeluaran</span>
          <strong>{formatRupiah(summary.expense)}</strong>
        </div>

        <div className="total-row">
          <span>Laba / Rugi Bersih</span>
          <strong>{formatRupiah(summary.profit)}</strong>
        </div>
      </div>
    </section>
  );
}

export default ReportPanel;