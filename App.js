import React, { useState } from "react";

export default function App() {
  const [data, setData] = useState("");
  const [tableData, setTableData] = useState([]);
  const [cleanedData, setCleanedData] = useState([]);
  const [isPro, setIsPro] = useState(false);
  const [usage, setUsage] = useState(0);

  const FREE_LIMIT = 3;

  const checkLimit = () => {
    if (!isPro && usage >= FREE_LIMIT) {
      alert("🚫 Free limit reached. Upgrade to Pro!");
      return false;
    }
    setUsage(usage + 1);
    return true;
  };

  const parseData = () => {
    if (!data.trim()) return;
    if (!checkLimit()) return;

    const rows = data.trim().split("\n").map(r => r.split(","));
    const headers = rows[0];

    const json = rows.slice(1).map(r => {
      let obj = {};
      headers.forEach((h, i) => obj[h] = r[i]);
      return obj;
    });

    setTableData(json);

    const cleaned = json.map(row =>
      Object.fromEntries(
        Object.entries(row).map(([k, v]) => [k, v?.trim()])
      )
    );

    setCleanedData(cleaned);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-indigo-900 text-white p-6">

      {/* HERO */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold">🚀 Excel Cleaner</h1>
        <p className="text-gray-300 mt-2">Clean messy Excel data instantly ⚡</p>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl max-w-3xl mx-auto mb-10">

        <p className="text-sm text-gray-300 mb-2">
          Free usage: {usage}/{FREE_LIMIT}
        </p>

        <textarea
          value={data}
          onChange={(e)=>setData(e.target.value)}
          className="w-full p-3 rounded-lg text-black mb-4"
          placeholder="Paste your CSV data here..."
        />

        <div className="flex gap-4">
          <button
            onClick={parseData}
            className="bg-blue-600 px-5 py-2 rounded-lg hover:scale-105 transition"
          >
            Preview
          </button>

          <button
            onClick={()=>setIsPro(true)}
            className="bg-yellow-400 text-black px-5 py-2 rounded-lg hover:scale-105 transition"
          >
            Upgrade ₹299 🔒
          </button>
        </div>
      </div>

      {/* TABLES */}
      {tableData.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">

          {/* BEFORE */}
          <div className="bg-white text-black p-4 rounded-xl shadow-lg">
            <h3 className="font-bold mb-2">Before</h3>
            <table className="w-full border">
              <thead>
                <tr>
                  {Object.keys(tableData[0]).map((k,i)=>(<th key={i} className="border p-2">{k}</th>))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row,i)=>(
                  <tr key={i}>
                    {Object.values(row).map((v,j)=>(<td key={j} className="border p-2">{v}</td>))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* AFTER */}
          <div className={`bg-white text-black p-4 rounded-xl shadow-lg relative ${!isPro && "blur-sm"}`}>
            <h3 className="font-bold mb-2">After</h3>

            <table className="w-full border">
              <thead>
                <tr>
                  {Object.keys(cleanedData[0]).map((k,i)=>(<th key={i} className="border p-2">{k}</th>))}
                </tr>
              </thead>
              <tbody>
                {cleanedData.map((row,i)=>(
                  <tr key={i}>
                    {Object.values(row).map((v,j)=>(<td key={j} className="border p-2">{v}</td>))}
                  </tr>
                ))}
              </tbody>
            </table>

            {!isPro && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={()=>setIsPro(true)}
                  className="bg-yellow-400 px-4 py-2 rounded-lg font-bold"
                >
                  Unlock Premium 🔒
                </button>
              </div>
            )}
          </div>

        </div>
      )}

      {/* FEATURES SECTION */}
      <div className="max-w-5xl mx-auto mt-12">

        {/* FREE FEATURES */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-green-400 mb-4 text-center">
            🟢 Free Features
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/10 p-4 rounded-lg">✂️ Trim Extra Spaces</div>
            <div className="bg-white/10 p-4 rounded-lg">🧹 Remove Duplicates</div>
            <div className="bg-white/10 p-4 rounded-lg">🔍 Find & Replace</div>
            <div className="bg-white/10 p-4 rounded-lg">🔠 Format Text (Upper/Lower)</div>
          </div>
        </div>

        {/* PREMIUM FEATURES */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
            💎 Premium Features
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/10 p-4 rounded-lg flex justify-between">
              🤖 AI Data Cleaning <span>🔒</span>
            </div>
            <div className="bg-white/10 p-4 rounded-lg flex justify-between">
              💾 Save Data History <span>🔒</span>
            </div>
            <div className="bg-white/10 p-4 rounded-lg flex justify-between">
              ⚡ Unlimited Usage <span>🔒</span>
            </div>
            <div className="bg-white/10 p-4 rounded-lg flex justify-between">
              📊 Smart Insights <span>🔒</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}