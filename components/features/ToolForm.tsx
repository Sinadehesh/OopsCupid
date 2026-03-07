"use client";

import React, { useState } from "react";
import CTA from "../ui/CTA";

interface ToolFormProps {
  toolName: string;
  endpoint: string;
  placeholderText: string;
}

interface ToolResult {
  error?: string;
  summary?: string;
  themes?: string[];
  verdict?: string;
}

export default function ToolForm({
  toolName,
  endpoint,
  placeholderText,
}: ToolFormProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ToolResult | null>(null);

  const analyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
      setResult({ error: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">

      {/* Input area */}
      {!result && !loading && (
        <div className="flex flex-col gap-4">
          <label
            htmlFor="tool-input"
            className="text-[#334B63] font-semibold text-base"
          >
            Paste the text below — we'll do the reading between the lines.
          </label>
          <textarea
            id="tool-input"
            rows={6}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholderText}
            className="w-full rounded-2xl border border-[rgba(51,75,99,0.15)] bg-[#FFFDFC] px-5 py-4 text-[#334B63] text-base leading-relaxed placeholder:text-[#8A6D85]/60 focus:outline-none focus:ring-2 focus:ring-[#FFB8A1] focus:border-transparent resize-none transition-smooth"
          />
          <CTA
            text={`Analyze with ${toolName}`}
            onClick={analyze}
            variant="primary"
            showArrow
            disabled={!input.trim()}
            className="self-start"
          />
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center gap-4 py-12 text-center">
          <div className="h-8 w-8 rounded-full border-2 border-[#FFB8A1] border-t-transparent animate-spin" />
          <p className="text-[#5E6E79] text-base font-normal">
            Reading between the lines…
          </p>
        </div>
      )}

      {/* Result state */}
      {result && !loading && (
        <div className="flex flex-col gap-6 rounded-2xl border border-[rgba(51,75,99,0.10)] bg-[#FFFDFC] px-8 py-8">
          <h3 className="text-[#334B63] text-2xl font-semibold tracking-tight">
            {toolName} Result
          </h3>

          {result.error ? (
            <p className="text-red-500 text-sm">{result.error}</p>
          ) : (
            <>
              {result.summary && (
                <p className="text-[#5E6E79] text-base leading-relaxed">
                  {result.summary}
                </p>
              )}

              {result.themes && result.themes.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p className="text-[#334B63] text-sm font-semibold uppercase tracking-widest">
                    Key Themes Detected
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {result.themes.map((theme, i) => (
                      <li
                        key={i}
                        className="rounded-full bg-[#F3ECEB] px-4 py-1.5 text-sm text-[#334B63] font-medium"
                      >
                        {theme}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.verdict && (
                <div className="rounded-xl bg-[#F9F4F4] px-6 py-4 border border-[rgba(51,75,99,0.08)]">
                  <p className="text-[#334B63] text-sm font-semibold uppercase tracking-widest mb-1">
                    Verdict
                  </p>
                  <p className="text-[#334B63] text-base font-semibold">
                    {result.verdict}
                  </p>
                </div>
              )}
            </>
          )}

          <CTA
            text="Analyze another"
            variant="secondary"
            onClick={() => {
              setResult(null);
              setInput("");
            }}
            className="self-start"
          />
        </div>
      )}
    </div>
  );
}
