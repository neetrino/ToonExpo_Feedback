import { describe, expect, it } from 'vitest';
import {
  B2B_OUTCOME_KEYS,
  GOAL_KEYS,
  MOTIVATION_KEYS,
  NO_VISIT_REASON_KEYS,
  PROBLEM_KEYS,
  PROPERTY_OUTCOME_KEYS,
  PROPERTY_RELEVANCE_KEYS,
  VOL2_PLAN_KEYS,
  WANT_KEYS,
  WOULD_INCREASE_KEYS,
} from '@/lib/feedback-options';
import {
  sheetB2bOutcomeLabel,
  sheetGoalLabels,
  sheetLocaleLabel,
  sheetMissedVol2PlanLabel,
  sheetMotivationLabels,
  sheetNoVisitReasonLabel,
  sheetProblemLabels,
  sheetPropertyOutcomeLabel,
  sheetPropertyRelevanceLabel,
  sheetVisitedVol2PlanLabel,
  sheetWantLabels,
  sheetWouldIncreaseLabels,
} from '@/lib/sheet-labels';

describe('sheet labels', () => {
  it('uses Armenian locale names', () => {
    expect(sheetLocaleLabel('hy')).toBe('Հայերեն');
    expect(sheetLocaleLabel('ru')).toBe('Ռուսերեն');
  });

  it('covers every option key with a human Armenian label, not the code', () => {
    for (const key of PROBLEM_KEYS) {
      expect(sheetProblemLabels([key])).not.toBe(key);
    }
    for (const key of GOAL_KEYS) {
      expect(sheetGoalLabels([key])).not.toBe(key);
    }
    for (const key of PROPERTY_OUTCOME_KEYS) {
      expect(sheetPropertyOutcomeLabel(key)).not.toBe(key);
    }
    for (const key of B2B_OUTCOME_KEYS) {
      expect(sheetB2bOutcomeLabel(key)).not.toBe(key);
    }
    for (const key of VOL2_PLAN_KEYS) {
      expect(sheetVisitedVol2PlanLabel(key)).not.toBe(key);
      expect(sheetMissedVol2PlanLabel(key)).not.toBe(key);
    }
    for (const key of WANT_KEYS) {
      expect(sheetWantLabels([key])).not.toBe(key);
    }
    for (const key of NO_VISIT_REASON_KEYS) {
      expect(sheetNoVisitReasonLabel(key)).not.toBe(key);
    }
    for (const key of WOULD_INCREASE_KEYS) {
      expect(sheetWouldIncreaseLabels([key])).not.toBe(key);
    }
    for (const key of PROPERTY_RELEVANCE_KEYS) {
      expect(sheetPropertyRelevanceLabel(key)).not.toBe(key);
    }
    for (const key of MOTIVATION_KEYS) {
      expect(sheetMotivationLabels([key])).not.toBe(key);
    }
  });
});
