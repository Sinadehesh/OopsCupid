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
    eyebrow: 'Day 1 · Practice 1',
    title: 'The 30-Second Reset: calm the body before the spiral starts',
    description:
      'When anxious attachment gets activated, your body often reacts before your mind can think clearly. This practice helps you interrupt panic, come back into the room, and teach your nervous system that this moment is survivable.',
    color: 'from-cyan-500 to-blue-600',
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
    icon: Wind,
  },
  {
    id: 'understand',
    eyebrow: 'Day 1 · Practice 2',
    title: 'Meet your anxious attachment with clarity, not shame',
    description:
      'This explanation section helps you understand why unanswered texts, distance, or mixed signals can feel overwhelming. The goal is not to judge your reactions, but to understand what your system learned to fear.',
    color: 'from-violet-500 to-fuchsia-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    icon: BrainCircuit,
  },
  {
    id: 'journal',
    eyebrow: 'Day 1 · Practice 3',
    title: 'Attachment awareness journaling: name the story your mind tells',
    description:
      'Instead of letting the spiral stay vague and all-powerful, write it down. These prompts help you spot the stories, body signals, and childhood beliefs that keep anxious attachment alive.',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: PenTool,
  },
  {
    id: 'secure',
    eyebrow: 'Day 1 · Practice 4',
    title: 'Begin earned security by becoming a safe person to yourself',
    description:
      'Healing anxious attachment is not about becoming cold or independent in a defensive way. It is about learning how to stay with yourself, soothe yourself, and relate from stability instead of panic.',
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
          <p className="mt-3 text-3xl font-semibold capitalize text-slate-900">{phase}</p>
          <p className="mt-3 text-sm text-slate-500">Inhale softly. Hold gently. Exhale longer.</p>
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
    if (breathsPerMinute >= 16) return 'This pace often feels like an activated body: shallow, quick, and watchful.';
    if (breathsPerMinute >= 12) return 'This pace is more settled. You may notice your chest and jaw beginning to soften.';
    if (breathsPerMinute >= 8) return 'This is a calm, regulated pace. The exhale has more space, and the body gets the message that it is safe enough to come down.';
    return 'This is a very slow restorative rhythm. Go only as slow as feels kind and natural to your body.';
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
                Day 1 of the Anxious Attachment Daily Practices
              </div>
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 md:text-7xl">
                Meet your anxiety gently, then guide your body back to safety.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
                This page is designed to help you do what anxious attachment makes difficult: pause, understand what is happening, and respond with steadiness instead of panic. Start with the explanation cards, then open each practice when you are ready.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#experience"
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-4 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-slate-800"
                >
                  Start Day 1
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setActiveModule('regulate')}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-slate-950"
                >
                  Open the breathing reset
                </button>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { label: 'Today you will', value: 'Regulate, understand, journal, and re-anchor' },
                  { label: 'Core skill', value: 'Learning to slow down before reacting' },
                  { label: 'Time needed', value: 'About 30 minutes' },
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
                      <p className="text-sm uppercase tracking-[0.28em] text-cyan-100/80">Today’s focus</p>
                      <p className="mt-2 text-2xl font-semibold">From panic to presence</p>
                    </div>
                    <MoonStar className="h-8 w-8 text-cyan-200" />
                  </div>

                  <div className="mt-8 rounded-[1.5rem] bg-white/10 p-5 backdrop-blur-sm">
                    <div className="flex items-center justify-between text-sm text-cyan-50/90">
                      <span>Breathing reset</span>
                      <span>{breathsPerMinute} bpm</span>
                    </div>
                    <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,#67e8f9,#a78bfa,#2dd4bf)] bg-[length:200%_200%]"
                        style={{ width: `${((18 - breathsPerMinute) / 12) * 100}%`, animation: 'shimmer 4s linear infinite' }}
                      />
                    </div>
                    <p className="mt-4 text-sm leading-6 text-cyan-50/80">
                      First notice how quickly you are breathing right now. Then begin to lower the pace slowly and let your exhale become longer than your inhale.
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 rounded-2xl border border-cyan-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-lg">
                Explanation first, then practice
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">Day 1 sequence</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              Understand what is happening. Then move through the practices in order.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Anxious attachment becomes easier to work with when you stop treating every wave of fear as an emergency. These four practices help you ground the body, understand the pattern, give language to the spiral, and end the session with self-trust.
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
                      Practice 1 · The 30-Second Reset
                    </div>
                    <h3 className="mt-4 text-3xl font-semibold text-slate-950">Calm the body before you try to calm the mind</h3>
                    <p className="mt-4 text-base leading-7 text-slate-600">
                      Before you look at your thoughts, come back to your body. When anxious attachment is activated, your system can interpret distance, silence, or uncertainty as danger. This short reset interrupts that alarm.
                    </p>

                    <div className="mt-6 rounded-[1.5rem] border border-cyan-100 bg-cyan-50/60 p-5">
                      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-700">How to do it</p>
                      <div className="mt-4 grid gap-3">
                        {[
                          'Let your eyes move around the room until they land on one neutral object.',
                          'Take one slow breath in, then let the exhale last slightly longer than the inhale.',
                          'Notice one point of support: your feet on the floor, your back in the chair, or your hand resting on your chest.',
                        ].map((tip) => (
                          <div key={tip} className="flex items-start gap-3 rounded-2xl border border-white/80 bg-white px-4 py-4">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
                            <p className="text-sm leading-6 text-slate-700">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 space-y-4 rounded-[1.5rem] bg-slate-50 p-5">
                      <div>
                        <div className="flex items-center justify-between">
                          <label htmlFor="breath-rate" className="text-sm font-semibold text-slate-700">
                            Match your breathing to how it feels right now
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
                          <span>Faster / activated</span>
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
                          Start where anxiety often lives
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setBreathsPerMinute(8);
                            setStarted(true);
                          }}
                          className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-300"
                        >
                          Move toward a calmer pace
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-white p-5">
                      <p className="text-sm font-semibold text-slate-800">What to notice</p>
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        As you slow the breath, notice whether your shoulders lower, your jaw unclenches, or your chest softens even a little. You are not trying to force calm. You are giving your body a new experience of safety.
                      </p>
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
                      <p className="text-sm font-semibold text-slate-800">Why this helps anxious attachment</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        An anxious state usually speeds the breath up and makes the body feel urgent. By lengthening the exhale and tracking the rhythm visually, you teach your system that uncertainty does not automatically mean danger.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeModule === 'understand' && (
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-sm font-medium text-violet-700">
                    <BrainCircuit className="h-4 w-4" />
                    Practice 2 · Understanding the pattern
                  </div>
                  <h3 className="mt-4 text-3xl font-semibold text-slate-950">Why anxious attachment can feel so intense</h3>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                    If you panic when someone is distant, takes hours to reply, or suddenly feels harder to read, it does not mean you are weak or “too much.” It often means your nervous system learned early that connection was inconsistent, and now it scans for signs of abandonment before your rational mind has time to step in.
                  </p>
                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    {[
                      ['What your body may do', 'You may feel a tight chest, shallow breathing, a drop in the stomach, restlessness, or the urge to act immediately.'],
                      ['What your mind may do', 'You may start replaying messages, searching for reassurance, assuming rejection, or trying to close the distance fast.'],
                      ['What anxious attachment is trying to do', 'It is trying to protect connection. The problem is that the strategies it learned often create more fear instead of more safety.'],
                      ['What healing looks like', 'Healing means learning to stay present with the activation, question the fearful story, and choose a steadier response.'],
                    ].map(([title, text]) => (
                      <div key={title} className="rounded-[1.5rem] border border-violet-100 bg-violet-50/60 p-5 shadow-sm">
                        <h4 className="text-lg font-semibold text-slate-900">{title}</h4>
                        <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 rounded-[1.75rem] border border-violet-100 bg-white p-6">
                    <p className="text-sm font-semibold text-slate-800">A grounding reframe</p>
                    <p className="mt-3 text-lg leading-8 text-slate-700">
                      “My nervous system is reacting to a cue of possible loss. That reaction is real, but it is not always accurate. I can slow down before I decide what this means.”
                    </p>
                  </div>
                </div>
              )}

              {activeModule === 'journal' && (
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
                    <PenTool className="h-4 w-4" />
                    Practice 3 · Attachment awareness journaling
                  </div>
                  <h3 className="mt-4 text-3xl font-semibold text-slate-950">Write the spiral down so you can actually see it</h3>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                    Journaling helps move you out of reactive mode and into observation. You are not writing to be polished. You are writing to name what your body feels, what your mind assumes, and what your younger self may have learned about closeness.
                  </p>
                  <div className="mt-8 grid gap-4">
                    {[
                      'When someone I care about pulls away, what story does my mind tell me immediately?',
                      'What signs do I notice first in my body when I start feeling anxious about a relationship?',
                      'What did I learn as a child about asking for reassurance, comfort, or closeness?',
                    ].map((prompt, index) => (
                      <div key={prompt} className="rounded-[1.5rem] border border-amber-100 bg-amber-50/60 p-5">
                        <p className="text-sm font-semibold text-amber-700">Prompt {index + 1}</p>
                        <blockquote className="mt-3 text-xl font-medium leading-9 text-slate-900">
                          “{prompt}”
                        </blockquote>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-6">
                    <p className="text-sm font-semibold text-slate-800">After writing, add these two lines</p>
                    <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                      <p>1. “What I am afraid of is…”</p>
                      <p>2. “What I know for sure, right now, is…”</p>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-600">
                      This helps separate fear from fact — one of the core skills of earned secure attachment.
                    </p>
                  </div>
                </div>
              )}

              {activeModule === 'secure' && (
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                    <Heart className="h-4 w-4" />
                    Practice 4 · Re-anchoring in earned security
                  </div>
                  <h3 className="mt-4 text-3xl font-semibold text-slate-950">End today by becoming a safer home for yourself</h3>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                    The goal is not to stop needing people. The goal is to stop abandoning yourself when fear appears. This final practice helps you leave Day 1 feeling steadier, kinder, and more rooted in your own presence.
                  </p>
                  <div className="mt-8 grid gap-4 md:grid-cols-3">
                    {[
                      ['Step 1', 'Name the trigger', 'Say out loud what activated you: “I felt anxious when the distance showed up.”'],
                      ['Step 2', 'Offer reassurance inward', 'Place a hand on your chest and say: “I am here. I do not have to solve this instantly to be safe.”'],
                      ['Step 3', 'Choose the secure next move', 'Wait, breathe, and ask what action would feel respectful, grounded, and self-honoring.'],
                    ].map(([step, title, text]) => (
                      <div key={step} className="rounded-[1.5rem] border border-emerald-100 bg-emerald-50/60 p-5">
                        <p className="text-sm font-semibold text-emerald-700">{step}</p>
                        <h4 className="mt-2 text-lg font-semibold text-slate-900">{title}</h4>
                        <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 rounded-[1.75rem] border border-emerald-100 bg-white p-6">
                    <p className="text-sm font-semibold text-slate-800">Closing reflection</p>
                    <p className="mt-3 text-lg leading-8 text-slate-700">
                      “My attachment patterns were survival strategies. I can honor why they formed and still choose something gentler now.”
                    </p>
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
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">Day 1 wrap-up</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight">You do not need to heal everything today.</h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                Today’s work is about noticing, slowing down, and relating to yourself differently. Even a small pause before panic is progress. Even one slower breath is progress. This is how earned security begins.
              </p>
            </div>
            <a
              href="#experience"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
            >
              Revisit today’s practices
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
