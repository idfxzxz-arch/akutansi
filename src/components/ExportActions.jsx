function ExportActions({ onExportPdf, onExportExcel }) {
  return (
    <section className="panel export-panel">
      <div>
        <h2>Export Laporan</h2>
        <p>Download laporan PDF atau data transaksi Excel.</p>
      </div>

      <div className="export-buttons">
        <button className="pdf-btn" onClick={onExportPdf}>
          Export PDF
        </button>

        <button className="excel-btn" onClick={onExportExcel}>
          Export Excel
        </button>
      </div>
    </section>
  );
}

export default ExportActions;