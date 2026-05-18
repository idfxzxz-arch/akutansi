function DateFilter({ period, setPeriod, dateRange, setDateRange }) {
  return (
    <section className="date-filter panel">
      <div className="panel-header row">
        <div>
          <h2>Filter Periode</h2>
          <p>Pilih periode laporan transaksi.</p>
        </div>
      </div>

      <div className="period-buttons">
        <button
          className={period === "all" ? "active" : ""}
          onClick={() => setPeriod("all")}
        >
          Semua
        </button>

        <button
          className={period === "today" ? "active" : ""}
          onClick={() => setPeriod("today")}
        >
          Hari Ini
        </button>

        <button
          className={period === "month" ? "active" : ""}
          onClick={() => setPeriod("month")}
        >
          Bulan Ini
        </button>

        <button
          className={period === "custom" ? "active" : ""}
          onClick={() => setPeriod("custom")}
        >
          Custom
        </button>
      </div>

      {period === "custom" && (
        <div className="custom-date-grid">
          <label>
            Dari Tanggal
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
            />
          </label>

          <label>
            Sampai Tanggal
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
            />
          </label>
        </div>
      )}
    </section>
  );
}

export default DateFilter;