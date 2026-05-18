import { formatRupiah } from "../utils/formatRupiah";

function TransactionList({
  transactions,
  filterType,
  setFilterType,
  onEdit,
  onDelete,
}) {
  return (
    <div className="panel">
      <div className="panel-header row">
        <div>
          <h2>Riwayat Transaksi</h2>
          <p>Daftar transaksi yang sudah dicatat.</p>
        </div>

        <select
          className="filter"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">Semua</option>
          <option value="income">Pemasukan</option>
          <option value="expense">Pengeluaran</option>
        </select>
      </div>

      <div className="transaction-list">
        {transactions.length === 0 ? (
          <div className="empty">Belum ada transaksi.</div>
        ) : (
          transactions.map((item) => (
            <div className="transaction-item" key={item.id}>
              <div className="transaction-left">
                <div
                  className={
                    item.type === "income"
                      ? "transaction-icon income-icon"
                      : "transaction-icon expense-icon"
                  }
                >
                  {item.type === "income" ? "↗" : "↘"}
                </div>

                <div>
                  <h3>{item.title}</h3>
                  <p>
                    {item.category} • {item.date}
                  </p>
                </div>
              </div>

              <div className="transaction-right">
                <strong
                  className={
                    item.type === "income"
                      ? "amount-income"
                      : "amount-expense"
                  }
                >
                  {item.type === "income" ? "+" : "-"}
                  {formatRupiah(item.amount)}
                </strong>

                <div className="action-buttons">
                  <button
                    className="edit-btn"
                    onClick={() => onEdit(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => onDelete(item.id)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TransactionList;