import { Question } from "./types";

export const MANIPULATION_QUESTIONS: Question[] = [
  // ==========================================
  // MODULE 1: PAR (Psychological Abuse Core) - 20 Items
  // ==========================================
  // Subscale: severe_psych_abuse (7 items)
  { id: "par_s1", module: "par", subscale: "severe_psych_abuse", responseType: "frequency_0_5", order: 1, stem: "He used threats involving your physical safety to pressure you.", safetyCritical: true },
  { id: "par_s2", module: "par", subscale: "severe_psych_abuse", responseType: "frequency_0_5", order: 2, stem: "He threatened to harm or take away your children if you didn't comply.", safetyCritical: true },
  { id: "par_s3", module: "par", subscale: "severe_psych_abuse", responseType: "frequency_0_5", order: 3, stem: "He threatened to hurt your pets or destroy things you care about." },
  { id: "par_s4", module: "par", subscale: "severe_psych_abuse", responseType: "frequency_0_5", order: 4, stem: "He threatened to kick you out or ruin your housing situation.", safetyCritical: true },
  { id: "par_s5", module: "par", subscale: "severe_psych_abuse", responseType: "frequency_0_5", order: 5, stem: "He intentionally restricted your access to food, sleep, or basic needs.", safetyCritical: true },
  { id: "par_s6", module: "par", subscale: "severe_psych_abuse", responseType: "frequency_0_5", order: 6, stem: "He interfered with your ability to get medical care or medication.", safetyCritical: true },
  { id: "par_s7", module: "par", subscale: "severe_psych_abuse", responseType: "frequency_0_5", order: 7, stem: "He made you feel afraid for your life or physical well-being.", safetyCritical: true },

  // Subscale: coercive_emotional (5 items)
  { id: "par_e1", module: "par", subscale: "coercive_emotional", responseType: "frequency_0_5", order: 8, stem: "He used sudden outbursts of anger to make you back down." },
  { id: "par_e2", module: "par", subscale: "coercive_emotional", responseType: "frequency_0_5", order: 9, stem: "He humiliated you or called you degrading names to break your confidence." },
  { id: "par_e3", module: "par", subscale: "coercive_emotional", responseType: "frequency_0_5", order: 10, stem: "He punished you with silence or withdrawal until you apologized for something you didn't do." },
  { id: "par_e4", module: "par", subscale: "coercive_emotional", responseType: "frequency_0_5", order: 11, stem: "He intentionally did things to make you feel as though you were 'crazy'." },
  { id: "par_e5", module: "par", subscale: "coercive_emotional", responseType: "frequency_0_5", order: 12, stem: "He threatened to expose secrets or ruin your reputation if you didn't do what he wanted." },

  // Subscale: restrictive_isolating (5 items)
  { id: "par_i1", module: "par", subscale: "restrictive_isolating", responseType: "frequency_0_5", order: 13, stem: "He made it harder for you to see or talk to your friends." },
  { id: "par_i2", module: "par", subscale: "restrictive_isolating", responseType: "frequency_0_5", order: 14, stem: "He tried to turn you against your family or your family against you." },
  { id: "par_i3", module: "par", subscale: "restrictive_isolating", responseType: "frequency_0_5", order: 15, stem: "He demanded to know where you were and who you were with at all times." },
  { id: "par_i4", module: "par", subscale: "restrictive_isolating", responseType: "frequency_0_5", order: 16, stem: "He acted suspiciously jealous of your interactions with others, without cause." },
  { id: "par_i5", module: "par", subscale: "restrictive_isolating", responseType: "frequency_0_5", order: 17, stem: "He prevented you from leaving the house or attending social events." },

  // Subscale: financial_abuse (3 items)
  { id: "par_f1", module: "par", subscale: "financial_abuse", responseType: "frequency_0_5", order: 18, stem: "He took your money or made you give him control over your finances." },
  { id: "par_f2", module: "par", subscale: "financial_abuse", responseType: "frequency_0_5", order: 19, stem: "He tried to sabotage your job, education, or career goals." },
  { id: "par_f3", module: "par", subscale: "financial_abuse", responseType: "frequency_0_5", order: 20, stem: "He forced you to ask for money to buy essential items.", safetyCritical: true },

  // ==========================================
  // MODULE 2: COERCIVE CONTROL DEEP DIVE - 28 Items
  // ==========================================
  // Subscale: demands (8 items)
  { id: "cc_d1", module: "coercive_control", subscale: "demands", responseType: "frequency_0_5", order: 21, premiumOnly: true, stem: "He expected compliance with strict rules about how you spend your time." },
  { id: "cc_d2", module: "coercive_control", subscale: "demands", responseType: "frequency_0_5", order: 22, premiumOnly: true, stem: "He dictated what you could or could not wear." },
  { id: "cc_d3", module: "coercive_control", subscale: "demands", responseType: "frequency_0_5", order: 23, premiumOnly: true, stem: "He expected you to drop everything to attend to his needs immediately." },
  { id: "cc_d4", module: "coercive_control", subscale: "demands", responseType: "frequency_0_5", order: 24, premiumOnly: true, stem: "He demanded that you share passwords to your phone or social media." },
  { id: "cc_d5", module: "coercive_control", subscale: "demands", responseType: "frequency_0_5", order: 25, premiumOnly: true, stem: "He demanded sexual intimacy regardless of how you were feeling." },
  { id: "cc_d6", module: "coercive_control", subscale: "demands", responseType: "frequency_0_5", order: 26, premiumOnly: true, stem: "He expected you to cut ties with people he didn't approve of." },
  { id: "cc_d7", module: "coercive_control", subscale: "demands", responseType: "frequency_0_5", order: 27, premiumOnly: true, stem: "He set rules about how you were allowed to speak to him." },
  { id: "cc_d8", module: "coercive_control", subscale: "demands", responseType: "frequency_0_5", order: 28, premiumOnly: true, stem: "He required you to perform household or emotional labor to his exact standards." },

  // Subscale: threats (8 items)
  { id: "cc_t1", module: "coercive_control", subscale: "threats", responseType: "frequency_0_5", order: 29, premiumOnly: true, stem: "He implied he would leave or abandon you if you disagreed with him." },
  { id: "cc_t2", module: "coercive_control", subscale: "threats", responseType: "frequency_0_5", order: 30, premiumOnly: true, stem: "He threatened to make your life miserable if you didn't comply." },
  { id: "cc_t3", module: "coercive_control", subscale: "threats", responseType: "frequency_0_5", order: 31, premiumOnly: true, stem: "He threatened to harm himself and blamed it on you." },
  { id: "cc_t4", module: "coercive_control", subscale: "threats", responseType: "frequency_0_5", order: 32, premiumOnly: true, stem: "He implied retaliation against your friends or family." },
  { id: "cc_t5", module: "coercive_control", subscale: "threats", responseType: "frequency_0_5", order: 33, premiumOnly: true, stem: "He warned you that no one else would ever want or love you." },
  { id: "cc_t6", module: "coercive_control", subscale: "threats", responseType: "frequency_0_5", order: 34, premiumOnly: true, stem: "He threatened to ruin your career or get you fired." },
  { id: "cc_t7", module: "coercive_control", subscale: "threats", responseType: "frequency_0_5", order: 35, premiumOnly: true, stem: "He threatened to spread lies about you online or to peers." },
  { id: "cc_t8", module: "coercive_control", subscale: "threats", responseType: "frequency_0_5", order: 36, premiumOnly: true, stem: "He made vague, menacing comments to keep you on edge." },

  // Subscale: surveillance (6 items)
  { id: "cc_v1", module: "coercive_control", subscale: "surveillance", responseType: "frequency_0_5", order: 37, premiumOnly: true, stem: "He monitored your texts, calls, or private messages without your permission." },
  { id: "cc_v2", module: "coercive_control", subscale: "surveillance", responseType: "frequency_0_5", order: 38, premiumOnly: true, stem: "He tracked your location using GPS, apps, or airtags.", safetyCritical: true },
  { id: "cc_v3", module: "coercive_control", subscale: "surveillance", responseType: "frequency_0_5", order: 39, premiumOnly: true, stem: "He unexpectedly showed up at your work or social events to check on you." },
  { id: "cc_v4", module: "coercive_control", subscale: "surveillance", responseType: "frequency_0_5", order: 40, premiumOnly: true, stem: "He demanded photo evidence of where you were and who you were with." },
  { id: "cc_v5", module: "coercive_control", subscale: "surveillance", responseType: "frequency_0_5", order: 41, premiumOnly: true, stem: "He monitored your bank accounts or spending history obsessively." },
  { id: "cc_v6", module: "coercive_control", subscale: "surveillance", responseType: "frequency_0_5", order: 42, premiumOnly: true, stem: "He contacted your friends to secretly verify your stories." },

  // Subscale: response_to_demands (6 items)
  { id: "cc_r1", module: "coercive_control", subscale: "response_to_demands", responseType: "frequency_0_5", order: 43, premiumOnly: true, stem: "You changed how you dressed to avoid his criticism." },
  { id: "cc_r2", module: "coercive_control", subscale: "response_to_demands", responseType: "frequency_0_5", order: 44, premiumOnly: true, stem: "You lied to your friends or family to cover up his behavior." },
  { id: "cc_r3", module: "coercive_control", subscale: "response_to_demands", responseType: "frequency_0_5", order: 45, premiumOnly: true, stem: "You stopped doing hobbies you loved because it caused fights with him." },
  { id: "cc_r4", module: "coercive_control", subscale: "response_to_demands", responseType: "frequency_0_5", order: 46, premiumOnly: true, stem: "You carefully monitored your own tone of voice to prevent him from getting angry." },
  { id: "cc_r5", module: "coercive_control", subscale: "response_to_demands", responseType: "frequency_0_5", order: 47, premiumOnly: true, stem: "You agreed to sexual activities you didn't want, just to keep the peace." },
  { id: "cc_r6", module: "coercive_control", subscale: "response_to_demands", responseType: "frequency_0_5", order: 48, premiumOnly: true, stem: "You rushed home out of fear of how he would react if you were late." },

  // ==========================================
  // MODULE 3: POWER TACTICS PROFILE - 24 Items
  // ==========================================
  // Subscale: intimidation (6 items)
  { id: "pt_i1", module: "power_tactics", subscale: "intimidation", responseType: "frequency_0_5", order: 49, premiumOnly: true, stem: "He destroyed your property or punched walls during an argument." },
  { id: "pt_i2", module: "power_tactics", subscale: "intimidation", responseType: "frequency_0_5", order: 50, premiumOnly: true, stem: "He used his physical size to corner you or block doors." },
  { id: "pt_i3", module: "power_tactics", subscale: "intimidation", responseType: "frequency_0_5", order: 51, premiumOnly: true, stem: "He drove recklessly while you were in the car to scare you." },
  { id: "pt_i4", module: "power_tactics", subscale: "intimidation", responseType: "frequency_0_5", order: 52, premiumOnly: true, stem: "He gave you intense, aggressive looks that made you afraid." },
  { id: "pt_i5", module: "power_tactics", subscale: "intimidation", responseType: "frequency_0_5", order: 53, premiumOnly: true, stem: "He smashed or threw objects near you." },
  { id: "pt_i6", module: "power_tactics", subscale: "intimidation", responseType: "frequency_0_5", order: 54, premiumOnly: true, stem: "He stood over you or invaded your personal space to dominate the conversation." },

  // Subscale: blame_minimization (6 items)
  { id: "pt_b1", module: "power_tactics", subscale: "blame_minimization", responseType: "frequency_0_5", order: 55, premiumOnly: true, stem: "He claimed his abusive behavior was your fault." },
  { id: "pt_b2", module: "power_tactics", subscale: "blame_minimization", responseType: "frequency_0_5", order: 56, premiumOnly: true, stem: "He minimized his hurtful actions by saying he was 'just joking'." },
  { id: "pt_b3", module: "power_tactics", subscale: "blame_minimization", responseType: "frequency_0_5", order: 57, premiumOnly: true, stem: "He shifted the focus of arguments so that you ended up apologizing." },
  { id: "pt_b4", module: "power_tactics", subscale: "blame_minimization", responseType: "frequency_0_5", order: 58, premiumOnly: true, stem: "He blamed his actions on stress, alcohol, or his past, rather than taking responsibility." },
  { id: "pt_b5", module: "power_tactics", subscale: "blame_minimization", responseType: "frequency_0_5", order: 59, premiumOnly: true, stem: "He told you that you were being 'too sensitive' when you expressed hurt." },
  { id: "pt_b6", module: "power_tactics", subscale: "blame_minimization", responseType: "frequency_0_5", order: 60, premiumOnly: true, stem: "He insisted that you are the one who is actually abusive to him." },

  // Subscale: isolation_dependency (6 items)
  { id: "pt_id1", module: "power_tactics", subscale: "isolation_dependency", responseType: "frequency_0_5", order: 61, premiumOnly: true, stem: "He subtly criticized your friends so you would stop seeing them." },
  { id: "pt_id2", module: "power_tactics", subscale: "isolation_dependency", responseType: "frequency_0_5", order: 62, premiumOnly: true, stem: "He made scenes or pouted before you went out, making it easier to just stay home." },
  { id: "pt_id3", module: "power_tactics", subscale: "isolation_dependency", responseType: "frequency_0_5", order: 63, premiumOnly: true, stem: "He convinced you that he is the only person who truly understands or loves you." },
  { id: "pt_id4", module: "power_tactics", subscale: "isolation_dependency", responseType: "frequency_0_5", order: 64, premiumOnly: true, stem: "He intercepted your messages or controlled your communication devices." },
  { id: "pt_id5", module: "power_tactics", subscale: "isolation_dependency", responseType: "frequency_0_5", order: 65, premiumOnly: true, stem: "He required you to move away from your support network." },
  { id: "pt_id6", module: "power_tactics", subscale: "isolation_dependency", responseType: "frequency_0_5", order: 66, premiumOnly: true, stem: "He made you feel entirely dependent on him for emotional support." },

  // Subscale: economic_control (6 items)
  { id: "pt_e1", module: "power_tactics", subscale: "economic_control", responseType: "frequency_0_5", order: 67, premiumOnly: true, stem: "He ruined your credit or put debts in your name without permission.", safetyCritical: true },
  { id: "pt_e2", module: "power_tactics", subscale: "economic_control", responseType: "frequency_0_5", order: 68, premiumOnly: true, stem: "He demanded you quit your job or reduce your hours." },
  { id: "pt_e3", module: "power_tactics", subscale: "economic_control", responseType: "frequency_0_5", order: 69, premiumOnly: true, stem: "He forced you to hand over your paychecks to him." },
  { id: "pt_e4", module: "power_tactics", subscale: "economic_control", responseType: "frequency_0_5", order: 70, premiumOnly: true, stem: "He made all major financial decisions without consulting you." },
  { id: "pt_e5", module: "power_tactics", subscale: "economic_control", responseType: "frequency_0_5", order: 71, premiumOnly: true, stem: "He hid financial assets or lied about his income." },
  { id: "pt_e6", module: "power_tactics", subscale: "economic_control", responseType: "frequency_0_5", order: 72, premiumOnly: true, stem: "He refused to work, forcing you to bear the entire financial burden while he controlled the spending." },

  // ==========================================
  // MODULE 4: GASLIGHTING SCREEN - 11 Items
  // ==========================================
  // Subscale: reality_distortion (4 items)
  { id: "gl_r1", module: "gaslighting", subscale: "reality_distortion", responseType: "frequency_0_5", order: 73, premiumOnly: true, stem: "He outright denied saying or doing things that you clearly remember." },
  { id: "gl_r2", module: "gaslighting", subscale: "reality_distortion", responseType: "frequency_0_5", order: 74, premiumOnly: true, stem: "He told you that events happened differently than you experienced them." },
  { id: "gl_r3", module: "gaslighting", subscale: "reality_distortion", responseType: "frequency_0_5", order: 75, premiumOnly: true, stem: "He accused you of making things up or imagining things." },
  { id: "gl_r4", module: "gaslighting", subscale: "reality_distortion", responseType: "frequency_0_5", order: 76, premiumOnly: true, stem: "He completely rewrote the history of your arguments to make himself the victim." },

  // Subscale: self_doubt_induction (4 items)
  { id: "gl_s1", module: "gaslighting", subscale: "self_doubt_induction", responseType: "frequency_0_5", order: 77, premiumOnly: true, stem: "He made you question your own sanity or memory." },
  { id: "gl_s2", module: "gaslighting", subscale: "self_doubt_induction", responseType: "frequency_0_5", order: 78, premiumOnly: true, stem: "He convinced you that your feelings or reactions were irrational." },
  { id: "gl_s3", module: "gaslighting", subscale: "self_doubt_induction", responseType: "frequency_0_5", order: 79, premiumOnly: true, stem: "He used your insecurities or past traumas to prove you are unstable." },
  { id: "gl_s4", module: "gaslighting", subscale: "self_doubt_induction", responseType: "frequency_0_5", order: 80, premiumOnly: true, stem: "He made you feel like you couldn't trust your own judgment." },

  // Subscale: confusion_dependency (3 items)
  { id: "gl_c1", module: "gaslighting", subscale: "confusion_dependency", responseType: "frequency_0_5", order: 81, premiumOnly: true, stem: "He caused you to feel constantly confused about what is real in the relationship." },
  { id: "gl_c2", module: "gaslighting", subscale: "confusion_dependency", responseType: "frequency_0_5", order: 82, premiumOnly: true, stem: "He presented himself as the only one who perceives reality correctly." },
  { id: "gl_c3", module: "gaslighting", subscale: "confusion_dependency", responseType: "frequency_0_5", order: 83, premiumOnly: true, stem: "He made you rely on him to tell you what happened or what you should think." },

  // ==========================================
  // MODULE 5: IMPACT (Premium Plus) - 10 Items
  // ==========================================
  // Subscale: fear_distress (4 items)
  { id: "im_f1", module: "impact", subscale: "fear_distress", responseType: "impact_0_4", order: 84, premiumOnly: true, stem: "I feel physically tense or anxious when I know I'm going to see him." },
  { id: "im_f2", module: "impact", subscale: "fear_distress", responseType: "impact_0_4", order: 85, premiumOnly: true, stem: "I feel a sense of dread when my phone rings or I receive a text from him." },
  { id: "im_f3", module: "impact", subscale: "fear_distress", responseType: "impact_0_4", order: 86, premiumOnly: true, stem: "I frequently feel like I am 'walking on eggshells'." },
  { id: "im_f4", module: "impact", subscale: "fear_distress", responseType: "impact_0_4", order: 87, premiumOnly: true, stem: "I am afraid of what he might do if I decide to end the relationship." },

  // Subscale: hypervigilance (3 items)
  { id: "im_h1", module: "impact", subscale: "hypervigilance", responseType: "impact_0_4", order: 88, premiumOnly: true, stem: "I constantly scan his mood and behavior to anticipate his reactions." },
  { id: "im_h2", module: "impact", subscale: "hypervigilance", responseType: "impact_0_4", order: 89, premiumOnly: true, stem: "I overthink everything I say or do to avoid setting him off." },
  { id: "im_h3", module: "impact", subscale: "hypervigilance", responseType: "impact_0_4", order: 90, premiumOnly: true, stem: "I feel jumpy, easily startled, or unable to fully relax in my own home." },

  // Subscale: emotional_exhaustion (3 items)
  { id: "im_e1", module: "impact", subscale: "emotional_exhaustion", responseType: "impact_0_4", order: 91, premiumOnly: true, stem: "I feel completely drained of energy from managing this relationship." },
  { id: "im_e2", module: "impact", subscale: "emotional_exhaustion", responseType: "impact_0_4", order: 92, premiumOnly: true, stem: "I feel like I have lost touch with who I used to be before I met him." },
  { id: "im_e3", module: "impact", subscale: "emotional_exhaustion", responseType: "impact_0_4", order: 93, premiumOnly: true, stem: "I feel trapped, hopeless, or numb about the future." }
];
