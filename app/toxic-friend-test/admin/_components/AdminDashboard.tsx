"use client";
import React, { useState } from "react";
import { TOXIC_FRIEND_QUESTIONS } from "../../_data/questions";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"analytics" | "questions">("analytics");

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8 animate-in fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Diagnostics Admin</h1>
          <p className="text-slate-500 font-medium">Manage the Toxic Friendship Battery</p>
        </div>
        <div className="flex gap-2 bg-slate-200 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab("analytics")}
            className={`px-4 py-2 rounded-md font-bold text-sm transition-all ${activeTab === "analytics" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            Analytics
          </button>
          <button 
            onClick={() => setActiveTab("questions")}
            className={`px-4 py-2 rounded-md font-bold text-sm transition-all ${activeTab === "questions" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            Question Bank
          </button>
        </div>
      </div>

      {activeTab === "analytics" ? <AnalyticsView /> : <QuestionsView />}
    </div>
  );
}

function AnalyticsView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Completions" value="1,284" trend="+12% this week" />
        <StatCard title="Conversion Rate" value="8.4%" trend="Free to Premium" />
        <StatCard title="Avg. Completion Time" value="14m 20s" trend="Optimal for 88 items" />
        <StatCard title="Safety Flags Triggered" value="42" trend="3.2% of sessions" alert />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Module Mean Scores (Population)</h3>
        <div className="space-y-4">
          <Bar label="Friendship Victimization" score={42} />
          <Bar label="Negative Quality" score={68} />
          <Bar label="Relational Aggression" score={55} />
          <Bar label="Manipulation & Control" score={48} />
        </div>
      </div>
    </div>
  );
}

function QuestionsView() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <h3 className="font-bold text-slate-800">Item Bank Version Control</h3>
        <button className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-slate-800">
          + Add New Item
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-500">
            <tr>
              <th className="p-4 font-bold">ID</th>
              <th className="p-4 font-bold">Module & Subscale</th>
              <th className="p-4 font-bold w-1/2">Question Text</th>
              <th className="p-4 font-bold text-center">Weight</th>
              <th className="p-4 font-bold text-center">Hard Flag</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {TOXIC_FRIEND_QUESTIONS.slice(0, 15).map((q) => (
              <tr key={q.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 text-slate-500 font-mono text-xs">{q.id}</td>
                <td className="p-4">
                  <span className="block font-bold text-slate-800">{q.module}</span>
                  <span className="text-xs text-slate-500">{q.subscale}</span>
                </td>
                <td className="p-4 text-slate-700">{q.text}</td>
                <td className="p-4 text-center font-mono">{q.weight.toFixed(1)}</td>
                <td className="p-4 text-center">
                  {q.hardFlag ? <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">YES</span> : <span className="text-slate-300">-</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 text-center text-sm text-slate-500 bg-slate-50 border-t border-slate-100">
          Showing first 15 of {TOXIC_FRIEND_QUESTIONS.length} items. 
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, alert }: { title: string, value: string, trend: string, alert?: boolean }) {
  return (
    <div className={`p-6 rounded-2xl border ${alert ? 'bg-red-50 border-red-100' : 'bg-white border-slate-200'} shadow-sm`}>
      <h4 className="text-sm font-bold text-slate-500 mb-2">{title}</h4>
      <div className={`text-3xl font-extrabold ${alert ? 'text-red-700' : 'text-slate-900'} mb-1`}>{value}</div>
      <div className={`text-xs font-medium ${alert ? 'text-red-500' : 'text-slate-400'}`}>{trend}</div>
    </div>
  );
}

function Bar({ label, score }: { label: string, score: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm font-bold text-slate-700 mb-1">
        <span>{label}</span>
        <span>{score}/100</span>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-slate-400 rounded-full" style={{ width: `${score}%` }}></div>
      </div>
    </div>
  );
}
