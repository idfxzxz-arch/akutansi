function TransactionForm({ form, setForm, onSubmit, editId, onCancelEdit }) {
  return (
    <div className="panel">
      <div className="panel-header">
        <h2>{editId ? "Edit Transaksi" : "Tambah Transaksi"}</h2>
        <p>
          {editId
            ? "Ubah data transaksi yang sudah dipilih."
            : "Masukkan data pemasukan atau pengeluaran."}
        </p>
      </div>

      <form onSubmit={onSubmit} className="form">
        <div className="type-switch">
          <button
            type="button"
            className={form.type === "income" ? "active income-btn" : ""}
            onClick={() =>
              setForm({
                ...form,
                type: "income",
                category: "Penjualan",
              })
            }
          >
            Pemasukan
          </button>

          <button
            type="button"
            className={form.type === "expense" ? "active expense-btn" : ""}
            onClick={() =>
              setForm({
                ...form,
                type: "expense",
                category: "Operasional",
              })
            }
          >
            Pengeluaran
          </button>
        </div>

        <label>
          Keterangan
          <input
            type="text"
            placeholder="Contoh: Penjualan produk"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </label>

        <label>
          Kategori
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {form.type === "income" ? (
              <>
                <option>Penjualan</option>
                <option>Modal</option>
                <option>Investasi</option>
                <option>Lain-lain</option>
              </>
            ) : (
              <>
                <option>Operasional</option>
                <option>Gaji</option>
                <option>Sewa</option>
                <option>Transport</option>
                <option>Listrik / Internet</option>
                <option>Lain-lain</option>
              </>
            )}
          </select>
        </label>

        <label>
          Nominal
          <input
            type="number"
            placeholder="Contoh: 50000"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
        </label>

        <label>
          Tanggal
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </label>

        <button className="submit-btn" type="submit">
          {editId ? "Update Transaksi" : "Simpan Transaksi"}
        </button>

        {editId && (
          <button
            type="button"
            className="cancel-btn"
            onClick={onCancelEdit}
          >
            Batal Edit
          </button>
        )}
      </form>
    </div>
  );
}

export default TransactionForm;