-- Contacts were added by a misread decision. Personal data is not collected.

DROP INDEX IF EXISTS "FeedbackSubmission_emailNormalized_idx";
DROP INDEX IF EXISTS "FeedbackSubmission_phoneNormalized_idx";

ALTER TABLE "FeedbackSubmission"
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "email",
DROP COLUMN "emailNormalized",
DROP COLUMN "phone",
DROP COLUMN "phoneNormalized";
