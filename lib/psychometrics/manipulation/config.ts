export const MODULE_CONFIG = {
  par: {
    title: "Psychological Abuse Core",
    recallWindow: "last_12_months",
    itemCount: 20,
    subscales: {
      severe_psych_abuse: { items: 7, scoreRange: [0, 35] },
      coercive_emotional: { items: 5, scoreRange: [0, 25] },
      restrictive_isolating: { items: 5, scoreRange: [0, 25] },
      financial_abuse: { items: 3, scoreRange: [0, 15] }
    },
    scoring: "validated_cutoff"
  },

  coercive_control: {
    title: "Coercive Control Deep Dive",
    recallWindow: "past_3_months",
    itemCount: 28,
    subscales: {
      demands: { items: 8 },
      threats: { items: 8 },
      surveillance: { items: 6 },
      response_to_demands: { items: 6 }
    },
    scoring: "weighted_internal"
  },

  power_tactics: {
    title: "Power Tactics Profile",
    recallWindow: "last_6_months",
    itemCount: 24,
    subscales: {
      intimidation: { items: 6 },
      blame_minimization: { items: 6 },
      isolation_dependency: { items: 6 },
      economic_control: { items: 6 }
    },
    scoring: "weighted_internal"
  },

  gaslighting: {
    title: "Gaslighting Screen",
    recallWindow: "last_6_months",
    itemCount: 11,
    subscales: {
      reality_distortion: { items: 4 },
      self_doubt_induction: { items: 4 },
      confusion_dependency: { items: 3 }
    },
    scoring: "weighted_internal"
  },

  impact: {
    title: "Impact and Distress",
    recallWindow: "last_2_weeks",
    itemCount: 10,
    subscales: {
      fear_distress: { items: 4 },
      hypervigilance: { items: 3 },
      emotional_exhaustion: { items: 3 }
    },
    scoring: "weighted_internal"
  }
} as const;
