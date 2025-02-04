-- CreateTable
CREATE TABLE "question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "question_text_key" ON "question"("text");
