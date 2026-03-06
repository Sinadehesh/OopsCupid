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

export default function ToolForm({ endpoint, placeholderText }: ToolFormProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ToolResult | null>(null);

  const analyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);

    // Fake delay
    await new Promise((r) => setTimeout(r, 1500));

    try {
      const res = await fetch(endpoint, {
        method: "POST",
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
    <div className="max-w-3xl mx-auto">
      <div className="bg-surface rounded-2xl shadow-sm border border-border p-6 md:p-8">
        <label htmlFor="toolInput" className="block text-lg font-semibold text-foreground mb-4">
          Paste the text here
        </label>
        <textarea
          id="toolInput"
          rows={6}
          className="block w-full rounded-xl border-border bg-background p-4 text-foreground focus:border-primary-500 focus:ring-primary-500 shadow-sm resize-none"
          placeholder={placeholderText}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="mt-6 flex justify-end">
          <CTA
            text={loading ? "Analyzing..." : "Analyze Now"}
            onClick={analyze}
            disabled={loading || !input.trim()}
          />
        </div>
      </div>

      {loading && (
        <div className="mt-8 p-8 text-center animate-pulse rounded-2xl bg-surface border border-border">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/70 font-medium">Our AI is reading between the lines...</p>
        </div>
      )}

      {result && !loading && (
        <div className="mt-8">
          <div className="rounded-2xl bg-primary-50 border border-primary-100 p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-foreground mb-4">Analysis Result</h3>
            {result.error ? (
              <p className="text-red-500">{result.error}</p>
            ) : (
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-foreground/80 mb-6">{result.summary}</p>
                
                <h4 className="font-semibold text-foreground mb-2">Key Themes Detected:</h4>
                <ul className="mb-6 space-y-2">
                  {result.themes?.map((theme: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-foreground/80">
                      <span className="w-2 h-2 rounded-full bg-accent-500" />
                      {theme}
                    </li>
                  ))}
                </ul>

                <h4 className="font-semibold text-foreground mb-2">Verdict:</h4>
                <div className="bg-white dark:bg-black/20 p-4 rounded-xl border border-border">
                  <p className="font-medium text-foreground">{result.verdict}</p>
                </div>
              </div>
            )}
            <div className="mt-8 flex justify-center">
              <CTA text="Analyze Another" variant="outline" onClick={() => { setResult(null); setInput(""); }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
