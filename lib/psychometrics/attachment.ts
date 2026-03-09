import { ScaleDefinition } from "./scoring";

// 1. ECR-RS (5 Domains, 9 items each)
export const ecrDomains = ["general", "romantic", "mother", "father", "work"] as const;
export type EcrDomain = typeof ecrDomains[number];

export const ecrScales: Record<EcrDomain, ScaleDefinition> = ecrDomains.reduce((acc, domain) => {
  acc[domain] = {
    id: `ecr_${domain}`,
    items: Array.from({ length: 9 }, (_, i) => `ecr_${domain}_${i + 1}`),
    min: 1, max: 7,
    reverse: [1, 2, 3, 4].map(i => `ecr_${domain}_${i}`), // Standard ECR-RS reverse scoring
    subscales: {
      avoidance: [1, 2, 3, 4, 5, 6].map(i => `ecr_${domain}_${i}`),
      anxiety: [7, 8, 9].map(i => `ecr_${domain}_${i}`)
    }
  };
  return acc;
}, {} as Record<EcrDomain, ScaleDefinition>);

// 2. Rosenberg Self-Esteem
export const rosenbergScale: ScaleDefinition = {
  id: "rosenberg",
  items: Array.from({ length: 10 }, (_, i) => `rs_${i + 1}`),
  min: 1, max: 4,
  reverse: ["rs_2", "rs_5", "rs_6", "rs_8", "rs_9"],
  subscales: {
    selfLiking: ["rs_1", "rs_2", "rs_6", "rs_8", "rs_10"],
    selfCompetence: ["rs_3", "rs_4", "rs_5", "rs_7", "rs_9"]
  }
};

// 3. DERS-16 (Emotion Regulation)
export const dersScale: ScaleDefinition = {
  id: "ders_16",
  items: Array.from({ length: 16 }, (_, i) => `ders_${i + 1}`),
  min: 1, max: 5,
  subscales: {
    nonacceptance: ["ders_1", "ders_2", "ders_3", "ders_4"],
    goals: ["ders_5", "ders_6", "ders_7"],
    impulse: ["ders_8", "ders_9", "ders_10"],
    strategies: ["ders_11", "ders_12", "ders_13", "ders_14"],
    clarity: ["ders_15", "ders_16"]
  }
};

// 4. Love Styles (Hendrick)
export const loveStyleScale: ScaleDefinition = {
  id: "love_styles",
  items: [
    "ls_eros_1", "ls_eros_2", "ls_eros_3",
    "ls_ludus_1", "ls_ludus_2", "ls_ludus_3",
    "ls_storge_1", "ls_storge_2", "ls_storge_3",
    "ls_pragma_1", "ls_pragma_2", "ls_pragma_3",
    "ls_mania_1", "ls_mania_2", "ls_mania_3",
    "ls_agape_1", "ls_agape_2", "ls_agape_3"
  ],
  min: 1, max: 5,
  subscales: {
    eros: ["ls_eros_1", "ls_eros_2", "ls_eros_3"],
    ludus: ["ls_ludus_1", "ls_ludus_2", "ls_ludus_3"],
    storge: ["ls_storge_1", "ls_storge_2", "ls_storge_3"],
    pragma: ["ls_pragma_1", "ls_pragma_2", "ls_pragma_3"],
    mania: ["ls_mania_1", "ls_mania_2", "ls_mania_3"],
    agape: ["ls_agape_1", "ls_agape_2", "ls_agape_3"]
  }
};

// 5. CRQ (Central Relationship Patterns)
export const crqScale: ScaleDefinition = {
  id: "crq",
  items: ["crq_1", "crq_2", "crq_3", "crq_4", "crq_5", "crq_6", "crq_7", "crq_8"],
  min: 1, max: 5,
  subscales: {
    closeness_desire: ["crq_1", "crq_2"],
    rejection_expectation: ["crq_3", "crq_4"],
    control_expectation: ["crq_5", "crq_6"],
    withdrawal: ["crq_7", "crq_8"]
  }
};

// 6. YSQ-L3 (Early Maladaptive Schemas)
export const ysqScale: ScaleDefinition = {
  id: "ysq",
  items: [
    "yqs_ab_1", "yqs_ab_2", "yqs_ab_3",
    "yqs_mi_1", "yqs_mi_2", "yqs_mi_3",
    "yqs_ed_1", "yqs_ed_2", "yqs_ed_3",
    "yqs_de_1", "yqs_de_2", "yqs_de_3",
    "yqs_fa_1", "yqs_fa_2", "yqs_fa_3",
    "yqs_su_1", "yqs_su_2", "yqs_su_3"
  ],
  min: 1, max: 6,
  subscales: {
    abandonment: ["yqs_ab_1", "yqs_ab_2", "yqs_ab_3"],
    mistrust: ["yqs_mi_1", "yqs_mi_2", "yqs_mi_3"],
    emotional_deprivation: ["yqs_ed_1", "yqs_ed_2", "yqs_ed_3"],
    defectiveness: ["yqs_de_1", "yqs_de_2", "yqs_de_3"],
    failure: ["yqs_fa_1", "yqs_fa_2", "yqs_fa_3"],
    subjugation: ["yqs_su_1", "yqs_su_2", "yqs_su_3"]
  }
};

// 7. MDS (Maladaptive Daydreaming)
export const mdsScale: ScaleDefinition = {
  id: "mds",
  items: ["mds_1", "mds_2", "mds_3", "mds_4", "mds_5", "mds_6"],
  min: 1, max: 5
};

// 8. Parenting Style
export const parentingScale: ScaleDefinition = {
  id: "parenting",
  items: [
    "par_auth_1", "par_auth_2", "par_auth_3",
    "par_arit_1", "par_arit_2", "par_arit_3",
    "par_perm_1", "par_perm_2", "par_perm_3"
  ],
  min: 1, max: 5,
  subscales: {
    authoritative: ["par_auth_1", "par_auth_2", "par_auth_3"],
    authoritarian: ["par_arit_1", "par_arit_2", "par_arit_3"],
    permissive: ["par_perm_1", "par_perm_2", "par_perm_3"]
  }
};
