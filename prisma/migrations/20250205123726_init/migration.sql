-- CreateTable
CREATE TABLE "Questions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "image" TEXT,
    "rightOptionId" TEXT,
    CONSTRAINT "Questions_rightOptionId_fkey" FOREIGN KEY ("rightOptionId") REFERENCES "Options" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Options" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "OptionsOnQuestions" (
    "optionId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,

    PRIMARY KEY ("optionId", "questionId"),
    CONSTRAINT "OptionsOnQuestions_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Options" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OptionsOnQuestions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER'
);

-- CreateTable
CREATE TABLE "Sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_OptionToQuestion" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_OptionToQuestion_A_fkey" FOREIGN KEY ("A") REFERENCES "Options" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_OptionToQuestion_B_fkey" FOREIGN KEY ("B") REFERENCES "Questions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Options_text_key" ON "Options"("text");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Sessions_sessionToken_key" ON "Sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "_OptionToQuestion_AB_unique" ON "_OptionToQuestion"("A", "B");

-- CreateIndex
CREATE INDEX "_OptionToQuestion_B_index" ON "_OptionToQuestion"("B");
