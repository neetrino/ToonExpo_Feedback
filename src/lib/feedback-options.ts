export const PROBLEM_KEYS = [
  'traffic',
  'parking',
  'pavilion_queues',
  'navigation',
  'entry_queues',
  'info_lack',
  'rest_areas',
  'cleanliness',
  'org_issues',
  'no_problems',
] as const;

export const GOAL_KEYS = [
  'apartment',
  'invest_am',
  'foreign_property',
  'banks',
  'commercial',
  'market_research',
  'b2b',
  'other',
] as const;

export const PROPERTY_GOAL_KEYS = [
  'apartment',
  'invest_am',
  'foreign_property',
  'commercial',
] as const;

export const PROPERTY_OUTCOME_KEYS = [
  'purchased',
  'in_deal',
  'considered',
  'not_purchased',
] as const;

export const B2B_OUTCOME_KEYS = ['completed', 'in_progress', 'contacts_only', 'no'] as const;

export const VOL2_PLAN_KEYS = ['yes', 'probably_yes', 'undecided', 'probably_no', 'no'] as const;

export const VOL2_PLAN_WITH_NOTE = ['undecided', 'probably_no', 'no'] as const;

export const WANT_KEYS = [
  'special_offers',
  'new_builds',
  'invest_offers',
  'foreign_projects',
  'bank_terms',
  'consultation',
  'b2b_opportunities',
  'better_org',
  'other',
] as const;

export const NO_VISIT_REASON_KEYS = [
  'no_time',
  'bad_schedule',
  'forgot',
  'other_plans',
  'transport',
  'not_enough_info',
  'no_interesting_offers',
  'property_not_relevant',
  'other',
] as const;

export const WOULD_INCREASE_KEYS = [
  'clear_offers',
  'discounts',
  'participant_list',
  'project_details',
  'personal_selection',
  'easier_access',
  'reminders',
  'personal_invite',
  'other',
] as const;

export const PROPERTY_RELEVANCE_KEYS = [
  'actively_looking',
  'next_3_months',
  'next_3_6_months',
  'interested_no_date',
  'not_relevant',
] as const;

export const MISSED_VOL2_WITH_NOTE = ['undecided', 'probably_no', 'no'] as const;

export const MOTIVATION_KEYS = [
  'expo_prices',
  'interesting_projects',
  'new_developers',
  'bank_terms',
  'invest_offers',
  'personal_consult',
  'info_before',
  'easy_transport',
  'other',
] as const;

export type ProblemKey = (typeof PROBLEM_KEYS)[number];
export type GoalKey = (typeof GOAL_KEYS)[number];
export type PropertyOutcomeKey = (typeof PROPERTY_OUTCOME_KEYS)[number];
export type B2bOutcomeKey = (typeof B2B_OUTCOME_KEYS)[number];
export type Vol2PlanKey = (typeof VOL2_PLAN_KEYS)[number];
export type WantKey = (typeof WANT_KEYS)[number];
export type NoVisitReasonKey = (typeof NO_VISIT_REASON_KEYS)[number];
export type WouldIncreaseKey = (typeof WOULD_INCREASE_KEYS)[number];
export type PropertyRelevanceKey = (typeof PROPERTY_RELEVANCE_KEYS)[number];
export type MotivationKey = (typeof MOTIVATION_KEYS)[number];

export function showsPropertyQuestion(goals: readonly string[]): boolean {
  return goals.some((goal) => (PROPERTY_GOAL_KEYS as readonly string[]).includes(goal));
}

export function showsB2bQuestion(goals: readonly string[]): boolean {
  return goals.includes('b2b');
}

export function isVol2PlanWithNote(
  value: string | undefined,
): value is (typeof VOL2_PLAN_WITH_NOTE)[number] {
  return !!value && (VOL2_PLAN_WITH_NOTE as readonly string[]).includes(value);
}
