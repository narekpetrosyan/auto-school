-- CreateTable
CREATE TABLE "Groups" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Questions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "image" TEXT,
    "groupId" TEXT,
    "rightOptionId" TEXT,
    CONSTRAINT "Questions_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Questions_rightOptionId_fkey" FOREIGN KEY ("rightOptionId") REFERENCES "Options" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Questions" ("id", "image", "rightOptionId", "text") SELECT "id", "image", "rightOptionId", "text" FROM "Questions";
DROP TABLE "Questions";
ALTER TABLE "new_Questions" RENAME TO "Questions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
