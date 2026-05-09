'use client';

import React, { useState, useEffect } from 'react';
import {
  Eye, Hand, Ear, Wind, Coffee, ArrowRight,
  ShieldCheck, Brain, Clock, Anchor,
  RefreshCcw, Play, Square, Info,
} from 'lucide-react';
import { saveWorkbookEntry } from '@/app/actions/saveWorkbookEntry';

const CARD =
  'rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-indigo-100/40 border border-white/60 p-8 md:p-10';

const TEXTAREA =
  'w-full bg-white/80 border border-indigo-200 rounded-2xl p-4 text-slate-700 placeholder:text-slate-400 ' +
  'focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none resize-none shadow-inner transition-all';

const senses = [
  { num: 5, sense: 'Things you see',       icon: <Eye  className="w-10 h-10" />, color: 'bg-blue-500',    text: 'text-blue-600',    border: 'border-blue-500',    bgLight: 'bg-blue-50',    tip: 'Look for small details you usually ignore. A shadow, a crack in the wall, the pattern on a book.' },
  { num: 4, sense: 'Things you can touch', icon: <Hand className="w-10 h-10" />, color: 'bg-emerald-500', text: 'text-emerald-600', border: 'border-emerald-500', bgLight: 'bg-emerald-50', tip: 'Actually reach out and touch them. Is it cold? Is it rough? Is it soft?' },
  { num: 3, sense: 'Things you hear',      icon: <Ear  className="w-10 h-10" />, color: 'bg-amber-500',   text: 'text-amber-600',   border: 'border-amber-500',   bgLight: 'bg-amber-50',   tip: 'Listen closely. The hum of a fridge? A car outside? Your own breath?' },
  { num: 2, sense: 'Things you smell',     icon: <Wind className="w-10 h-10" />, color: 'bg-rose-500',    text: 'text-rose-600',    border: 'border-rose-500',    bgLight: 'bg-rose-50',    tip: "Your shirt? Coffee? If you can't smell anything, just take a deep sniff of the air." },
  { num: 1, sense: 'Thing you taste',      icon: <Coffee className="w-10 h-10" />, color: 'bg-purple-500', text: 'text-purple-600', border: 'border-purple-500', bgLight: 'bg-purple-50', tip: 'Is there a lingering taste of toothpaste? Coffee? If not, just take a sip of water.' },
];

const whatIfCards = [
  { if: 'What if they are losing feelings for me right now?', is: 'Right now, I am safely sitting in my room, and no one is actively leaving me.' },
  { if: 'What if they find someone better and abandon me?',   is: 'Right now, my feet are on the floor, and I am breathing in oxygen.' },
  { if: 'What if I am too needy and ruin everything?',        is: 'Right now, I am simply having a feeling. A feeling is not a fact.' },
];

