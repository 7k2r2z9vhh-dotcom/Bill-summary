import { useState } from "react";

const initialData = [
  { id: 1, date: "6/1/69",  amount: 15000.00, description: "ค่าล้อสัมภาระ ปี 68",                   category: "ค้างปี 68" },
  { id: 2, date: "16/1/69", amount: 1926.00,  description: "กา. คุณหมาเครื่องตู้หน้า 2H",           category: "ค่าซ่อม" },
  { id: 3, date: "16/1/69", amount: 153.00,   description: "สร. บ้านคนงาน",                         category: "บ้านคนงาน" },
  { id: 4, date: "19/1/69", amount: 1920.00,  description: "สร. เหล็กเพิ่ก บนปลวก หน้าหม้อน้ำ",   category: "วัสดุ" },
  { id: 5, date: "23/1/69", amount: 2400.00,  description: "แม่สร. น้ำ + ไฟ",                       category: "สาธารณูปโภค" },
  { id: 6, date: "23/1/69", amount: 26.75,    description: "สร. ไฟ",                                 category: "สาธารณูปโภค" },
  { id: 7, date: "10/2/69", amount: 92.68,    description: "สร. ไฟ",                                 category: "สาธารณูปโภค" },
  { id: 8, date: "12/2/69", amount: 900.00,   description: "สร. เหล็กสแลกลูก ๓จุก บนปลวกหม้อน้ำ", category: "วัสดุ" },
  { id: 9, date: "13/2/69", amount: 1251.90,  description: "สร. Net Php54",                          category: "ค่าเน็ต" },
  { id:10, date: "13/2/69", amount: 2568.00,  description: "สร. Net",                                category: "ค่าเน็ต" },
  { id:11, date: "21/2/69", amount: 3010.00,  description: "ค่าน้ำ + ไฟ",                           category: "สาธารณูปโภค" },
];

const catColor = {
  "ค้างปี 68":    "#f97316",
  "ค่าซ่อม":      "#ef4444",
  "บ้านคนงาน":   "#8b5cf6",
  "วัสดุ":        "#3b82f6",
  "สาธารณูปโภค": "#10b981",
  "ค่าเน็ต":      "#06b6d4",
  "อื่นๆ":        "#6b7280",
};

const categories = Object.keys(catColor);

const fmt = (n) => Number(n).toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const emptyForm = { date: "", amount: "", description: "", category: "อื่นๆ" };

