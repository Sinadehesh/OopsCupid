import { ScaleDefinition } from "./scoring";

// ECR-RS (Experiences in Close Relationships – Relationship Structures)
export const ecrScale: ScaleDefinition = {
  id: "ecr-rs",
  items: ["ecr_1", "ecr_2", "ecr_3", "ecr_4", "ecr_5", "ecr_6", "ecr_7", "ecr_8", "ecr_9"],
  min: 1, max: 7,
  reverse: ["ecr_1", "ecr_2", "ecr_3", "ecr_4"],
  subscales: {
    avoidance: ["ecr_1", "ecr_2", "ecr_3", "ecr_4", "ecr_5", "ecr_6"],
    anxiety: ["ecr_7", "ecr_8", "ecr_9"]
  }
};

// Rosenberg Self-Esteem Scale
export const rosenbergScale: ScaleDefinition = {
  id: "rosenberg",
  items: ["rs_1", "rs_2", "rs_3", "rs_4", "rs_5", "rs_6", "rs_7", "rs_8", "rs_9", "rs_10"],
  min: 1, max: 4,
  reverse: ["rs_2", "rs_5", "rs_6", "rs_8", "rs_9"]
};

// DERS-16 (Emotion Regulation)
export const dersScale: ScaleDefinition = {
  id: "ders-16",
  items: Array.from({ length: 16 }, (_, i) => `ders_${i + 1}`),
  min: 1, max: 5
};

// Hendrick's Love Styles
export const loveStyleScale: ScaleDefinition = {
  id: "love-styles",
  items: [
    "ls_eros_1", "ls_eros_2", "ls_eros_3", "ls_ludus_1", "ls_ludus_2", "ls_ludus_3",
    "ls_storge_1", "ls_storge_2", "ls_storge_3", "ls_pragma_1", "ls_pragma_2", "ls_pragma_3",
    "ls_mania_1", "ls_mania_2", "ls_mania_3", "ls_agape_1", "ls_agape_2", "ls_agape_3"
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

// YSQ-L3 (Schemas)
export const ysqScale: ScaleDefinition = {
  id: "ysq",
  items: [
    "yqs_ab_1", "yqs_ab_2", "yqs_ab_3", "yqs_mi_1", "yqs_mi_2", "yqs_mi_3",
    "yqs_ed_1", "yqs_ed_2", "yqs_ed_3", "yqs_de_1", "yqs_de_2", "yqs_de_3",
    "yqs_fa_1", "yqs_fa_2", "yqs_fa_3", "yqs_su_1", "yqs_su_2", "yqs_su_3"
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

// CRQ (Relationship Blueprint)
export const crqScale: ScaleDefinition = {
  id: "crq",
  items: ["crq_1", "crq_2", "crq_3", "crq_4", "crq_5", "crq_6", "crq_7", "crq_8"],
  min: 1, max: 5,
  subscales: {
    rejection_expectation: ["crq_3", "crq_4"],
    withdrawal: ["crq_7", "crq_8"]
  }
};

// MDS (Maladaptive Daydreaming)
export const mdsScale: ScaleDefinition = {
  id: "mds",
  items: ["mds_1", "mds_2", "mds_3", "mds_4", "mds_5", "mds_6"],
  min: 1, max: 5
};

// Parenting Style
export const parentingScale: ScaleDefinition = {
  id: "parenting",
  items: ["par_auth_1", "par_auth_2", "par_auth_3", "par_arit_1", "par_arit_2", "par_arit_3", "par_perm_1", "par_perm_2", "par_perm_3"],
  min: 1, max: 5,
  subscales: {
    authoritative: ["par_auth_1", "par_auth_2", "par_auth_3"],
    authoritarian: ["par_arit_1", "par_arit_2", "par_arit_3"],
    permissive: ["par_perm_1", "par_perm_2", "par_perm_3"]
  }
};

// Custom Likert for Attraction Patterns
export const attractionLikertMapping = {
  "Not at all me": 1,
  "Slightly me": 2,
  "Neutral": 3,
  "Very me": 4,
  "OMG this is so me": 5
};

export const attractionScale: ScaleDefinition = {
  id: "attraction",
  items: Array.from({ length: 24 }, (_, i) => String(i + 1)), // items "1" to "24"
  min: 1, max: 5,
  valueMapping: attractionLikertMapping,
  subscales: {
    Narcissistic: ["1", "7", "13", "19"],
    Depressive: ["2", "8", "14", "20"],
    Anxious: ["3", "9", "15", "21"],
    Avoidant: ["4", "10", "16", "22"],
    Borderline: ["5", "11", "17", "23"],
    Secure: ["6", "12", "18", "24"]
  }
};
