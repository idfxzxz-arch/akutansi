import { formatRupiah } from "../utils/formatRupiah";

function SummaryCards({ summary }) {
  return (
    <section className="summary-grid">
      <div className="summary-card income">
        <p>Total Pemasukan</p>
        <h3>{formatRupiah(summary.income)}</h3>
      </div>

      <div className="summary-card expense">
        <p>Total Pengeluaran</p>
        <h3>{formatRupiah(summary.expense)}</h3>
      </div>

      <div className="summary-card balance">
        <p>Laba / Rugi</p>
        <h3>{formatRupiah(summary.profit)}</h3>
      </div>
    </section>
  );
}

export default SummaryCards;