export default function App() {
  const [rows, setRows] = useState(initialData);
  const [nextId, setNextId] = useState(12);
  const [showModal, setShowModal] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState(null);

  const total = rows.reduce((s, r) => s + Number(r.amount), 0);

  const openAdd = () => { setForm(emptyForm); setEditRow(null); setShowModal(true); };
  const openEdit = (r) => { setForm({ date: r.date, amount: r.amount, description: r.description, category: r.category }); setEditRow(r.id); setShowModal(true); };

  const saveForm = () => {
    if (!form.date || !form.amount || !form.description) return;
    if (editRow !== null) {
      setRows(rows.map(r => r.id === editRow ? { ...r, ...form, amount: Number(form.amount) } : r));
    } else {
      setRows([...rows, { id: nextId, ...form, amount: Number(form.amount) }]);
      setNextId(nextId + 1);
    }
    setShowModal(false);
  };

  const confirmDelete = (id) => setDeleteId(id);
  const doDelete = () => { setRows(rows.filter(r => r.id !== deleteId)); setDeleteId(null); };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#0f172a 0%,#1e293b 60%,#0f2027 100%)", fontFamily: "'Sarabun', sans-serif", padding: "24px 16px" }}>
      <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ maxWidth: 820, margin: "0 auto 28px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ color: "#94a3b8", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>ใบสรุปค่าใช้จ่าย</div>
            <h1 style={{ color: "#f8fafc", fontSize: 28, fontWeight: 700, margin: 0 }}>บิลเบิกเงิน</h1>
            <div style={{ color: "#64748b", fontSize: 13, marginTop: 4 }}>ม.ค. – ก.พ. 2569</div>
          </div>
          <button onClick={openAdd} style={{ background: "linear-gradient(135deg,#3b82f6,#06b6d4)", color: "#fff", border: "none", borderRadius: 12, padding: "10px 22px", fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 20px #3b82f640" }}>
            <span style={{ fontSize: 20, lineHeight: 1 }}>+</span> เพิ่มรายการ
          </button>
        </div>

        {/* Summary cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 20 }}>
          {[
            { label: "รวมทั้งสิ้น", value: `฿${fmt(total)}`, accent: "#3b82f6" },
            { label: "จำนวนรายการ", value: `${rows.length} รายการ`, accent: "#10b981" },
            { label: "เฉลี่ย/รายการ", value: rows.length ? `฿${fmt(total / rows.length)}` : "฿0.00", accent: "#f97316" },
          ].map((c, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: "14px 18px", border: `1px solid ${c.accent}33`, backdropFilter: "blur(8px)" }}>
              <div style={{ color: "#94a3b8", fontSize: 12, marginBottom: 6 }}>{c.label}</div>
              <div style={{ color: c.accent, fontSize: 18, fontWeight: 700 }}>{c.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ maxWidth: 820, margin: "0 auto", background: "rgba(255,255,255,0.04)", borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden", backdropFilter: "blur(12px)" }}>
        {/* Table header */}
        <div style={{ display: "grid", gridTemplateColumns: "50px 100px 1fr 110px 100px 80px", padding: "12px 16px", background: "rgba(255,255,255,0.06)", color: "#64748b", fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div>#</div><div>วันที่</div><div>รายการ</div><div>หมวด</div><div style={{ textAlign: "right" }}>จำนวนเงิน</div><div style={{ textAlign: "center" }}>จัดการ</div>
        </div>

        {rows.map((r, i) => (
          <div key={r.id} style={{ display: "grid", gridTemplateColumns: "50px 100px 1fr 110px 100px 80px", padding: "13px 16px", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.04)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)", transition: "background .15s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(59,130,246,0.08)"}
            onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)"}>
            <div style={{ color: "#475569", fontSize: 13 }}>{i + 1}</div>
            <div style={{ color: "#94a3b8", fontSize: 13 }}>{r.date}</div>
            <div style={{ color: "#e2e8f0", fontSize: 14 }}>{r.description}</div>
            <div>
              <span style={{ background: `${catColor[r.category] || catColor["อื่นๆ"]}22`, color: catColor[r.category] || catColor["อื่นๆ"], borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 600, border: `1px solid ${catColor[r.category] || catColor["อื่นๆ"]}44` }}>{r.category}</span>
            </div>
            <div style={{ color: "#f8fafc", fontSize: 14, fontWeight: 600, textAlign: "right" }}>฿{fmt(r.amount)}</div>
            <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
              <button onClick={() => openEdit(r)} style={{ background: "rgba(59,130,246,0.15)", color: "#60a5fa", border: "1px solid #3b82f630", borderRadius: 8, width: 30, height: 30, cursor: "pointer", fontSize: 14 }}>✏️</button>
              <button onClick={() => confirmDelete(r.id)} style={{ background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid #ef444430", borderRadius: 8, width: 30, height: 30, cursor: "pointer", fontSize: 14 }}>🗑</button>
            </div>
          </div>
        ))}

        {/* Total row */}
        <div style={{ display: "grid", gridTemplateColumns: "50px 100px 1fr 110px 100px 80px", padding: "14px 16px", background: "rgba(59,130,246,0.12)", borderTop: "2px solid #3b82f640" }}>
          <div /><div /><div style={{ color: "#93c5fd", fontWeight: 700, fontSize: 15 }}>รวมทั้งสิ้น</div><div />
          <div style={{ color: "#60a5fa", fontWeight: 700, fontSize: 16, textAlign: "right" }}>฿{fmt(total)}</div>
          <div />
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, backdropFilter: "blur(4px)" }}>
          <div style={{ background: "#1e293b", borderRadius: 20, padding: 28, width: "min(92vw, 440px)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 25px 60px rgba(0,0,0,0.6)" }}>
            <h2 style={{ color: "#f8fafc", fontWeight: 700, fontSize: 20, margin: "0 0 20px" }}>{editRow ? "แก้ไขรายการ" : "เพิ่มรายการใหม่"}</h2>
            {[
              { label: "วันที่", key: "date", placeholder: "เช่น 6/1/69", type: "text" },
              { label: "จำนวนเงิน (บาท)", key: "amount", placeholder: "0.00", type: "number" },
              { label: "รายการ", key: "description", placeholder: "รายละเอียด...", type: "text" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 14 }}>
                <label style={{ color: "#94a3b8", fontSize: 13, display: "block", marginBottom: 6 }}>{f.label}</label>
                <input type={f.type} value={form[f.key]} placeholder={f.placeholder}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  style={{ width: "100%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 14px", color: "#f8fafc", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}
            <div style={{ marginBottom: 20 }}>
              <label style={{ color: "#94a3b8", fontSize: 13, display: "block", marginBottom: 6 }}>หมวดหมู่</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                style={{ width: "100%", background: "#1e293b", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 14px", color: "#f8fafc", fontSize: 14, outline: "none" }}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, background: "rgba(255,255,255,0.06)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "11px 0", fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>ยกเลิก</button>
              <button onClick={saveForm} style={{ flex: 2, background: "linear-gradient(135deg,#3b82f6,#06b6d4)", color: "#fff", border: "none", borderRadius: 12, padding: "11px 0", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>{editRow ? "บันทึกการแก้ไข" : "เพิ่มรายการ"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId !== null && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, backdropFilter: "blur(4px)" }}>
          <div style={{ background: "#1e293b", borderRadius: 20, padding: 28, width: "min(90vw, 360px)", border: "1px solid rgba(239,68,68,0.3)", textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🗑️</div>
            <h3 style={{ color: "#f8fafc", margin: "0 0 8px" }}>ลบรายการนี้?</h3>
            <p style={{ color: "#64748b", fontSize: 14, margin: "0 0 20px" }}>ไม่สามารถเรียกคืนได้</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setDeleteId(null)} style={{ flex: 1, background: "rgba(255,255,255,0.06)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "11px 0", fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>ยกเลิก</button>
              <button onClick={doDelete} style={{ flex: 1, background: "linear-gradient(135deg,#ef4444,#dc2626)", color: "#fff", border: "none", borderRadius: 12, padding: "11px 0", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>ลบ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
