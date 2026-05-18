function Sidebar({ onLogout }) {
  return (
    <aside className="sidebar">
      <div>
        <div className="brand">
          <div className="brand-icon">📊</div>
          <div>
            <h1>Akuntansi</h1>
            <p>UMKM Web App</p>
          </div>
        </div>

        <nav className="sidebar-menu">
          <a href="#dashboard" className="active">
            Dashboard
          </a>
          <a href="#transaksi">Transaksi</a>
          <a href="#laporan">Laporan</a>
        </nav>
      </div>

      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;