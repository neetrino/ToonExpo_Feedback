import hy from '../../messages/hy.json';
import type {
  B2bOutcomeKey,
  GoalKey,
  MotivationKey,
  NoVisitReasonKey,
  ProblemKey,
  PropertyOutcomeKey,
  PropertyRelevanceKey,
  Vol2PlanKey,
  WantKey,
  WouldIncreaseKey,
} from '@/lib/feedback-options';
import { joinSheetList } from '@/lib/normalize';

/** Tab names the team sees in Google Sheets. */
export const SHEET_TAB_NAMES = {
  VISITED: 'Այցելել են',
  MISSED: 'Չեն այցելել',
} as const;

export const VISITED_SHEET_HEADERS = [
  'Ամսաթիվ',
  'Հարցման ID',
  'Լեզու',
  'Խնդիրներ / անհարմարություններ',
  'Կազմակերպչական խնդիր (մանրամասն)',
  'Այցի նպատակներ',
  'Այլ նպատակ',
  'Անշարժ գույքի արդյունք',
  'Անշարժ գույք (մանրամասն)',
  'B2B արդյունք',
  'B2B (մանրամասն)',
  'Սպասելիքների գնահատական (1–10)',
  'Ինչը բարելավել',
  'Խորհուրդ տալու գնահատական (1–10)',
  'Այց Vol. 2',
  'Ինչը կազդի որոշման վրա (Vol. 2)',
  'Ինչ կցանկանային տեսնել Vol. 2-ում',
  'Այլ ցանկություն',
] as const;

export const MISSED_SHEET_HEADERS = [
  'Ամսաթիվ',
  'Հարցման ID',
  'Լեզու',
  'Չայցելելու պատճառ',
  'Այլ պատճառ',
  'Ինչը կբարձրացներ այցի հավանականությունը',
  'Այլ առաջարկ',
  'Անշարժ գույքի ակտուալություն',
  'Այց Vol. 2',
  'Ինչը կազդի որոշման վրա (Vol. 2)',
  'Ինչը կմոտիվացնի այցելել Vol. 2',
  'Այլ մոտիվացիա',
] as const;

const LOCALE_LABELS: Record<string, string> = {
  hy: 'Հայերեն',
  ru: 'Ռուսերեն',
};

const PROBLEM_LABELS: Record<ProblemKey, string> = hy.visited.problems;
const GOAL_LABELS: Record<GoalKey, string> = hy.visited.goals;
const PROPERTY_OUTCOME_LABELS: Record<PropertyOutcomeKey, string> = hy.visited.propertyOutcome;
const B2B_OUTCOME_LABELS: Record<B2bOutcomeKey, string> = hy.visited.b2bOutcome;
const VISITED_VOL2_PLAN_LABELS: Record<Vol2PlanKey, string> = hy.visited.vol2Plan;
const WANT_LABELS: Record<WantKey, string> = hy.visited.wants;
const NO_VISIT_REASON_LABELS: Record<NoVisitReasonKey, string> = hy.missed.reasons;
const WOULD_INCREASE_LABELS: Record<WouldIncreaseKey, string> = hy.missed.wouldIncrease;
const PROPERTY_RELEVANCE_LABELS: Record<PropertyRelevanceKey, string> = hy.missed.relevance;
const MISSED_VOL2_PLAN_LABELS: Record<Vol2PlanKey, string> = hy.missed.vol2Plan;
const MOTIVATION_LABELS: Record<MotivationKey, string> = hy.missed.motivation;

export function sheetLocaleLabel(locale: string): string {
  return LOCALE_LABELS[locale] ?? locale;
}

export function sheetProblemLabels(keys: readonly string[]): string {
  return mapList(PROBLEM_LABELS, keys);
}

export function sheetGoalLabels(keys: readonly string[]): string {
  return mapList(GOAL_LABELS, keys);
}

export function sheetPropertyOutcomeLabel(key: string): string {
  return lookup(PROPERTY_OUTCOME_LABELS, key);
}

export function sheetB2bOutcomeLabel(key: string): string {
  return lookup(B2B_OUTCOME_LABELS, key);
}

export function sheetVisitedVol2PlanLabel(key: string): string {
  return lookup(VISITED_VOL2_PLAN_LABELS, key);
}

export function sheetWantLabels(keys: readonly string[]): string {
  return mapList(WANT_LABELS, keys);
}

export function sheetNoVisitReasonLabel(key: string): string {
  return lookup(NO_VISIT_REASON_LABELS, key);
}

export function sheetWouldIncreaseLabels(keys: readonly string[]): string {
  return mapList(WOULD_INCREASE_LABELS, keys);
}

export function sheetPropertyRelevanceLabel(key: string): string {
  return lookup(PROPERTY_RELEVANCE_LABELS, key);
}

export function sheetMissedVol2PlanLabel(key: string): string {
  return lookup(MISSED_VOL2_PLAN_LABELS, key);
}

export function sheetMotivationLabels(keys: readonly string[]): string {
  return mapList(MOTIVATION_LABELS, keys);
}

function lookup(labels: Record<string, string>, key: string): string {
  return labels[key] ?? key;
}

function mapList(labels: Record<string, string>, keys: readonly string[]): string {
  return joinSheetList(keys.map((key) => lookup(labels, key)));
}
