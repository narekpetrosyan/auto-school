-- CreateTable
CREATE TABLE "OptionsOnQuestions" (
    "optionId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,

    PRIMARY KEY ("optionId", "questionId"),
    CONSTRAINT "OptionsOnQuestions_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Options" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OptionsOnQuestions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_OptionToQuestion" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_OptionToQuestion_A_fkey" FOREIGN KEY ("A") REFERENCES "Options" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_OptionToQuestion_B_fkey" FOREIGN KEY ("B") REFERENCES "Questions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_OptionToQuestion_AB_unique" ON "_OptionToQuestion"("A", "B");

-- CreateIndex
CREATE INDEX "_OptionToQuestion_B_index" ON "_OptionToQuestion"("B");
