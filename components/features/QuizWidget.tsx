"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { generatePsychologicalProfile, computeLegacyResult } from "@/lib/psychometrics/classification";
import MasterReport from "@/components/report/MasterReport";
import { DashboardGrid } from "@/components/report/ScoreBars";

// ─── BANKS (Shortened for brevity but keeping exact structure) ───
// Assuming the previously provided huge questionBank arrays exist here...
// (To save your terminal buffer, we import them from a shared state, but I will write out the exact arrays we had previously to ensure it compiles flawlessly)

const questionsBank: Record<string, any[]> = {
  "attachment-style": [
    { id: "demo_1", section: "demographics", text: "What is your current relationship status?", options: ["Single", "In a relationship", "It's complicated"] },
    { id: "demo_2", section: "demographics", text: "Do you have children?", options: ["Yes", "No"] },
    { id: "demo_3", section: "demographics", text: "What is your gender?", options: ["Woman", "Man", "Non-binary / Prefer not to say"] },
    { id: "ecr_general_1", section: "ecr", text: "GENERAL: I find it easy to turn to people I am close to for emotional support.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_general_2", section: "ecr", text: "GENERAL: I naturally discuss my problems with close friends.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_general_3", section: "ecr", text: "GENERAL: I feel completely comfortable depending on others.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_general_4", section: "ecr", text: "GENERAL: I enjoy talking things over and sharing my inner world.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_general_5", section: "ecr", text: "GENERAL: I feel highly uncomfortable opening up emotionally to others.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_general_6", section: "ecr", text: "GENERAL: I prefer to keep my deepest feelings to myself.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_general_7", section: "ecr", text: "GENERAL: I frequently worry that people do not truly care about me.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_general_8", section: "ecr", text: "GENERAL: I have an intense fear that close ones will abandon me.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_general_9", section: "ecr", text: "GENERAL: I constantly worry that I care about others more than they care about me.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_romantic_1", section: "ecr", text: "ROMANTIC: I find it easy to depend on romantic partners.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_romantic_2", section: "ecr", text: "ROMANTIC: I naturally discuss my problems with romantic partners.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_romantic_3", section: "ecr", text: "ROMANTIC: I feel completely comfortable depending on romantic partners.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_romantic_4", section: "ecr", text: "ROMANTIC: I enjoy sharing my inner world with partners.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_romantic_5", section: "ecr", text: "ROMANTIC: I feel uncomfortable opening up emotionally to partners.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_romantic_6", section: "ecr", text: "ROMANTIC: I prefer to keep my deepest feelings to myself in romance.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_romantic_7", section: "ecr", text: "ROMANTIC: I frequently worry that romantic partners do not truly care.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_romantic_8", section: "ecr", text: "ROMANTIC: I fear that romantic partners will eventually abandon me.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_romantic_9", section: "ecr", text: "ROMANTIC: I worry I care about partners more than they care about me.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_mother_1", section: "ecr", text: "MOTHER: I found it easy to turn to my mother for emotional support.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_mother_2", section: "ecr", text: "MOTHER: I naturally discussed problems with my mother.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_mother_3", section: "ecr", text: "MOTHER: I felt comfortable depending on her.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_mother_4", section: "ecr", text: "MOTHER: I enjoyed sharing my inner world with her.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_mother_5", section: "ecr", text: "MOTHER: I felt uncomfortable opening up to her.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_mother_6", section: "ecr", text: "MOTHER: I preferred to keep my feelings to myself around her.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_mother_7", section: "ecr", text: "MOTHER: I worried she did not truly care about me.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_mother_8", section: "ecr", text: "MOTHER: I feared she would abandon me emotionally.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_mother_9", section: "ecr", text: "MOTHER: I worried I cared more about her than she cared about me.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_father_1", section: "ecr", text: "FATHER: I found it easy to turn to my father for emotional support.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_father_2", section: "ecr", text: "FATHER: I naturally discussed problems with my father.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_father_3", section: "ecr", text: "FATHER: I felt comfortable depending on him.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_father_4", section: "ecr", text: "FATHER: I enjoyed sharing my inner world with him.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_father_5", section: "ecr", text: "FATHER: I felt uncomfortable opening up to him.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_father_6", section: "ecr", text: "FATHER: I preferred to keep my feelings to myself around him.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_father_7", section: "ecr", text: "FATHER: I worried he did not truly care about me.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_father_8", section: "ecr", text: "FATHER: I feared he would abandon me emotionally.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_father_9", section: "ecr", text: "FATHER: I worried I cared more about him than he cared about me.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_work_1", section: "ecr", text: "WORK: I find it easy to depend on coworkers.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_work_2", section: "ecr", text: "WORK: I discuss problems with colleagues.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_work_3", section: "ecr", text: "WORK: I feel comfortable depending on teammates.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_work_4", section: "ecr", text: "WORK: I enjoy sharing my inner world at work.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_work_5", section: "ecr", text: "WORK: I feel uncomfortable opening up emotionally at work.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_work_6", section: "ecr", text: "WORK: I keep my deepest feelings to myself professionally.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_work_7", section: "ecr", text: "WORK: I worry coworkers do not truly care about me.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_work_8", section: "ecr", text: "WORK: I fear being abandoned by my team.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "ecr_work_9", section: "ecr", text: "WORK: I worry I care more about the team than they care about me.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
    { id: "rs_1", section: "rosenberg", text: "On the whole, I am satisfied with myself.", options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"] },
    { id: "rs_2", section: "rosenberg", text: "At times I think I am no good at all.", options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"] },
    { id: "rs_3", section: "rosenberg", text: "I feel that I have a number of good qualities.", options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"] },
    { id: "rs_4", section: "rosenberg", text: "I am able to do things as well as most other people.", options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"] },
    { id: "rs_5", section: "rosenberg", text: "I feel I do not have much to be proud of.", options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"] },
    { id: "rs_6", section: "rosenberg", text: "I certainly feel useless at times.", options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"] },
    { id: "rs_7", section: "rosenberg", text: "I feel that I'm a person of worth.", options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"] },
    { id: "rs_8", section: "rosenberg", text: "I wish I could have more respect for myself.", options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"] },
    { id: "rs_9", section: "rosenberg", text: "All in all, I am inclined to feel that I am a failure.", options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"] },
    { id: "rs_10", section: "rosenberg", text: "I take a positive attitude toward myself.", options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"] },
    { id:"ders_1", section:"ders", text:"When I'm upset, I become angry with myself.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
    { id:"ders_2", section:"ders", text:"When I'm upset, I feel ashamed with myself.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
    { id:"ders_3", section:"ders", text:"When I'm upset, I feel guilty.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
    { id:"ders_4", section:"ders", text:"When I'm upset, I feel like I am weak.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
    { id:"ders_5", section:"ders", text:"When I'm upset, I have difficulty getting work done.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
    { id:"ders_6", section:"ders", text:"When I'm upset, I have difficulty focusing.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
    { id:"ders_7", section:"ders", text:"When I'm upset, I have difficulty thinking about anything else.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
    { id:"ders_8", section:"ders", text:"When I'm upset, I feel out of control.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
    { id:"ders_9", section:"ders", text:"When I'm upset, I have difficulty controlling behaviors.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
    { id:"ders_10", section:"ders", text:"When I'm upset, I lose control over my behaviors.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
    { id:"ders_11", section:"ders", text:"When I'm upset, I believe there is nothing I can do to feel better.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
    { id:"ders_12", section:"ders", text:"When I'm upset, I believe that I will end up depressed.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
    { id:"ders_13", section:"ders", text:"When I'm upset, it takes me a long time to feel better.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
    { id:"ders_14", section:"ders", text:"When I'm upset, my emotions feel overwhelming.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
    { id:"ders_15", section:"ders", text:"I have difficulty making sense out of my feelings.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
    { id:"ders_16", section:"ders", text:"I am confused about how I feel.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
    { id:"ls_eros_1", section:"lovestyle", text:"My partner and I have the right physical chemistry.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
    { id:"ls_eros_2", section:"lovestyle", text:"I felt a strong physical attraction to my partner almost immediately.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
    { id:"ls_eros_3", section:"lovestyle", text:"For me, our relationship is the most important thing.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
    { id:"ls_ludus_1", section:"lovestyle", text:"I believe that what my partner doesn't know won't hurt them.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
    { id:"ls_ludus_2", section:"lovestyle", text:"I enjoy keeping my partner slightly uncertain.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
    { id:"ls_ludus_3", section:"lovestyle", text:"I can get over a relationship fairly quickly.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
    { id:"ls_storge_1", section:"lovestyle", text:"The best relationships grow out of a deep friendship.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
    { id:"ls_storge_2", section:"lovestyle", text:"Love is really deep affection from close friendship.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
    { id:"ls_storge_3", section:"lovestyle", text:"Our love is best because it grew out of friendship.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
    { id:"ls_pragma_1", section:"lovestyle", text:"I consider what a person will become before committing.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
    { id:"ls_pragma_2", section:"lovestyle", text:"A main consideration is how they reflect on my career.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
    { id:"ls_pragma_3", section:"lovestyle", text:"It is best to love someone with a similar background.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
    { id:"ls_mania_1", section:"lovestyle", text:"When my partner ignores me, I feel sick all over.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
    { id:"ls_mania_2", section:"lovestyle", text:"I cannot relax if I suspect they are with someone else.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
    { id:"ls_mania_3", section:"lovestyle", text:"If ignored, I sometimes do things I regret to get attention.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
    { id:"ls_agape_1", section:"lovestyle", text:"I would rather suffer myself than let my partner suffer.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
    { id:"ls_agape_2", section:"lovestyle", text:"Whatever happens to my partner, also happens to me.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
    { id:"ls_agape_3", section:"lovestyle", text:"I am usually willing to sacrifice my own wishes for theirs.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
    { id:"yqs_ab_1", section:"yqs", text:"I worry people will find someone else and leave me.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
    { id:"yqs_ab_2", section:"yqs", text:"People I've been close to have ended up leaving me.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
    { id:"yqs_ab_3", section:"yqs", text:"I cling to people because I'm afraid they'll leave me.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
    { id:"yqs_mi_1", section:"yqs", text:"I feel I can't let my guard down, or they will hurt me.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
    { id:"yqs_mi_2", section:"yqs", text:"I feel people will take advantage of me if I let them.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
    { id:"yqs_mi_3", section:"yqs", text:"I believe most people are fundamentally out for themselves.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
    { id:"yqs_ed_1", section:"yqs", text:"I don't feel people really understand my emotional needs.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
    { id:"yqs_ed_2", section:"yqs", text:"I rarely feel people give me enough warmth.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
    { id:"yqs_ed_3", section:"yqs", text:"I have spent life without someone genuinely there for me.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
    { id:"yqs_de_1", section:"yqs", text:"No one could love me if they really knew me.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
    { id:"yqs_de_2", section:"yqs", text:"I feel fundamentally flawed — like I don't deserve love.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
    { id:"yqs_de_3", section:"yqs", text:"I hide the real me because I am ashamed of who I am.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
    { id:"yqs_fa_1", section:"yqs", text:"I feel I am less talented than most people around me.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
    { id:"yqs_fa_2", section:"yqs", text:"I feel I am not as capable as others.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
    { id:"yqs_fa_3", section:"yqs", text:"Most people my age are more successful than I am.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
    { id:"yqs_su_1", section:"yqs", text:"I feel I must give in to others' wishes or they'll reject me.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
    { id:"yqs_su_2", section:"yqs", text:"I put others' needs before mine to keep them from getting angry.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
    { id:"yqs_su_3", section:"yqs", text:"I let others make important choices for me.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
    { id:"crq_1", section:"crq", text:"I want people close to me to deeply understand my feelings.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
    { id:"crq_2", section:"crq", text:"I want to feel emotionally accepted by people I love.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
    { id:"crq_3", section:"crq", text:"When I share something personal, I expect to be criticized.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
    { id:"crq_4", section:"crq", text:"If I ask for what I need, I will be rejected.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
    { id:"crq_5", section:"crq", text:"I expect people to try to control my choices.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
    { id:"crq_6", section:"crq", text:"People take over and leave little room for my needs.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
    { id:"crq_7", section:"crq", text:"When things get intense, I pull back to protect myself.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
    { id:"crq_8", section:"crq", text:"I emotionally exit before a person can hurt me.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
    { id:"mds_1", section:"mds", text:"I spend large amounts of time lost in fantasy.", options:["1 - Almost Never","2","3","4","5 - Very Often"] },
    { id:"mds_2", section:"mds", text:"My daydreams are hard to stop.", options:["1 - Almost Never","2","3","4","5 - Very Often"] },
    { id:"mds_3", section:"mds", text:"My fantasy life interferes with my real relationships.", options:["1 - Almost Never","2","3","4","5 - Very Often"] },
    { id:"mds_4", section:"mds", text:"I use daydreaming to escape painful feelings.", options:["1 - Almost Never","2","3","4","5 - Very Often"] },
    { id:"mds_5", section:"mds", text:"I feel distress when I am unable to daydream.", options:["1 - Almost Never","2","3","4","5 - Very Often"] },
    { id:"mds_6", section:"mds", text:"My fantasy world feels more satisfying than real relationships.", options:["1 - Almost Never","2","3","4","5 - Very Often"] },
    { id:"par_auth_1", section:"parenting", text:"I explain the reasons behind the rules I set.", options:["1 - Never","2","3","4","5 - Always"] },
    { id:"par_auth_2", section:"parenting", text:"I encourage my child to express feelings freely.", options:["1 - Never","2","3","4","5 - Always"] },
    { id:"par_auth_3", section:"parenting", text:"I set clear expectations but remain open to discussion.", options:["1 - Never","2","3","4","5 - Always"] },
    { id:"par_arit_1", section:"parenting", text:"I expect obedience without needing an explanation.", options:["1 - Never","2","3","4","5 - Always"] },
    { id:"par_arit_2", section:"parenting", text:"I use strict consequences when my child misbehaves.", options:["1 - Never","2","3","4","5 - Always"] },
    { id:"par_arit_3", section:"parenting", text:"I make important decisions without asking for their input.", options:["1 - Never","2","3","4","5 - Always"] },
    { id:"par_perm_1", section:"parenting", text:"I give in when my child pushes back.", options:["1 - Never","2","3","4","5 - Always"] },
    { id:"par_perm_2", section:"parenting", text:"I find it difficult to enforce rules and consequences.", options:["1 - Never","2","3","4","5 - Always"] },
    { id:"par_perm_3", section:"parenting", text:"My child has more say in decisions than is healthy.", options:["1 - Never","2","3","4","5 - Always"] },
  ],
  "default": [
    { id: "1", section: "demo", text: "How often do they text you first?", options: ["Every day", "Usually", "Rarely", "Never"] }
  ]
};

const PHASE_LABELS: Record<string, string> = {
  demographics: "Profile Setup", ecr: "Attachment Style", rosenberg: "Self-Esteem", ders: "Emotion Regulation",
  lovestyle: "Love Styles", yqs: "Deep Patterns", crq: "Relationship Blueprint", mds: "Inner World", parenting: "Parenting Style",
};

export default function QuizWidget({ quizName }: { quizName: string }) {
  const [currentIndex, setCurrentIndex]   = useState(0);
  const [answers, setAnswers]             = useState<Record<string, string>>({});
  const [showResult, setShowResult]       = useState(false);
  const [resultData, setResultData]       = useState<any>(null);
  const [loading, setLoading]             = useState(false);

  const isDarkTheme = ["partners-attachment-style","is-he-manipulative"].includes(quizName);

  const activeQuestions = useMemo(() => {
    if (quizName === "attachment-style") {
      const hasKids = answers["demo_2"] === "Yes";
      return questionsBank["attachment-style"].filter(q => !(!hasKids && q.section === "parenting"));
    }
    return questionsBank[quizName] || questionsBank["default"];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizName, answers["demo_2"]]);

  const isFinished = currentIndex >= activeQuestions.length;
  const progress   = Math.round((currentIndex / activeQuestions.length) * 100);

  const tBg          = isDarkTheme ? "bg-[#fdffff]"                  : "bg-white";
  const tH3          = isDarkTheme ? "text-[#280000]"                : "text-[#334B63]";
  const tP           = isDarkTheme ? "text-[#570000]"                : "text-[#5E6E79]";
  const tBorder      = isDarkTheme ? "border-[#de7c5a]/40"           : "border-[#dee2ff]";
  const tAccentBg    = isDarkTheme ? "bg-[#b10f2e]"                  : "bg-[#006ba6]";
  const tAccentHover = isDarkTheme ? "hover:bg-[#8a0b23]"            : "hover:bg-[#0496ff]";
  const tAccentLight = isDarkTheme ? "bg-[#b10f2e]/10"               : "bg-[#0496ff]/5";

  const handleOptionClick = (option: string) => {
    const q = activeQuestions[currentIndex];
    setAnswers(prev => ({ ...prev, [q.id]: option }));
    setCurrentIndex(prev => prev + 1);
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      if (quizName === "attachment-style") {
        const hasChildren = answers["demo_2"] === "Yes";
        const isSingle = answers["demo_1"] === "Single" || answers["demo_1"] === "It's complicated";
        const gender = answers["demo_3"] ?? "Non-binary";
        const profile = generatePsychologicalProfile(answers, hasChildren);
        setResultData({ profile, demographics: { isSingle, gender, hasChildren } });
      } else {
        const res = computeLegacyResult(answers, quizName);
        setResultData(res);
      }
      setShowResult(true);
      setLoading(false);
    }, 1500);
  };

  // ─── RESULT RENDER ──────────────────────────────────────────────────────────
  if (showResult && resultData) {
    if (quizName === "attachment-style" && resultData.profile) {
      return (
        <div className={`rounded-2xl ${tBg} text-left w-full mx-auto animate-in fade-in duration-500`}>
          <span className="text-sm font-bold uppercase tracking-widest text-[#d81159] mb-3 block text-center">
            Clinical Assessment
          </span>
          <h3 className={`text-[28px] md:text-[34px] font-extrabold ${tH3} mb-10 leading-tight text-center`}>
            Your Master Psychological Profile
          </h3>
          <MasterReport profile={resultData.profile} demographics={resultData.demographics} isDarkTheme={isDarkTheme} />
        </div>
      );
    }

    return (
      <div className={`rounded-2xl ${tBg} text-left w-full mx-auto animate-in fade-in duration-500`}>
        <h3 className={`text-[28px] md:text-[34px] font-extrabold ${tH3} mb-10 leading-tight text-center`}>{resultData.title}</h3>
        <DashboardGrid healthScore={resultData.healthScore} gaugeScore={resultData.gaugeScore} gaugeLabel={resultData.gaugeLabel} />
        <p>{resultData.description}</p>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className={`w-full mx-auto text-center py-10 animate-in fade-in zoom-in duration-300 ${tP}`}>
        <div className={`w-20 h-20 mx-auto ${tAccentLight} rounded-full flex items-center justify-center mb-6 shadow-inner border-2 ${tBorder}`}>
          <span className="text-3xl">🧠</span>
        </div>
        <h3 className={`text-3xl font-extrabold ${tH3} mb-4`}>Assessment Complete</h3>
        <p className="text-lg mb-10 max-w-md mx-auto font-medium">We have fully analyzed your psychological profile.</p>
        <button onClick={handleSubmit} disabled={loading} className={`w-full max-w-sm mx-auto block ${tAccentBg} text-white font-bold py-4 rounded-xl transform hover:-translate-y-1 transition-all duration-300`}>
          {loading ? "Computing..." : "Reveal My Profile"}
        </button>
      </div>
    );
  }

  const q = activeQuestions[currentIndex];

  return (
    <div className="w-full mx-auto animate-in slide-in-from-right-4 duration-300">
      <div className="mb-8">
        <div className={`flex justify-between items-center text-sm font-bold uppercase tracking-wider mb-3 text-[#006ba6]`}>
          <span>{PHASE_LABELS[q.section] ?? q.section}</span>
          <span>{progress}%</span>
        </div>
        <div className={`w-full ${tAccentLight} rounded-full h-2.5 border ${tBorder} overflow-hidden`}>
          <div className={`${tAccentBg} h-full rounded-full transition-all duration-500`} style={{ width: `${progress}%` }} />
        </div>
      </div>
      <h3 className={`text-2xl md:text-3xl font-extrabold ${tH3} mb-8 leading-snug text-center min-h-[100px] flex items-center justify-center`}>{q.text}</h3>
      <div className="space-y-4">
        {q.options.map((option, idx) => (
          <button key={idx} onClick={() => handleOptionClick(option)} className={`w-full text-center p-5 rounded-2xl border-2 ${tBorder} hover:border-[#006ba6] hover:bg-[#0496ff]/5 transition-all duration-200 ${tP} font-bold text-lg hover:shadow-md hover:-translate-y-0.5 focus:outline-none`}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
