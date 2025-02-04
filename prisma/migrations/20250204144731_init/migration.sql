/*
  Warnings:

  - You are about to drop the column `rightAnswer` on the `Questions` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Questions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "rightOptionId" TEXT,
    CONSTRAINT "Questions_rightOptionId_fkey" FOREIGN KEY ("rightOptionId") REFERENCES "Options" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Questions" ("id", "text") SELECT "id", "text" FROM "Questions";
DROP TABLE "Questions";
ALTER TABLE "new_Questions" RENAME TO "Questions";
CREATE UNIQUE INDEX "Questions_text_key" ON "Questions"("text");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