export default function Day3() {
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState<string[]>(['', '', '', '', '']);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [isBreathing, setIsBreathing] = useState(false);
  const [inhaleTime, setInhaleTime] = useState(4);
  const [exhaleTime, setExhaleTime] = useState(6);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Exhale'>('Inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [reflection, setReflection] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isBreathing) { setBreathPhase('Inhale'); setTimeLeft(inhaleTime); return; }
    const timer = setTimeout(() => {
      if (timeLeft > 1) { setTimeLeft((t) => t - 1); }
      else {
        if (breathPhase === 'Inhale') { setBreathPhase('Exhale'); setTimeLeft(exhaleTime); }
        else { setBreathPhase('Inhale'); setTimeLeft(inhaleTime); }
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [isBreathing, timeLeft, breathPhase, inhaleTime, exhaleTime]);

  const toggleCard = (index: number) => setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));

  const handleSave = async () => {
    if (!reflection.trim()) return;
    setIsSaving(true);
    const flippedCount = Object.values(flippedCards).filter(Boolean).length;
    await saveWorkbookEntry({
      workbook: 'anxious-attachment',
      week: 1,
      day: 3,
      exerciseKey: 'somatic-grounding',
      content: {
        safetyStatement: reflection,
        groundingRecord: {
          saw:     inputs[0],
          touched: inputs[1],
          heard:   inputs[2],
          smelled: inputs[3],
          tasted:  inputs[4],
        },
        whatIfCardsFlipped: flippedCount,
        inhaleTime,
        exhaleTime,
      },
    });
    setIsSaving(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const bubbleScale = isBreathing && breathPhase === 'Inhale' ? 1.2 : 1;
  const glowScale   = isBreathing && breathPhase === 'Inhale' ? 1.6 : 1;
  const bubbleDuration = isBreathing ? (breathPhase === 'Inhale' ? `${inhaleTime}s` : `${exhaleTime}s`) : '1s';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50/30 to-slate-50 font-sans text-slate-800 pb-24">
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-purple-400/20 blur-3xl" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold tracking-widest uppercase border border-indigo-200">Week 1 · Day 3</span>
            <span className="text-indigo-500 text-sm font-semibold tracking-wide uppercase">The Earned Security Workbook</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Somatic Grounding</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">When anxiety pulls you into a scary future, we use your 5 senses to pull you back to the safe present.</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">
        <section className={CARD}>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900">
                <Clock className="w-7 h-7 text-indigo-500 shrink-0" />
                The Anxiety Time Machine
              </h2>
              <div className="space-y-4 text-base text-slate-600 leading-relaxed">
                <p>Think of your brain as a time machine. When you feel secure, your brain lives in the <strong>present</strong>. You enjoy the moment.</p>
                <p>But when your Anxious Attachment is triggered, your brain instantly jumps into a scary <strong>future</strong>. It starts asking terrifying questions: <em>What if they leave? What if I end up alone?</em></p>
                <div className="bg-indigo-50/80 p-5 rounded-2xl border border-indigo-100 flex items-start gap-3 mt-4">
                  <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-indigo-900 leading-relaxed"><strong>The problem:</strong> your body doesn't know the future isn't real yet. If you <em>think</em> about being abandoned, your body can panic as if it is happening right this second.</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 shrink-0">
              <img src="https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=600&auto=format&fit=crop" alt="Clock face" width={300} height={200} loading="lazy" className="w-full h-48 object-cover rounded-2xl shadow-md" />
            </div>
          </div>
        </section>

        <section className={CARD.replace('bg-white/70', 'bg-rose-50/60').replace('shadow-indigo-100/40', 'shadow-rose-100/40')}>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3 text-slate-900">
            <RefreshCcw className="w-7 h-7 text-rose-500 shrink-0" />
            Practice 1: Flip the What-Ifs
          </h2>
          <p className="text-slate-500 mb-8 text-base leading-relaxed">We stop time-traveling by changing <strong>What-Ifs</strong> into <strong>What-Is</strong>. Tap each card to drag your brain back to right now.</p>
          <div className="grid gap-4">
            {whatIfCards.map((card, index) => (
              <button key={index} onClick={() => toggleCard(index)} className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${ flippedCards[index] ? 'bg-emerald-50/80 border-emerald-400 shadow-md' : 'bg-white/80 border-rose-200 hover:border-rose-400 shadow-sm' }`}>
                <div className="flex items-center justify-between gap-4">
                  <div className="pr-8 flex-1">
                    <span className={`text-xs font-bold uppercase tracking-wider mb-2 block ${flippedCards[index] ? 'text-emerald-600' : 'text-rose-500'}`}>{flippedCards[index] ? 'What IS (The Safe Present)' : 'What IF (The Scary Future)'}</span>
                    <p className={`text-base font-medium leading-snug ${flippedCards[index] ? 'text-emerald-900' : 'text-slate-800'}`}>{flippedCards[index] ? card.is : card.if}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${flippedCards[index] ? 'bg-emerald-200 text-emerald-700' : 'bg-rose-100 text-rose-500'}`}>
                    <RefreshCcw className={`w-5 h-5 transition-transform duration-500 ${flippedCards[index] ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] bg-slate-950 text-white p-8 md:p-10 shadow-2xl relative overflow-hidden border border-slate-800/60">
          <div className="pointer-events-none absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                <Anchor className="w-7 h-7 text-indigo-400 shrink-0" />
                Practice 2: Drop Your Anchor
              </h2>
              <p className="text-indigo-200 text-base leading-relaxed mb-6">Before the 5-4-3-2-1 exercise, we drop an anchor. When a boat is in a storm, the anchor holds it still. Your breath is your anchor.</p>
              <div className="bg-indigo-900/50 p-6 rounded-2xl border border-indigo-800 mb-6">
                <h3 className="font-bold text-indigo-300 mb-4 uppercase tracking-wider text-sm">Personalize Your Breath</h3>
                <div className="mb-4">
                  <label className="flex justify-between text-sm text-indigo-100 mb-2"><span>Inhale</span><span className="font-bold">{inhaleTime}s</span></label>
                  <input type="range" min="2" max="8" value={inhaleTime} onChange={(e) => setInhaleTime(Number(e.target.value))} disabled={isBreathing} className="w-full accent-indigo-400 disabled:opacity-50" />
                </div>
                <div>
                  <label className="flex justify-between text-sm text-indigo-100 mb-2"><span>Exhale</span><span className="font-bold">{exhaleTime}s</span></label>
                  <input type="range" min="2" max="10" value={exhaleTime} onChange={(e) => setExhaleTime(Number(e.target.value))} disabled={isBreathing} className="w-full accent-indigo-400 disabled:opacity-50" />
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex flex-col items-center justify-center w-full">
              <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                <div className="absolute inset-0 bg-indigo-500/30 rounded-full blur-xl transition-all ease-in-out" style={{ transform: `scale(${glowScale})`, transitionDuration: bubbleDuration }} />
                <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-transform ease-in-out border-2 border-indigo-400/50" style={{ transform: `scale(${bubbleScale})`, transitionDuration: bubbleDuration }}>
                  <span className="font-bold text-lg uppercase tracking-wider text-white">{isBreathing ? breathPhase : 'Ready'}</span>
                  {isBreathing && <span className="text-3xl font-light mt-1">{timeLeft}</span>}
                </div>
              </div>
              <button onClick={() => { if (!isBreathing) { setBreathPhase('Inhale'); setTimeLeft(inhaleTime); } setIsBreathing(!isBreathing); }} className={`w-full max-w-xs py-4 rounded-full font-bold text-base transition-all flex items-center justify-center ${ isBreathing ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 hover:bg-rose-500/30' : 'bg-white text-indigo-900 hover:bg-indigo-50 hover:scale-105 shadow-xl' }`}>
                {isBreathing ? <><Square className="w-5 h-5 mr-2" /> Stop Anchor</> : <><Play className="w-5 h-5 mr-2" /> Start Anchor Breath</>}
              </button>
            </div>
          </div>
        </section>

        <section className={CARD}>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl font-extrabold mb-4 text-slate-900">Practice 3: The 5-4-3-2-1 Method</h2>
            <p className="text-slate-600 text-base leading-relaxed">Now that your anchor is dropped, let's look around. Your brain thinks you are in danger. By forcing your brain to process boring, normal sensory data, you prove to your body that you are actually safe.</p>
          </div>
          <div className="bg-slate-50 p-6 md:p-10 rounded-3xl border border-slate-200 min-h-[420px] flex flex-col justify-center">
            {step < 5 ? (
              <div className="w-full max-w-xl mx-auto">
                <div className={`flex flex-col items-center mb-8 p-6 rounded-2xl ${senses[step].bgLight} border ${senses[step].border}`}>
                  <div className={`w-20 h-20 rounded-full ${senses[step].color} text-white flex items-center justify-center mb-4 shadow-lg`}>{senses[step].icon}</div>
                  <h3 className={`text-2xl md:text-3xl font-bold ${senses[step].text} mb-2 text-center`}>Name {senses[step].num} {senses[step].sense}</h3>
                  <div className="flex items-start bg-white/60 p-3 rounded-lg mt-2">
                    <Info className={`w-5 h-5 mr-2 flex-shrink-0 mt-0.5 ${senses[step].text}`} />
                    <p className={`text-sm font-medium ${senses[step].text}`}>{senses[step].tip}</p>
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider pl-2">Type what you notice right now:</label>
                  <textarea placeholder="I notice..." className={`w-full bg-white border-2 ${senses[step].border} rounded-2xl p-5 outline-none text-slate-800 text-lg shadow-sm transition-shadow focus:shadow-md resize-none h-32`} value={inputs[step]} onChange={(e) => { const n = [...inputs]; n[step] = e.target.value; setInputs(n); }} />
                </div>
                <button onClick={() => setStep(step + 1)} disabled={!inputs[step].trim()} className={`w-full py-5 ${senses[step].color} text-white font-bold text-lg rounded-2xl disabled:opacity-30 disabled:grayscale transition-all shadow-md hover:shadow-lg active:scale-[0.99]`}>Confirm & Move to Next Sense</button>
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"><ShieldCheck className="w-16 h-16 text-emerald-500" /></div>
                <h3 className="text-4xl font-extrabold mb-4 text-emerald-600">Grounding Complete</h3>
                <p className="text-slate-600 text-xl max-w-md mx-auto mb-8 leading-relaxed">Your thinking brain is back online. You are safe in the present moment.</p>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 text-left max-w-2xl mx-auto">
                  <h4 className="font-bold text-slate-400 uppercase text-xs mb-3">Your Grounding Record</h4>
                  <ul className="space-y-2 text-slate-700 font-medium break-words">
                    <li><strong className="text-blue-500">Saw:</strong> {inputs[0]}</li>
                    <li><strong className="text-emerald-500">Touched:</strong> {inputs[1]}</li>
                    <li><strong className="text-amber-500">Heard:</strong> {inputs[2]}</li>
                    <li><strong className="text-rose-500">Smelled:</strong> {inputs[3]}</li>
                    <li><strong className="text-purple-500">Tasted:</strong> {inputs[4]}</li>
                  </ul>
                </div>
                <button onClick={() => { setStep(0); setInputs(['', '', '', '', '']); }} className="mt-8 px-8 py-3 bg-slate-200 rounded-full text-slate-700 font-bold hover:bg-slate-300 transition-colors">Restart Practice</button>
              </div>
            )}
          </div>
        </section>

        <section className={CARD.replace('bg-white/70', 'bg-indigo-50/80')}>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-indigo-900">
            <Brain className="w-6 h-6 text-indigo-600 shrink-0" />
            Final Check-In
          </h2>
          <p className="text-indigo-800 mb-4 text-base leading-relaxed">Finish this sentence to lock in the feeling of safety:</p>
          <div className="bg-white p-4 rounded-2xl border border-indigo-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
            <span className="font-bold text-lg text-indigo-900 whitespace-nowrap">I am safe right now because...</span>
            <input type="text" className="flex-1 w-full outline-none text-lg text-slate-700 border-b border-dashed border-indigo-300 focus:border-indigo-600 pb-1 bg-transparent" placeholder="e.g. I am sitting in my room, breathing" value={reflection} onChange={(e) => setReflection(e.target.value)} />
          </div>
          <div className="flex justify-end mt-6">
            <button onClick={handleSave} disabled={!reflection.trim() || isSaving} className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors">
              {isSaved ? 'Saved!' : isSaving ? 'Saving…' : 'Save Reflection'}
            </button>
          </div>
        </section>

        <section className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a href="/workbook/anxious-attachment/week-1/day-2" className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm">← Back to Day 2</a>
          <a href="/workbook/anxious-attachment/week-1/day-4" className="inline-flex items-center px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-colors shadow-lg text-sm">Continue to Day 4 <ArrowRight className="w-5 h-5 ml-2" /></a>
        </section>
      </main>
    </div>
  );
}
