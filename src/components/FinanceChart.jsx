import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { formatRupiah } from "../utils/formatRupiah";

function FinanceChart({ transactions }) {
  const chartData = Object.values(
    transactions.reduce((result, item) => {
      if (!result[item.date]) {
        result[item.date] = {
          date: item.date,
          pemasukan: 0,
          pengeluaran: 0,
        };
      }

      if (item.type === "income") {
        result[item.date].pemasukan += item.amount;
      } else {
        result[item.date].pengeluaran += item.amount;
      }

      return result;
    }, {})
  ).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <section className="panel chart-panel">
      <div className="panel-header">
        <h2>Grafik Pemasukan & Pengeluaran</h2>
        <p>Visualisasi transaksi berdasarkan periode yang dipilih.</p>
      </div>

      {chartData.length === 0 ? (
        <div className="empty">Belum ada data untuk ditampilkan.</div>
      ) : (
        <div className="chart-box">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value) => `${value / 1000}k`} />
              <Tooltip formatter={(value) => formatRupiah(value)} />
              <Legend />
              <Bar dataKey="pemasukan" fill="#16a34a" radius={[8, 8, 0, 0]} />
              <Bar dataKey="pengeluaran" fill="#dc2626" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}

export default FinanceChart;