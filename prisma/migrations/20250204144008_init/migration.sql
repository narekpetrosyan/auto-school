/*
  Warnings:

  - You are about to drop the `question` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "question";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Questions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "rightAnswer" TEXT NOT NULL,
    CONSTRAINT "Questions_rightAnswer_fkey" FOREIGN KEY ("rightAnswer") REFERENCES "option" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "option" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Questions_text_key" ON "Questions"("text");

-- CreateIndex
CREATE UNIQUE INDEX "option_text_key" ON "option"("text");
