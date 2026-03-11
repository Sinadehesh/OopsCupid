"use client";
import React, { useEffect, useState } from "react";

export default function SharePrintButtons({ url = "", title = "My Psychological Profile" }) {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleDownload = () => {
    window.print();
  };

  const handleShare = async () => {
    const shareUrl = url ? `https://oopscupid.com${url}` : currentUrl;
    const text = `I just unlocked my psychological profile on OopsCupid. Discover yours here:`;
    
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
      } catch (err) {
        console.log("Share canceled", err);
      }
    } else {
      navigator.clipboard.writeText(`${text} ${shareUrl}`);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="py-6 flex flex-col sm:flex-row items-center justify-center gap-4 print:hidden w-full my-4">
      <button onClick={handleDownload} className="w-full sm:w-auto bg-slate-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-sm focus:outline-none focus:ring-4 focus:ring-slate-300 text-sm md:text-base">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
        Save as PDF
      </button>
      <button onClick={handleShare} className="w-full sm:w-auto bg-[#00A6ED] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#008fcc] transition-all flex items-center justify-center gap-2 shadow-sm focus:outline-none focus:ring-4 focus:ring-[#00A6ED]/40 text-sm md:text-base">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
        Share Profile
      </button>
    </div>
  );
}