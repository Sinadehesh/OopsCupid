'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Heart,
  MoonStar,
  PenTool,
  ShieldCheck,
  Sparkles,
  Waves,
  Wind,
} from 'lucide-react';

const modules = [
  {
    id: 'regulate',
    eyebrow: 'Step 1',
    title: 'Regulate your body before you read your fears as facts',
    description:
      'Anxious attachment often begins in the nervous system. This first practice helps you notice your baseline, slow it down, and feel the shift in your body in real time.',
    color: 'from-cyan-500 to-blue-600',
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
    icon: Wind,
  },
  {
    id: 'understand',
    eyebrow: 'Step 2',
    title: 'Understand what anxious attachment is actually doing',
    description:
      'Learn why overthinking, protest behaviors, checking, reassurance-seeking, and panic after distance happen — and why they are not proof that something is wrong with you.',
    color: 'from-violet-500 to-fuchsia-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    icon: BrainCircuit,
  },
  {
    id: 'journal',
    eyebrow: 'Step 3',
    title: 'Turn spirals into insight with guided reflection',
    description:
      'Instead of staying inside the spiral, move it onto the page. This section makes your emotions feel easier to understand, organize, and respond to with compassion.',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: PenTool,
  },
  {
    id: 'secure',
    eyebrow: 'Step 4',
    title: 'Practice the habits of earned security',
    description:
      'Finish with small daily practices that make secure attachment feel lived, not theoretical: boundaries, self-soothing, repair, and self-trust.',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    icon: ShieldCheck,
  },
];

function BreathingOrb({ bpm, phase }: { bpm: number; phase: 'inhale' | 'hold' | 'exhale' }) {
  const duration = 60 / bpm;

  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
      <div
        className="relative flex h-64 w-64 items-center justify-center rounded-full border border-white/60 bg-white/70 shadow-2xl backdrop-blur-xl"
        style={{
          animation: `breathe ${Math.max(duration * 2, 4)}s ease-in-out infinite`,
        }}
      >
        <div className="absolute inset-5 rounded-full border border-cyan-200/80" />
        <div className="absolute inset-10 rounded-full border border-cyan-300/70" />
        <div className="absolute inset-16 rounded-full border border-cyan-400/60" />
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Current phase</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{phase}</p>
          <p className="mt-3 text-sm text-slate-500">Follow the circle and soften the exhale</p>
        </div>
      </div>
    </div>
  );
}

