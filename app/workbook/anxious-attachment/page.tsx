import React from 'react';
import { 
  Heart, 
  ShieldCheck, 
  MessageCircle, 
  Anchor, 
  BrainCircuit, 
  BookOpen, 
  Clock, 
  ImageIcon, 
  PenTool, 
  UserCircle2,
  ArrowRight,
  Leaf
} from 'lucide-react';


export const metadata = {
  title: 'The Earned Security Workbook | OopsCupid',
  description: 'A 6-Week Actionable Guide to Cultivating Inner Peace and Healthy Relationships.',
};


export default function AnxiousAttachmentWorkbook() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-indigo-100">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 lg:px-8 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=2500&auto=format&fit=crop" 
            alt="Calm morning ocean waves" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white/95"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold tracking-wider mb-6">
            A 6-WEEK ACTIONABLE GUIDE
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            The Earned Security <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Workbook</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
            Healing Anxious Attachment: Cultivating Inner Peace and Healthy Relationships.
          </p>
          <a href="#day-1" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-full shadow-sm hover:bg-indigo-700 transition-all hover:scale-105 duration-200">
            Start Day 1 Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>


      {/* Introduction & Foundation */}
      <section className="py-20 px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
                <Leaf className="w-8 h-8 text-emerald-500 mr-3" />
                Understanding Anxious Attachment
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  If you constantly wonder, <em>"Did I do something wrong?"</em> or feel a rush of panic when a text goes unanswered, you are not alone. Anxious attachment typically stems from early childhood experiences where caregiving was inconsistent. 
                </p>
                <p>
                  As a result, your nervous system learned to be on high alert for abandonment, leading you to seek constant reassurance and validation.
                </p>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h3 className="text-xl font-semibold text-indigo-700 mb-2">The Goal: Earned Secure Attachment</h3>
                  <p className="text-base">
                    You are not destined to repeat these patterns forever. Neuroscience shows that the brain remains plastic throughout our lifespan. By integrating new tools, you can develop <strong>Earned Secure Attachment</strong>. You can learn to feel safe with closeness, handle conflict without panic, and trust your own needs.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop" 
                  alt="Person journaling thoughtfully" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-lg border border-slate-100 max-w-xs">
                <p className="text-sm font-medium text-slate-800">
                  "This is a 6-week, step-by-step program. Each week builds upon the last, focusing on your nervous system, your inner child, your boundaries, and your communication skills."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Weekly Curriculum Overview */}
      <section className="py-20 px-6 lg:px-8 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Your 6-Week Journey</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">A structured path to reparenting yourself and rewriting your relationship blueprint.</p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Week 1 */}
            <div className="bg-slate-50 p-8 rounded-3xl hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                <BrainCircuit className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-sm font-bold text-indigo-600 tracking-wider mb-2">WEEK 1</h3>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Befriending Your Nervous System</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Before changing thoughts, we must calm the body. Learn the 30-Second Reset and 5-4-3-2-1 Grounding Method to exit "fight or flight" mode.
              </p>
            </div>


            {/* Week 2 */}
            <div className="bg-slate-50 p-8 rounded-3xl hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-rose-600" />
              </div>
              <h3 className="text-sm font-bold text-rose-600 tracking-wider mb-2">WEEK 2</h3>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Healing the Inner Child</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Explore the 7-Day Inner Child Practice. Learn to reparent yourself and provide the emotional response your younger self needed.
              </p>
            </div>


            {/* Week 3 */}
            <div className="bg-slate-50 p-8 rounded-3xl hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-sm font-bold text-emerald-600 tracking-wider mb-2">WEEK 3</h3>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Setting Boundaries Without Guilt</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Dismantle the belief that boundaries make you "mean." Master the S.A.F.E. Method and practice scripts to protect your energy.
              </p>
            </div>


            {/* Week 4 */}
            <div className="bg-slate-50 p-8 rounded-3xl hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-sm font-bold text-blue-600 tracking-wider mb-2">WEEK 4</h3>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Rewriting the Narrative</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Move out of reactive mode. Use daily journaling prompts to externalize fears and evaluate anxious stories rationally.
              </p>
            </div>


            {/* Week 5 */}
            <div className="bg-slate-50 p-8 rounded-3xl hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
                <MessageCircle className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-sm font-bold text-amber-600 tracking-wider mb-2">WEEK 5</h3>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Communication & Conflict Repair</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Break the anxious-avoidant cycle. Learn the "Observation-Meaning-Ask" template and the 3 R's of healthy relationship repair.
              </p>
            </div>


            {/* Week 6 */}
            <div className="bg-slate-50 p-8 rounded-3xl hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <Anchor className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-sm font-bold text-purple-600 tracking-wider mb-2">WEEK 6</h3>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Cultivating Earned Security</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Step out of isolation. Seek secure connections, track your self-soothing progress, and accept that you deserve love without earning it.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Interactive Day 1 Section */}
      <section id="day-1" className="py-24 px-6 lg:px-8 bg-indigo-50 scroll-mt-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-indigo-100">
            {/* Header */}
            <div className="bg-indigo-600 p-10 text-white text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#ffffff" d="M38.1,-48.5C49.9,-37.8,60.2,-25.4,65.3,-11.1C70.4,3.2,70.2,19.4,62.8,32.3C55.4,45.2,40.7,54.8,24.8,61.1C8.9,67.4,-8.2,70.3,-23.4,65.8C-38.6,61.3,-51.9,49.3,-60.8,34.8C-69.7,20.3,-74.2,3.3,-70.6,-11.6C-67,-26.5,-55.4,-39.3,-41.8,-49.7C-28.2,-60.1,-14.1,-68.2,-0.2,-67.9C13.6,-67.7,27.3,-59.2,38.1,-48.5Z" transform="translate(200 200) scale(1.1)" />
                </svg>
              </div>
              <div className="relative z-10">
                <h2 className="text-indigo-100 font-bold tracking-widest text-sm mb-2 uppercase">Your Journey Begins Here</h2>
                <h3 className="text-3xl md:text-5xl font-extrabold mb-4">DAY 1: Meeting Your Inner Child & Finding Safety</h3>
                <div className="flex items-center justify-center space-x-2 text-indigo-50 font-medium">
                  <Clock className="w-5 h-5" />
                  <span>Total Time Commitment: ~30 Minutes</span>
                </div>
              </div>
            </div>


            {/* Intro Text */}
            <div className="p-8 md:p-12">
              <p className="text-lg text-slate-600 mb-10 leading-relaxed text-center max-w-2xl mx-auto">
                Healing anxious attachment requires unlearning past behaviors and replacing them with new coping skills. Because your attachment style is heavily encoded in your nervous system, looking backward requires establishing a foundation of physical safety first. Today, you will combine somatic (body-based) grounding with your first inner child exercise.
              </p>


              <div className="space-y-12">
                {/* Step 1 */}
                <div className="relative pl-8 md:pl-0">
                  <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-indigo-100"></div>
                  <div className="md:flex gap-8 relative">
                    <div className="absolute -left-8 md:relative md:left-0 z-10">
                      <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white">
                        <BrainCircuit className="w-7 h-7" />
                      </div>
                    </div>
                    <div className="flex-1 bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-indigo-200 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-bold text-slate-900">Step 1: The 30-Second Nervous System Reset</h4>
                        <span className="text-sm font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">2 Mins</span>
                      </div>
                      <p className="text-slate-600 mb-4">Before you begin exploring your past, you must teach your body that stillness does not equal danger. When you feel the panic of relationship anxiety, your body often shifts into a "fight or flight" sympathetic state. Practice this reset to signal safety to your brain:</p>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                          <span className="text-slate-700">Let your eyes wander until they land on one <strong>neutral object</strong> in the room.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                          <span className="text-slate-700">Take a breath, and <strong>exhale slightly longer</strong> than you inhaled.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                          <span className="text-slate-700">Feel <strong>one spot of physical support</strong>, like your feet planted firmly on the floor or your back resting against your chair.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>


                {/* Step 2 */}
                <div className="relative pl-8 md:pl-0">
                  <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-indigo-100"></div>
                  <div className="md:flex gap-8 relative">
                    <div className="absolute -left-8 md:relative md:left-0 z-10">
                      <div className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white">
                        <ImageIcon className="w-7 h-7" />
                      </div>
                    </div>
                    <div className="flex-1 bg-rose-50/50 p-8 rounded-3xl border border-rose-100 hover:border-rose-200 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-bold text-slate-900">Step 2: The Inner Child Photo Exercise</h4>
                        <span className="text-sm font-bold text-rose-500 bg-rose-100 px-3 py-1 rounded-full">10 Mins</span>
                      </div>
                      <p className="text-slate-600 mb-4">Your inner child holds the memories, emotions, and beliefs from when you were little, and this part of you still heavily influences how you react to relationship stress today.</p>
                      <div className="bg-white p-5 rounded-2xl space-y-3 shadow-sm border border-rose-50">
                        <p className="flex items-start text-slate-700"><ArrowRight className="w-5 h-5 text-rose-400 mr-2 flex-shrink-0 mt-0.5"/> Find one to three photographs of yourself between the ages of 4 and 10.</p>
                        <p className="flex items-start text-slate-700"><ArrowRight className="w-5 h-5 text-rose-400 mr-2 flex-shrink-0 mt-0.5"/> Really look at the child in the pictures and ask yourself: <em>What emotion do you see in your eyes?</em></p>
                        <p className="flex items-start text-slate-700"><ArrowRight className="w-5 h-5 text-rose-400 mr-2 flex-shrink-0 mt-0.5"/> If you find yourself thinking critical thoughts about the child in the photo, gently notice that judgment.</p>
                        <p className="flex items-start text-slate-700"><ArrowRight className="w-5 h-5 text-rose-400 mr-2 flex-shrink-0 mt-0.5"/> Write down the emotions you observe. Do not edit or analyze them—just let the words flow.</p>
                      </div>
                    </div>
                  </div>
                </div>


                {/* Step 3 */}
                <div className="relative pl-8 md:pl-0">
                  <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-indigo-100"></div>
                  <div className="md:flex gap-8 relative">
                    <div className="absolute -left-8 md:relative md:left-0 z-10">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white">
                        <PenTool className="w-7 h-7" />
                      </div>
                    </div>
                    <div className="flex-1 bg-blue-50/50 p-8 rounded-3xl border border-blue-100 hover:border-blue-200 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-bold text-slate-900">Step 3: Attachment Awareness Journaling</h4>
                        <span className="text-sm font-bold text-blue-500 bg-blue-100 px-3 py-1 rounded-full">15 Mins</span>
                      </div>
                      <p className="text-slate-600 mb-5">Journaling is a powerful tool to interrupt an anxious spiral, moving you out of reactive mode and into a space where you can self-reflect and self-soothe. Spend 15 minutes writing honest, uncensored answers to the following prompts:</p>
                      
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-xl border-l-4 border-blue-400 shadow-sm">
                          <p className="text-slate-800 font-medium italic">"What did I learn as a child about asking for what I needed, and was I allowed to want what I wanted?"</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border-l-4 border-blue-400 shadow-sm">
                          <p className="text-slate-800 font-medium italic">"When my partner or a friend is distant, what story does my mind immediately tell me? Is that story usually accurate?"</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border-l-4 border-blue-400 shadow-sm">
                          <p className="text-slate-800 font-medium italic">"What are the early signs in my body (like a tight chest, churning stomach, or clenched jaw) that I am becoming anxious about a relationship?"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                {/* Step 4 */}
                <div className="relative pl-8 md:pl-0">
                  <div className="md:flex gap-8 relative">
                    <div className="absolute -left-8 md:relative md:left-0 z-10">
                      <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white">
                        <UserCircle2 className="w-7 h-7" />
                      </div>
                    </div>
                    <div className="flex-1 bg-emerald-50/50 p-8 rounded-3xl border border-emerald-100 hover:border-emerald-200 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-bold text-slate-900">Step 4: The Mirror Motive & Integration</h4>
                        <span className="text-sm font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">3 Mins</span>
                      </div>
                      <p className="text-slate-600 mb-4">Developing "earned secure attachment" means building a coherent narrative where you can acknowledge difficult past experiences without being overwhelmed by them. You can begin to heal your inner child by stepping into the role of a nurturing caregiver for yourself.</p>
                      <div className="bg-white p-6 rounded-2xl text-center border border-emerald-100 shadow-sm">
                        <p className="text-slate-700 mb-4">Step in front of a mirror and look directly at your reflection. Practice reparenting by saying out loud:</p>
                        <blockquote className="text-2xl font-serif text-emerald-700 mb-4">"I see you and I hear you."</blockquote>
                        <p className="text-slate-600 text-sm">Tell yourself that you are worthy and that you are good enough to reshape your automatic beliefs.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              {/* Day 1 Wrap Up */}
              <div className="mt-16 bg-slate-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-2xl font-bold text-white mb-4">Day 1 Wrap-Up</h4>
                  <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
                    You do not need to fix everything today. Your attachment patterns took years to form and were survival strategies that worked for you in your original environment. Congratulate yourself for taking this first step; by noticing your body and acknowledging your younger self, you are already laying the foundation for secure, healthy relationships.
                  </p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>


      {/* Footer / CTA */}
      <footer className="bg-white py-12 text-center border-t border-slate-200">
        <p className="text-slate-500 mb-4 font-medium">Ready to continue your healing journey?</p>
        <button className="px-8 py-3 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors">
          Unlock Full 6-Week Workbook
        </button>
      </footer>
    </main>
  );
}
