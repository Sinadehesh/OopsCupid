'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ArrowRight,
  Sliders,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Unlock,
  Hand,
  Copy,
  PenTool,
  BookOpen,
} from 'lucide-react';

export default function Week3Boundaries() {
  const [boundaryLevel, setBoundaryLevel] = useState(50);
  const [spectrumStatus, setSpectrumStatus] = useState<'Porous' | 'Healthy' | 'Rigid'>('Healthy');
  const [activeScenario, setActiveScenario] = useState<number>(0);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [journalEntry, setJournalEntry] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (boundaryLevel < 35) setSpectrumStatus('Porous');
    else if (boundaryLevel > 65) setSpectrumStatus('Rigid');
    else setSpectrumStatus('Healthy');
  }, [boundaryLevel]);

  const handleSaveJournal = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scenarios = [
    {
      title: 'The Avoidant Partner Withdrawing',
      context: 'Your partner shuts down and walks away during a conflict. Your anxious urge is to chase them and demand reassurance. Here is how to set a healthy boundary instead.',
      steps: [
        { letter: 'S', name: 'Specify', text: 'When you need space during an argument and leave the room without warning...' },
        { letter: 'A', name: 'Assert', text: '...my anxiety spikes and I feel abandoned. I need to know that we will resolve the issue.' },
        { letter: 'F', name: 'Fairness', text: 'I understand you get overwhelmed and need time to regulate your nervous system.' },
        { letter: 'E', name: 'Enforce', text: "Going forward, if you need to step away, I need you to give me a specific time (like 'in one hour') when we will reconnect. If you just leave, I will take space for myself until tomorrow." },
      ],
    },
    {
      title: 'The Emotionally Dumping Friend',
      context: 'A friend constantly vents to you about their life, treating you like a therapist, but rarely asks about how you are doing.',
      steps: [
        { letter: 'S', name: 'Specify', text: 'When our conversations consist entirely of you venting about your daily frustrations...' },
        { letter: 'A', name: 'Assert', text: "...I start to feel emotionally drained and like there isn't room for my own struggles in this friendship." },
        { letter: 'F', name: 'Fairness', text: 'I care about you deeply and want to support you when you are having a hard time.' },
        { letter: 'E', name: 'Enforce', text: 'But I only have the emotional bandwidth for a 15-minute vent session right now. If we can\'t shift the topic after that, I will need to end the call and recharge.' },
      ],
    },
    {
      title: 'The Overdemanding Workplace',
      context: "Your boss or colleagues keep adding to your plate. Your anxious people-pleasing makes you say 'yes' to avoid disappointing them, leading to burnout.",
      steps: [
        { letter: 'S', name: 'Specify', text: 'When you ask me to take on these additional late-night tasks...' },
        { letter: 'A', name: 'Assert', text: '...I am unable to give my best work because my plate is already completely full.' },
        { letter: 'F', name: 'Fairness', text: "I want to ensure this project succeeds and that the team's goals are met." },
        { letter: 'E', name: 'Enforce', text: 'I can either complete the new tasks by next Wednesday, or I can drop [Project X] to do this now. Which priority would you like me to choose?' },
      ],
    },
  ];

  const distance = (boundaryLevel - 50) * 1.5;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f0fdf4,_#ffffff_40%,_#f8fafc_100%)] text-slate-800 font-sans pb-20">

      {/* Header */}
      <header className="relative overflow-hidden px-6 pb-20 pt-24 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.12),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(52,211,153,0.10),transparent_28%),radial-gradient(circle_at_50%_85%,rgba(99,102,241,0.07),transparent_32%)]" />
        <div className="mx-auto max-w-4xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-medium text-emerald-800 backdrop-blur shadow-sm">
            <BookOpen className="h-4 w-4" />
            Week 3 · The Earned Security Workbook
          </div>
          <h1 className="text-5xl font-semibold tracking-tight text-slate-950 md:text-7xl">
            Setting Boundaries{' '}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
              Without Guilt
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
            Boundaries are not walls to keep people out; they are property lines that protect your energy. Learn how to stop abandoning yourself to keep the peace.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 -mt-4 relative z-20 space-y-10">

        {/* Psychoeducation */}
        <section className="rounded-[2rem] border border-white/70 bg-white/70 p-8 md:p-10 shadow-lg shadow-emerald-100/40 backdrop-blur-xl">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-3">
            <Hand className="w-7 h-7 text-emerald-600" />
            The Anxiety of Saying &ldquo;No&rdquo;
          </h2>
          <div className="space-y-4 text-slate-600 leading-8 text-base">
            <p>
              If you have an anxious attachment style, you likely learned early on that your worth was tied to your utility. You became highly attuned to other people&rsquo;s moods, adjusting your behavior to keep them happy and prevent abandonment. This leads to chronic people-pleasing and &ldquo;porous&rdquo; boundaries.
            </p>
            <p>
              Anxious people face a difficult paradox: <strong className="text-slate-800">Setting a boundary makes you anxious, but NOT setting a boundary also makes you anxious.</strong> When you constantly say &ldquo;yes&rdquo; when your body means &ldquo;no,&rdquo; resentment builds silently.
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-5 rounded-r-2xl mt-2">
              <h3 className="text-amber-800 font-semibold text-base mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> False Guilt vs. True Guilt
              </h3>
              <p className="text-amber-700 text-sm leading-7 m-0">
                When you set a boundary, you will likely feel guilty. <strong>Expect the guilt.</strong> True guilt means you did something wrong. False guilt means someone is disappointed that they can no longer cross your property line. You must learn to tolerate this discomfort to grow.
              </p>
            </div>
          </div>
        </section>

        {/* Boundary Spectrum Visualizer */}
        <section className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-slate-950 p-8 md:p-10 shadow-2xl text-white">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-3">
              <Sliders className="w-7 h-7 text-emerald-400" />
              The Boundary Spectrum Visualizer
            </h2>
            <p className="text-slate-300 mb-8 text-base leading-7 max-w-2xl">
              Use the slider to adjust your boundary level. Notice how the relationship between &ldquo;You&rdquo; and &ldquo;Others&rdquo; changes based on the firmness of your boundaries.
            </p>

            <div className="bg-slate-800/60 rounded-2xl p-6 md:p-8 border border-slate-700 backdrop-blur">
              {/* Visual Canvas */}
              <div className="relative h-56 flex items-center justify-center mb-8 overflow-hidden bg-slate-900/50 rounded-2xl border border-slate-800">
                <div
                  className={`absolute h-2 transition-all duration-500 rounded-full ${spectrumStatus === 'Healthy' ? 'bg-emerald-500 w-32 opacity-100' : 'opacity-0 w-0'}`}
                />
                <div
                  className="absolute w-32 h-32 rounded-full flex items-center justify-center z-10 transition-transform duration-300 ease-out shadow-lg mix-blend-screen"
                  style={{
                    transform: `translateX(${-distance}px)`,
                    backgroundColor:
                      spectrumStatus === 'Porous' ? 'rgba(244,63,94,0.8)' :
                      spectrumStatus === 'Healthy' ? 'rgba(16,185,129,0.9)' :
                      'rgba(148,163,184,0.9)',
                  }}
                >
                  <span className="font-bold text-white text-lg drop-shadow-md">YOU</span>
                </div>
                <div
                  className="absolute w-32 h-32 rounded-full flex items-center justify-center z-10 transition-transform duration-300 ease-out shadow-lg mix-blend-screen"
                  style={{
                    transform: `translateX(${distance}px)`,
                    backgroundColor:
                      spectrumStatus === 'Porous' ? 'rgba(244,63,94,0.8)' :
                      spectrumStatus === 'Healthy' ? 'rgba(99,102,241,0.9)' :
                      'rgba(148,163,184,0.9)',
                  }}
                >
                  <span className="font-bold text-white text-lg drop-shadow-md">OTHERS</span>
                </div>
                <div
                  className={`absolute w-4 h-40 bg-slate-500 rounded-sm transition-all duration-500 ${spectrumStatus === 'Rigid' ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`}
                />
              </div>

              {/* Slider */}
              <div className="mb-8">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={boundaryLevel}
                  onChange={(e) => setBoundaryLevel(Number(e.target.value))}
                  className={`w-full h-3 rounded-full appearance-none cursor-pointer outline-none transition-colors ${
                    spectrumStatus === 'Porous' ? 'bg-rose-500/50 accent-rose-500' :
                    spectrumStatus === 'Rigid' ? 'bg-slate-600/50 accent-slate-400' :
                    'bg-emerald-500/50 accent-emerald-500'
                  }`}
                />
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider mt-3 text-slate-500">
                  <span>Porous (0)</span>
                  <span>Healthy (50)</span>
                  <span>Rigid (100)</span>
                </div>
              </div>

              {/* Status Readout */}
              <div className={`p-6 rounded-2xl border transition-colors duration-500 ${
                spectrumStatus === 'Porous' ? 'bg-rose-900/30 border-rose-500/30 text-rose-200' :
                spectrumStatus === 'Rigid' ? 'bg-slate-800 border-slate-600 text-slate-300' :
                'bg-emerald-900/30 border-emerald-500/30 text-emerald-100'
              }`}>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                  {spectrumStatus === 'Porous' && <Unlock className="w-5 h-5" />}
                  {spectrumStatus === 'Healthy' && <ShieldCheck className="w-5 h-5" />}
                  {spectrumStatus === 'Rigid' && <Lock className="w-5 h-5" />}
                  Current State: {spectrumStatus} Boundaries
                </h3>
                <p className="text-sm leading-7 opacity-90">
                  {spectrumStatus === 'Porous' && "You are overly enmeshed. You take on other people's emotions as your own responsibility. Saying 'no' feels dangerous. This leads to resentment, burnout, and losing your sense of self."}
                  {spectrumStatus === 'Healthy' && "You value connection, but you protect your energy. You can say 'no' respectfully. You understand that you are not responsible for managing other people's emotions or reactions."}
                  {spectrumStatus === 'Rigid' && "You have built walls instead of fences. To avoid the pain of conflict or rejection, you avoid intimacy altogether. You don't ask for help and you distance yourself from vulnerability."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* S.A.F.E. Script Builder */}
        <section className="rounded-[2rem] border border-emerald-100 bg-emerald-50/60 p-8 md:p-10 backdrop-blur-xl">
          <h2 className="text-2xl font-semibold text-slate-900 mb-3 flex items-center gap-3">
            <MessageSquare className="w-7 h-7 text-emerald-600" />
            The S.A.F.E. Script Builder
          </h2>
          <p className="text-slate-600 mb-8 text-base leading-7">
            When anxiety hits, our brains go blank. Use the S.A.F.E. method to construct an emotionally honest, blame-free boundary. Select a scenario and click through each step.
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {scenarios.map((scenario, idx) => (
              <button
                key={idx}
                onClick={() => { setActiveScenario(idx); setRevealedSteps(0); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeScenario === idx ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-emerald-100 border border-emerald-200'}`}
              >
                {scenario.title}
              </button>
            ))}
          </div>

          <div className="bg-white/80 rounded-2xl border border-emerald-100 overflow-hidden shadow-sm backdrop-blur">
            <div className="bg-slate-50/80 p-6 border-b border-emerald-100">
              <p className="text-slate-600 font-medium italic text-sm leading-7">&ldquo;{scenarios[activeScenario].context}&rdquo;</p>
            </div>

            <div className="p-6 md:p-8 space-y-4">
              {scenarios[activeScenario].steps.map((step, idx) => (
                <div key={idx}>
                  {idx <= revealedSteps ? (
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg border border-emerald-200 shadow-sm">
                        {step.letter}
                      </div>
                      <div className="pt-1">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{step.name}</h4>
                        <p className="text-base text-slate-800 font-medium leading-7">{step.text}</p>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setRevealedSteps(idx)}
                      className="flex items-center w-full p-4 rounded-2xl border-2 border-dashed border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-400 transition-all font-medium text-sm"
                    >
                      <Unlock className="w-4 h-4 mr-2" /> Reveal Step {idx + 1}: {step.name}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {revealedSteps === 3 && (
              <div className="p-6 md:p-8 bg-slate-950 text-white border-t border-slate-800">
                <h4 className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">Your Completed Boundary Script</h4>
                <blockquote className="text-lg font-serif italic mb-6 leading-8 text-slate-200">
                  &ldquo;{scenarios[activeScenario].steps.map(s => s.text).join(' ')}&rdquo;
                </blockquote>
                <button
                  onClick={() => handleCopy(scenarios[activeScenario].steps.map(s => s.text).join(' '))}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 rounded-xl text-sm font-medium transition-colors"
                >
                  {copied ? <><CheckCircle2 className="w-4 h-4" /> Copied to Clipboard</> : <><Copy className="w-4 h-4" /> Copy Script</>}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Boundary Contract Journal */}
        <section className="rounded-[2rem] border border-white/70 bg-white/70 p-8 md:p-10 shadow-lg shadow-emerald-100/40 backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-3">
                <PenTool className="w-6 h-6 text-emerald-600" />
                Your Boundary Contract
              </h2>
              <p className="text-slate-600 mb-5 text-sm leading-7">
                Reading about boundaries is easy; holding them when your nervous system feels threatened is the real work. Identify <strong className="text-slate-800">one small, low-stakes boundary</strong> you can set this week to build your &ldquo;boundary muscle.&rdquo;
              </p>
              <ul className="space-y-3">
                <li className="flex items-start text-sm text-slate-600 gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <em>&ldquo;I will wait 30 minutes before replying to non-urgent texts.&rdquo;</em>
                </li>
                <li className="flex items-start text-sm text-slate-600 gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <em>&ldquo;I will tell my mom I can only talk for 10 minutes on Sunday.&rdquo;</em>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-2">
                <textarea
                  className="w-full h-40 p-4 bg-transparent resize-none outline-none text-slate-700 placeholder:text-slate-400 leading-relaxed text-sm"
                  placeholder="My boundary commitment for this week is..."
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                />
                <div className="flex justify-end p-2 border-t border-emerald-100">
                  <button
                    onClick={handleSaveJournal}
                    disabled={journalEntry.length === 0}
                    className="flex items-center gap-2 px-6 py-2.5 bg-slate-950 text-white font-medium rounded-xl hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
                  >
                    {isSaved ? <><CheckCircle2 className="w-4 h-4" /> Contract Saved</> : 'Sign Contract'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a href="/workbook/anxious-attachment/week-2" className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm">
            ← Back to Week 2
          </a>
          <a
            href="/workbook/anxious-attachment/week-4"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-8 py-4 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-slate-800 shadow-lg group"
          >
            Complete Week 3
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