export default function AnxiousAttachmentWorkbookPage() {
  const [activeModule, setActiveModule] = useState('regulate');
  const [breathsPerMinute, setBreathsPerMinute] = useState(16);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [started, setStarted] = useState(false);

  const breathLabel = useMemo(() => {
    if (breathsPerMinute >= 16) return 'This feels close to anxious / activated breathing';
    if (breathsPerMinute >= 12) return 'This is becoming steadier and more grounded';
    if (breathsPerMinute >= 8) return 'This is a calm, regulated pace';
    return 'This is very slow — soft, safe, and restorative';
  }, [breathsPerMinute]);

  useEffect(() => {
    if (!started) return;

    const cycle = Math.max((60 / breathsPerMinute) * 1000, 2200);
    const inhale = cycle * 0.38;
    const hold = cycle * 0.14;
    const exhale = cycle * 0.48;

    setPhase('inhale');
    const holdTimer = window.setTimeout(() => setPhase('hold'), inhale);
    const exhaleTimer = window.setTimeout(() => setPhase('exhale'), inhale + hold);
    const restartTimer = window.setTimeout(() => setPhase('inhale'), inhale + hold + exhale);

    return () => {
      window.clearTimeout(holdTimer);
      window.clearTimeout(exhaleTimer);
      window.clearTimeout(restartTimer);
    };
  }, [breathsPerMinute, phase, started]);

  const active = modules.find((m) => m.id === activeModule) ?? modules[0];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#ecfeff,_#ffffff_40%,_#f8fafc_100%)] text-slate-900">
      <style jsx global>{`
        @keyframes breathe {
          0% { transform: scale(0.84); box-shadow: 0 0 0 0 rgba(34,211,238,0.12); }
          38% { transform: scale(1.04); box-shadow: 0 0 0 24px rgba(34,211,238,0.08); }
          52% { transform: scale(1.04); box-shadow: 0 0 0 28px rgba(34,211,238,0.06); }
          100% { transform: scale(0.84); box-shadow: 0 0 0 0 rgba(34,211,238,0.04); }
        }
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>

      <section className="relative overflow-hidden px-6 pb-16 pt-20 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.16),transparent_26%),radial-gradient(circle_at_50%_80%,rgba(45,212,191,0.12),transparent_30%)]" />
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/80 px-4 py-2 text-sm font-medium text-cyan-800 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Interactive daily practices for anxious attachment
              </div>
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 md:text-7xl">
                A workbook that feels like an experience, not just a page.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
                Start with the explanation, then click into the exercise. Learn what your anxiety is doing,
                slow your body down visually, and practice secure attachment in a way that feels beautiful,
                informative, and actually engaging.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#experience"
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-4 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-slate-800"
                >
                  Explore the interactive practice
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setActiveModule('regulate')}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-slate-950"
                >
                  Open the breathing module
                </button>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { label: 'First experience', value: 'Explain → click → practice' },
                  { label: 'Interactive tool', value: 'Breathing rhythm you can slow down' },
                  { label: 'Emotional tone', value: 'Grounding, playful, premium' },
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/70 bg-white/70 p-5 shadow-lg shadow-cyan-100/40 backdrop-blur">
                    <p className="text-sm text-slate-500">{item.label}</p>
                    <p className="mt-2 font-semibold text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div
                className="rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-2xl shadow-cyan-100/50 backdrop-blur-xl"
                style={{ animation: 'floatCard 7s ease-in-out infinite' }}
              >
                <div className="rounded-[1.5rem] bg-[linear-gradient(135deg,#0f172a,#164e63,#0f766e)] p-7 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.28em] text-cyan-100/80">Preview</p>
                      <p className="mt-2 text-2xl font-semibold">Day 1: Regulate before you spiral</p>
                    </div>
                    <MoonStar className="h-8 w-8 text-cyan-200" />
                  </div>

                  <div className="mt-8 rounded-[1.5rem] bg-white/10 p-5 backdrop-blur-sm">
                    <div className="flex items-center justify-between text-sm text-cyan-50/90">
                      <span>Guided breathing</span>
                      <span>{breathsPerMinute} bpm</span>
                    </div>
                    <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,#67e8f9,#a78bfa,#2dd4bf)] bg-[length:200%_200%]"
                        style={{ width: `${((18 - breathsPerMinute) / 12) * 100}%`, animation: 'shimmer 4s linear infinite' }}
                      />
                    </div>
                    <p className="mt-4 text-sm leading-6 text-cyan-50/80">
                      Users start at their current breath pace, then slowly drag toward a calmer rhythm while the visual guide responds live.
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 rounded-2xl border border-cyan-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-lg">
                Beautiful + educational + tactile
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">How it should work</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              First they understand it. Then they click into it. Then they feel it.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Instead of dumping all the content at once, the page becomes a guided experience. Each card explains what the exercise is for, and opening it reveals something tactile, visual, and emotionally regulating.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              {modules.map((module) => {
                const Icon = module.icon;
                const isActive = activeModule === module.id;
                return (
                  <button
                    key={module.id}
                    type="button"
                    onClick={() => setActiveModule(module.id)}
                    className={`w-full rounded-[1.75rem] border p-6 text-left transition-all duration-300 ${
                      isActive
                        ? `scale-[1.01] ${module.bg} ${module.border} shadow-xl`
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`rounded-2xl bg-gradient-to-br ${module.color} p-3 text-white shadow-lg`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">{module.eyebrow}</p>
                        <h3 className="mt-2 text-xl font-semibold text-slate-950">{module.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-slate-600">{module.description}</p>
                      </div>
                      <ChevronRight className={`mt-1 h-5 w-5 transition ${isActive ? 'translate-x-1 text-slate-900' : 'text-slate-400'}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/70 md:p-8">
              {activeModule === 'regulate' && (
                <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-700">
                      <Waves className="h-4 w-4" />
                      Interactive breathing practice
                    </div>
                    <h3 className="mt-4 text-3xl font-semibold text-slate-950">A breathing guide that responds to the user</h3>
                    <p className="mt-4 text-base leading-7 text-slate-600">
                      The user first matches the slider to their real breathing speed. That makes the experience feel honest and personal. Then they gently drag it slower, watching the visual rhythm shift from activated to regulated.
                    </p>

                    <div className="mt-6 space-y-4 rounded-[1.5rem] bg-slate-50 p-5">
                      <div>
                        <div className="flex items-center justify-between">
                          <label htmlFor="breath-rate" className="text-sm font-semibold text-slate-700">
                            Set your current breathing speed
                          </label>
                          <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-900 shadow-sm">
                            {breathsPerMinute} bpm
                          </span>
                        </div>
                        <input
                          id="breath-rate"
                          type="range"
                          min={6}
                          max={18}
                          value={breathsPerMinute}
                          onChange={(e) => setBreathsPerMinute(Number(e.target.value))}
                          className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300"
                        />
                        <div className="mt-3 flex justify-between text-xs text-slate-500">
                          <span>Slower / calmer</span>
                          <span>Faster / anxious</span>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-cyan-100 bg-white p-4">
                        <p className="text-sm font-medium text-slate-800">What this pace means</p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{breathLabel}</p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => setStarted((v) => !v)}
                          className="inline-flex items-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                          {started ? 'Pause rhythm' : 'Start rhythm'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setBreathsPerMinute(16);
                            setStarted(true);
                          }}
                          className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-300"
                        >
                          Start at anxious baseline
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setBreathsPerMinute(8);
                            setStarted(true);
                          }}
                          className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-300"
                        >
                          Move to calmer pace
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3">
                      {[
                        'First, match the slider to how your breath feels right now.',
                        'Then begin the animation so the visual guide mirrors your body.',
                        'Now drag gradually toward a slower pace and notice whether your shoulders, chest, and jaw soften.',
                      ].map((tip) => (
                        <div key={tip} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
                          <p className="text-sm leading-6 text-slate-600">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] bg-[linear-gradient(180deg,#ecfeff,#ffffff)] p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700">Live visual</p>
                        <h4 className="mt-2 text-2xl font-semibold text-slate-950">Follow the rhythm</h4>
                      </div>
                      <div className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                        <Clock3 className="mr-2 inline h-4 w-4" />
                        {started ? 'Running' : 'Paused'}
                      </div>
                    </div>

                    <div className="mt-8">
                      <BreathingOrb bpm={breathsPerMinute} phase={phase} />
                    </div>

                    <div className="mt-8 rounded-[1.5rem] border border-cyan-100 bg-white/80 p-5 backdrop-blur">
                      <p className="text-sm font-semibold text-slate-800">Why this works</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        An anxious state usually speeds the breath up and keeps the exhale short. This tool makes regulation visible. The user isn’t just reading advice — they are watching their body learn safety.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeModule === 'understand' && (
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-sm font-medium text-violet-700">
                    <BrainCircuit className="h-4 w-4" />
                    Make the explanation feel intelligent and emotionally validating
                  </div>
                  <h3 className="mt-4 text-3xl font-semibold text-slate-950">Teach before asking them to do the exercise</h3>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                    This section should explain anxious attachment in a way that feels warm and premium — not clinical and dry. Use interactive reveal cards for things like: why delayed texts feel so intense, what protest behaviors are, how anxious stories get formed, and why the body reacts before logic catches up.
                  </p>
                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    {[
                      ['What your body is doing', 'Your nervous system treats distance like danger and starts chasing certainty.'],
                      ['What your mind is doing', 'It rushes to create a story that explains the disconnection quickly.'],
                      ['What this workbook changes', 'It helps you slow the body first, then question the story, then choose a secure response.'],
                      ['How to present it', 'Short visual cards, hover depth, click-to-open details, soft gradients, and tiny guided moments.'],
                    ].map(([title, text]) => (
                      <div key={title} className="rounded-[1.5rem] border border-violet-100 bg-violet-50/60 p-5 shadow-sm">
                        <h4 className="text-lg font-semibold text-slate-900">{title}</h4>
                        <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeModule === 'journal' && (
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
                    <PenTool className="h-4 w-4" />
                    Reflection should feel guided, not heavy
                  </div>
                  <h3 className="mt-4 text-3xl font-semibold text-slate-950">Turn journaling into a sequence of small wins</h3>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                    Instead of a big block of questions, reveal one prompt at a time with progress feedback, gentle transitions, and optional examples. That makes reflection feel less intimidating and much more likely to be completed.
                  </p>
                  <div className="mt-8 rounded-[1.75rem] border border-amber-100 bg-amber-50/60 p-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-800">Prompt sequence</p>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">1 of 3</span>
                    </div>
                    <blockquote className="mt-5 text-2xl font-medium leading-10 text-slate-900">
                      “When someone I care about pulls away, what story does my mind tell me immediately?”
                    </blockquote>
                    <p className="mt-4 text-sm leading-6 text-slate-600">
                      Then offer a tap target like: “Show me an example answer” or “Give me a secure reframe.” That makes the workbook feel alive.
                    </p>
                  </div>
                </div>
              )}

              {activeModule === 'secure' && (
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                    <Heart className="h-4 w-4" />
                    Make secure attachment feel reachable
                  </div>
                  <h3 className="mt-4 text-3xl font-semibold text-slate-950">End with daily practices that feel hopeful and embodied</h3>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                    This part can feel like a progress ritual: a calming checklist, a self-trust tracker, and micro-practices for boundaries, reassurance, and repair. The visual language should feel lighter here — more spacious, more earned, more confident.
                  </p>
                  <div className="mt-8 grid gap-4 md:grid-cols-3">
                    {['Name the trigger', 'Regulate the body', 'Choose the secure response'].map((item, index) => (
                      <div key={item} className="rounded-[1.5rem] border border-emerald-100 bg-emerald-50/60 p-5">
                        <p className="text-sm font-semibold text-emerald-700">Practice {index + 1}</p>
                        <h4 className="mt-2 text-lg font-semibold text-slate-900">{item}</h4>
                        <p className="mt-3 text-sm leading-6 text-slate-600">
                          A small repeated action that makes secure attachment feel behavioral, not abstract.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-slate-200 bg-slate-950 px-8 py-12 text-white shadow-2xl shadow-slate-300/30 md:px-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">Design direction</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight">This should feel premium, alive, and emotionally intelligent.</h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                So the fix is not just “add more copy.” It is a redesigned product experience: beautiful cards, progressive disclosure, interactive tools, and exercise mechanics that visually teach regulation.
              </p>
            </div>
            <a
              href="#experience"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
            >
              Open the interactive concept
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
