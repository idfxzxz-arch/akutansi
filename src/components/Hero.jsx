import { formatRupiah } from "../utils/formatRupiah";

function Hero({ balance }) {
  return (
    <section id="dashboard" className="hero">
      <div>
        <p className="badge">Dashboard Keuangan</p>
        <h2>Aplikasi Akuntansi Sederhana</h2>
        <p>
          Catat pemasukan dan pengeluaran usaha, pantau saldo, serta lihat
          laporan laba rugi secara cepat.
        </p>
      </div>

      <div className="hero-card">
        <span>Saldo Saat Ini</span>
        <strong>{formatRupiah(balance)}</strong>
      </div>
    </section>
  );
}

export default Hero;