import { useEffect, useMemo, useState } from "react";
import "./index.css";

import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import SummaryCards from "./components/SummaryCards";
import DateFilter from "./components/DateFilter";
import FinanceChart from "./components/FinanceChart";
import ExportActions from "./components/ExportActions";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import ReportPanel from "./components/ReportPanel";

import { initialTransactions } from "./data/initialTransactions";
import { exportReportPdf } from "./utils/exportPdf";
import { exportTransactionsExcel } from "./utils/exportExcel";

function App() {
  const today = new Date().toISOString().split("T")[0];
  const currentMonth = today.slice(0, 7);

  const [isLogin, setIsLogin] = useState(() => {
    return localStorage.getItem("accounting-auth") === "true";
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("accounting-transactions");
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [form, setForm] = useState({
    type: "income",
    title: "",
    category: "Penjualan",
    amount: "",
    date: today,
  });

  const [filterType, setFilterType] = useState("all");
  const [period, setPeriod] = useState("all");
  const [dateRange, setDateRange] = useState({
    start: today,
    end: today,
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      "accounting-transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  const periodTransactions = useMemo(() => {
    return transactions.filter((item) => {
      if (period === "all") return true;

      if (period === "today") {
        return item.date === today;
      }

      if (period === "month") {
        return item.date.startsWith(currentMonth);
      }

      if (period === "custom") {
        return item.date >= dateRange.start && item.date <= dateRange.end;
      }

      return true;
    });
  }, [transactions, period, dateRange, today, currentMonth]);

  const filteredTransactions = periodTransactions.filter((item) => {
    if (filterType === "all") return true;
    return item.type === filterType;
  });

  const summary = useMemo(() => {
    const income = periodTransactions
      .filter((item) => item.type === "income")
      .reduce((total, item) => total + item.amount, 0);

    const expense = periodTransactions
      .filter((item) => item.type === "expense")
      .reduce((total, item) => total + item.amount, 0);

    return {
      income,
      expense,
      balance: income - expense,
      profit: income - expense,
      totalTransactions: periodTransactions.length,
    };
  }, [periodTransactions]);

  const periodLabel = useMemo(() => {
    if (period === "today") return "Hari Ini";
    if (period === "month") return "Bulan Ini";
    if (period === "custom") {
      return `${dateRange.start} sampai ${dateRange.end}`;
    }

    return "Semua Periode";
  }, [period, dateRange]);

  const handleLogin = (username, password) => {
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("accounting-auth", "true");
      setIsLogin(true);
      return;
    }

    alert("Username atau password salah.");
  };

  const handleLogout = () => {
    const confirmLogout = confirm("Yakin ingin logout?");
    if (!confirmLogout) return;

    localStorage.removeItem("accounting-auth");
    setIsLogin(false);
  };

  const resetForm = () => {
    setForm({
      type: "income",
      title: "",
      category: "Penjualan",
      amount: "",
      date: today,
    });

    setEditId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Keterangan transaksi wajib diisi.");
      return;
    }

    if (!form.amount || Number(form.amount) <= 0) {
      alert("Nominal transaksi harus lebih dari 0.");
      return;
    }

    if (editId) {
      setTransactions(
        transactions.map((item) =>
          item.id === editId
            ? {
                ...item,
                type: form.type,
                title: form.title,
                category: form.category,
                amount: Number(form.amount),
                date: form.date,
              }
            : item
        )
      );

      resetForm();
      return;
    }

    const newTransaction = {
      id: Date.now(),
      type: form.type,
      title: form.title,
      category: form.category,
      amount: Number(form.amount),
      date: form.date,
    };

    setTransactions([newTransaction, ...transactions]);
    resetForm();
  };

  const editTransaction = (transaction) => {
    setEditId(transaction.id);

    setForm({
      type: transaction.type,
      title: transaction.title,
      category: transaction.category,
      amount: transaction.amount.toString(),
      date: transaction.date,
    });

    window.location.href = "#transaksi";
  };

  const deleteTransaction = (id) => {
    const confirmDelete = confirm("Hapus transaksi ini?");
    if (!confirmDelete) return;

    setTransactions(transactions.filter((item) => item.id !== id));

    if (editId === id) {
      resetForm();
    }
  };

  const handleExportPdf = () => {
    if (periodTransactions.length === 0) {
      alert("Belum ada transaksi untuk diexport.");
      return;
    }

    exportReportPdf({
      summary,
      periodLabel,
      transactions: periodTransactions,
    });
  };

  const handleExportExcel = () => {
    if (filteredTransactions.length === 0) {
      alert("Belum ada transaksi untuk diexport.");
      return;
    }

    exportTransactionsExcel(filteredTransactions);
  };

  if (!isLogin) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <Sidebar onLogout={handleLogout} />

      <main className="main">
        <Hero balance={summary.balance} />

        <SummaryCards summary={summary} />

        <DateFilter
          period={period}
          setPeriod={setPeriod}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />

        <FinanceChart transactions={periodTransactions} />

        <ExportActions
          onExportPdf={handleExportPdf}
          onExportExcel={handleExportExcel}
        />

        <section id="transaksi" className="content-grid">
          <TransactionForm
            form={form}
            setForm={setForm}
            onSubmit={handleSubmit}
            editId={editId}
            onCancelEdit={resetForm}
          />

          <TransactionList
            transactions={filteredTransactions}
            filterType={filterType}
            setFilterType={setFilterType}
            onEdit={editTransaction}
            onDelete={deleteTransaction}
          />
        </section>

        <ReportPanel summary={summary} periodLabel={periodLabel} />
      </main>
    </div>
  );
}

export default App;