/*
  Warnings:

  - You are about to drop the `option` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "option_text_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "option";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Options" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Questions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "rightAnswer" TEXT NOT NULL,
    CONSTRAINT "Questions_rightAnswer_fkey" FOREIGN KEY ("rightAnswer") REFERENCES "Options" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Questions" ("id", "rightAnswer", "text") SELECT "id", "rightAnswer", "text" FROM "Questions";
DROP TABLE "Questions";
ALTER TABLE "new_Questions" RENAME TO "Questions";
CREATE UNIQUE INDEX "Questions_text_key" ON "Questions"("text");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Options_text_key" ON "Options"("text");
