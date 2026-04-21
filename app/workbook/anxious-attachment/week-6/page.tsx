'use client';

import React, { useState } from 'react';
import {
  Anchor,
  ArrowRight,
  ShieldCheck,
  BookHeart,
  CheckCircle2,
  Compass,
  Award,
  Sparkles,
  MapPin,
  HeartHandshake,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Design-system constants
   (mirrors Weeks 4 & 5 of the workbook)
───────────────────────────────────────────── */
const CARD =
  'rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-teal-100/40 border border-white/60 p-8 md:p-10';

const TEXTAREA =
  'w-full bg-white/80 border border-teal-200 rounded-2xl p-4 text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none resize-none shadow-inner transition-all';

/* checklist item data */
const CHECKLIST_ITEMS = [
  {
    key: 'consistent' as const,
    label: 'Consistency',
    description: "Their words match their actions. They don't disappear for days.",
  },
  {
    key: 'repairs' as const,
    label: 'Repair',
    description: "After a disagreement, they don't hold a grudge. They actively try to reconnect.",
  },
  {
    key: 'boundaries' as const,
    label: 'Boundaries',
    description: 'If you say "no," they accept it without punishing or guilt-tripping you.',
  },
  {
    key: 'vulnerable' as const,
    label: 'Emotional Access',
    description: 'They are willing to share their feelings and hear yours without defensiveness.',
  },
  {
    key: 'boring' as const,
    label: 'The "Boring" Test',
    description:
      "Your nervous system isn't constantly spiking. You feel calm (or even a bit bored) with them.",
  },
] as const;

type ChecklistKey = (typeof CHECKLIST_ITEMS)[number]['key'];

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export default function Week6EarnedSecurity() {
  // Safe Harbor Detector
  const [checklist, setChecklist] = useState<Record<ChecklistKey, boolean>>({
    consistent: false,
    repairs: false,
    boundaries: false,
    boring: false,
    vulnerable: false,
  });
  const safeHarborScore = Object.values(checklist).filter(Boolean).length;

  // Narrative Integrator
  const [step, setStep] = useState(1);
  const [oldBelief, setOldBelief] = useState('');
  const [objectiveContext, setObjectiveContext] = useState('');
  const [newIntegration, setNewIntegration] = useState('');
  const [isNarrativeSaved, setIsNarrativeSaved] = useState(false);

  // Manifesto
  const [manifesto, setManifesto] = useState('');
  const [isManifestoSaved, setIsManifestoSaved] = useState(false);

  const handleCheck = (key: ChecklistKey) =>
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSaveNarrative = () => {
    setIsNarrativeSaved(true);
    setTimeout(() => setIsNarrativeSaved(false), 3000);
  };

  const handleSaveManifesto = () => {
    setIsManifestoSaved(true);
    setTimeout(() => setIsManifestoSaved(false), 3000);
  };

  const shieldColor =
    safeHarborScore === 0
      ? 'text-slate-600'
      : safeHarborScore <= 2
      ? 'text-amber-400'
      : safeHarborScore <= 4
      ? 'text-teal-400'
      : 'text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]';

  const gaugeOffset = 565.48 - 565.48 * (safeHarborScore / 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50/30 to-slate-50 text-slate-800 font-sans pb-24">

      {/* ── Header ── */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        {/* Ambient glows */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-teal-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[380px] h-[380px] rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold tracking-widest uppercase border border-teal-200">
              Week 6 · Finale
            </span>
            <span className="text-teal-600 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            Cultivating{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">
              Earned Security
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Your attachment style is a blueprint, not a life sentence. Through consistency,
            coherent storytelling, and corrective relationships, you can rewire your brain for
            safety.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* ── 1. Psychoeducation ── */}
        <section className={CARD}>
          <h2 className="text-2xl font-bold text-slate-900 mb-5 flex items-center gap-3">
            <Award className="w-7 h-7 text-teal-500 shrink-0" />
            What is "Earned" Security?
          </h2>

          <div className="prose prose-slate prose-lg max-w-none mb-8">
            <p>
              Many adults reach a point where relationship patterns feel painfully familiar. If
              you've spent your life managing an anxious attachment style, you might fear that your
              childhood hardwired you for suffering. But the neuroscience of{' '}
              <strong>neuroplasticity</strong> proves otherwise.
            </p>
            <p>
              <strong>Earned Secure Attachment</strong> means developing a profound sense of
              emotional safety in relationships later in life,{' '}
              <em>even if early caregiving was inconsistent or traumatic.</em>
            </p>
          </div>

          <div className="bg-teal-50/80 border border-teal-100 rounded-2xl p-6">
            <h3 className="text-teal-900 font-bold text-base mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5 text-teal-600 shrink-0" />
              The Pathways to Security
            </h3>
            <ul className="space-y-3 text-sm text-teal-800">
              {[
                ['Corrective Relationship', 'Experiencing consistent attunement over time with a secure partner, friend, or therapist.'],
                ['Somatic Regulation', 'Teaching your body to pause and self-soothe instead of spiralling into "fight or flight."'],
                ['Narrative Coherence', 'The ability to tell a truthful, integrated story about your past without becoming overwhelmed by it.'],
              ].map(([title, body], i) => (
                <li key={title} className="flex gap-2">
                  <span className="font-bold shrink-0">{i + 1}.</span>
                  <span><strong>{title}:</strong> {body}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 2. Safe Harbor Detector ── */}
        <section className="rounded-[2rem] bg-slate-950 shadow-2xl border border-slate-800/60 p-8 md:p-10 relative overflow-hidden text-white">
          {/* Ambient glows */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl" />

          <h2 className="text-2xl font-bold mb-3 flex items-center gap-3 relative z-10">
            <Anchor className="w-7 h-7 text-teal-400 shrink-0" />
            The Safe Harbor Detector
          </h2>
          <p className="text-slate-300 mb-8 text-base leading-relaxed max-w-2xl relative z-10">
            Anxiously attached people often mistake the adrenaline of inconsistency for "passion,"
            while finding secure, healthy people "boring." Think of a current partner or date and
            evaluate them objectively below.
          </p>

          <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
            {/* Checklist */}
            <div className="w-full md:w-3/5 space-y-3">
              {CHECKLIST_ITEMS.map(({ key, label, description }) => (
                <button
                  key={key}
                  onClick={() => handleCheck(key)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all ${
                    checklist[key]
                      ? 'bg-teal-900/50 border-teal-500/70 text-teal-100'
                      : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:bg-slate-700/80'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-colors ${
                      checklist[key] ? 'bg-teal-500 border-teal-400' : 'border-slate-600'
                    }`}
                  >
                    {checklist[key] && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <span className="text-sm">
                    <strong>{label}:</strong> {description}
                  </span>
                </button>
              ))}
            </div>

            {/* Gauge */}
            <div className="w-full md:w-2/5 flex flex-col items-center">
              <div className="relative w-44 h-44 flex items-center justify-center mb-5">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 192 192">
                  <circle cx="96" cy="96" r="84" className="text-slate-800 stroke-current" strokeWidth="12" fill="none" />
                  <circle
                    cx="96" cy="96" r="84"
                    className="text-teal-500 stroke-current transition-all duration-700 ease-out"
                    strokeWidth="12" fill="none" strokeLinecap="round"
                    strokeDasharray="527.79"
                    strokeDashoffset={527.79 - 527.79 * (safeHarborScore / 5)}
                  />
                </svg>
                <ShieldCheck className={`w-16 h-16 transition-all duration-700 z-10 ${shieldColor}`} />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{safeHarborScore} / 5 Traits</h3>
              <p className={`text-sm font-medium text-center max-w-[180px] leading-snug ${
                safeHarborScore >= 4 ? 'text-emerald-400' : safeHarborScore >= 3 ? 'text-teal-300' : 'text-amber-400'
              }`}>
                {safeHarborScore >= 4
                  ? 'A Corrective Relationship — this is a Safe Harbor.'
                  : safeHarborScore === 3
                  ? 'Developing potential. Monitor their consistency.'
                  : 'Proceed with caution. This dynamic may trigger your anxiety.'}
              </p>
            </div>
          </div>
        </section>

        {/* ── 3. Narrative Integrator ── */}
        <section className={CARD.replace('bg-white/70', 'bg-teal-50/80').replace('shadow-teal-100/40', 'shadow-teal-200/40')}>
          <h2 className="text-2xl font-bold text-teal-900 mb-3 flex items-center gap-3">
            <BookHeart className="w-7 h-7 text-teal-600 shrink-0" />
            The Narrative Integrator
          </h2>
          <p className="text-teal-700 mb-8 text-base leading-relaxed">
            Secure adults can tell a <em>coherent</em> story about their past — they neither minimise
            the pain nor are overwhelmed by it. Use this builder to integrate a painful childhood
            memory.
          </p>

          <div className="bg-white/80 rounded-2xl border border-teal-100 overflow-hidden shadow-sm">
            {/* Step tabs */}
            <div className="flex border-b border-teal-100 bg-slate-50/80">
              {['The Belief', 'The Reality', 'Integration'].map((label, i) => (
                <div
                  key={label}
                  className={`flex-1 py-3 px-4 text-center text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                    step >= i + 1
                      ? 'text-teal-600 border-teal-500'
                      : 'text-slate-400 border-transparent'
                  }`}
                >
                  {i + 1}. {label}
                </div>
              ))}
            </div>

            <div className="p-6 md:p-8">
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                  <label className="block text-base font-bold text-slate-800 mb-4">
                    What flawed belief did you form about yourself as a child to survive your
                    environment?
                  </label>
                  <textarea
                    className={TEXTAREA + ' h-32'}
                    placeholder="e.g., 'I believed that if I wasn't perfect and overly helpful, people would eventually leave me.'"
                    value={oldBelief}
                    onChange={(e) => setOldBelief(e.target.value)}
                  />
                  <div className="mt-5 flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      disabled={!oldBelief.trim()}
                      className="px-5 py-2 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 disabled:opacity-40 text-sm transition-colors"
                    >
                      Next Step →
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <label className="block text-base font-bold text-slate-800 mb-4">
                    Zoom out like a documentary camera. What was the objective reality of the adults
                    around you?
                  </label>
                  <textarea
                    className={TEXTAREA + ' h-32'}
                    placeholder="e.g., 'The reality is my parents were deeply overwhelmed with their own trauma and unable to provide consistent emotional attunement.'"
                    value={objectiveContext}
                    onChange={(e) => setObjectiveContext(e.target.value)}
                  />
                  <div className="mt-5 flex justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="px-5 py-2 text-slate-500 font-bold hover:bg-slate-100 rounded-xl text-sm transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={!objectiveContext.trim()}
                      className="px-5 py-2 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 disabled:opacity-40 text-sm transition-colors"
                    >
                      Next Step →
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <label className="block text-base font-bold text-slate-800 mb-4">
                    Combine these into an integrated, self-compassionate truth.
                  </label>
                  <textarea
                    className={TEXTAREA + ' h-32'}
                    placeholder="e.g., 'My anxiety was a brilliant survival strategy for an unpredictable home. But I am an adult now, and I am safe enough to let that armour go.'"
                    value={newIntegration}
                    onChange={(e) => setNewIntegration(e.target.value)}
                  />
                  <div className="mt-5 flex justify-between">
                    <button
                      onClick={() => setStep(2)}
                      className="px-5 py-2 text-slate-500 font-bold hover:bg-slate-100 rounded-xl text-sm transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      disabled={!newIntegration.trim()}
                      className="px-5 py-2 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 disabled:opacity-40 text-sm transition-colors"
                    >
                      View Coherent Narrative
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="animate-in fade-in zoom-in-95 duration-500 text-center">
                  <Sparkles className="w-10 h-10 text-amber-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-teal-900 mb-6">Your Coherent Narrative</h3>

                  <div className="bg-slate-950 text-teal-50 p-8 rounded-2xl text-left space-y-4 text-base font-serif italic relative overflow-hidden">
                    <MapPin className="absolute top-4 left-4 text-teal-800 w-8 h-8 opacity-30" />
                    <p className="relative z-10">"{oldBelief}"</p>
                    <p className="relative z-10 text-slate-300">"{objectiveContext}"</p>
                    <p className="relative z-10 text-amber-300 font-bold not-italic">"{newIntegration}"</p>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => setStep(1)}
                      className="px-5 py-2 text-slate-500 font-bold hover:bg-slate-100 rounded-xl text-sm transition-colors"
                    >
                      ← Start Over
                    </button>
                    <button
                      onClick={handleSaveNarrative}
                      className="inline-flex items-center gap-2 px-7 py-2.5 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700 transition-all shadow-md text-sm"
                    >
                      {isNarrativeSaved ? (
                        <><CheckCircle2 className="w-4 h-4" /> Narrative Anchored</>
                      ) : (
                        'Save My Story'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── 4. Security Manifesto ── */}
        <section className={CARD}>
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <HeartHandshake className="w-6 h-6 text-teal-600 shrink-0" />
                The Earned Security Manifesto
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                You have reached the end of the 6-week foundational work. You now understand your
                nervous system, your inner child, your boundaries, and how to communicate without
                protest.
              </p>
              <p className="text-slate-700 text-sm leading-relaxed font-medium">
                Write a final commitment to yourself. What does your securely attached future look
                like? How will you treat yourself when you stumble?
              </p>
            </div>

            <div className="lg:w-1/2">
              <div className="bg-slate-50/80 rounded-2xl border border-slate-200 overflow-hidden">
                <textarea
                  className="w-full h-44 p-5 bg-transparent resize-none outline-none text-slate-700 placeholder:text-slate-400 focus:ring-0 leading-relaxed font-serif text-sm"
                  placeholder="I commit to breaking the cycle. I am worthy of a love that is consistent, safe, and kind. When I feel anxious, I will…"
                  value={manifesto}
                  onChange={(e) => setManifesto(e.target.value)}
                />
                <div className="flex justify-end p-3 border-t border-slate-200 bg-slate-50/60">
                  <button
                    onClick={handleSaveManifesto}
                    disabled={!manifesto.trim()}
                    className="inline-flex items-center gap-2 px-5 py-2 bg-slate-950 text-white font-bold rounded-xl hover:bg-slate-800 disabled:opacity-40 text-xs transition-colors"
                  >
                    {isManifestoSaved ? (
                      <><CheckCircle2 className="w-4 h-4" /> Manifesto Sealed</>
                    ) : (
                      'Sign My Manifesto'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Navigation ── */}
        <section className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a
            href="/workbook/anxious-attachment/week-5"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors w-full sm:w-auto text-center text-sm"
          >
            ← Back to Week 5
          </a>
          <a
            href="/workbook"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-extrabold rounded-full hover:scale-105 transition-all shadow-[0_0_30px_rgba(16,185,129,0.35)] text-sm"
          >
            <Award className="w-5 h-5" />
            Complete Program
          </a>
        </section>

      </main>
    </div>
  );
}
