"use client";
import React from "react";

export default function SafetyModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 border-t-8 border-red-600">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-4 flex items-center gap-2">
          <span>⚠️</span> Safety First
        </h2>
        <p className="text-slate-700 text-lg mb-6 leading-relaxed">
          You indicated that you feel afraid, trapped, or worried about your safety. 
          Your wellbeing is the absolute highest priority. 
        </p>
        <p className="text-slate-700 mb-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
          If you feel you are in immediate danger, please exit this page and contact local emergency services or a trusted support system immediately.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="https://www.thehotline.org/" target="_blank" rel="noopener noreferrer" className="flex-1 bg-red-600 text-white font-bold py-3 px-4 rounded-xl text-center hover:bg-red-700 transition-colors">
            Get Help Now
          </a>
          <button onClick={onClose} className="flex-1 bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-xl text-center hover:bg-slate-300 transition-colors">
            I am safe, continue
          </button>
        </div>
      </div>
    </div>
  );
}
