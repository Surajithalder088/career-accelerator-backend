/*
  Warnings:

  - Added the required column `updatedAt` to the `Applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flags` to the `JobPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `JobPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumeUrl` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Applications" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "jobId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Applications_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "JobPost" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Applications" ("id", "jobId", "status", "userId") SELECT "id", "jobId", "status", "userId" FROM "Applications";
DROP TABLE "Applications";
ALTER TABLE "new_Applications" RENAME TO "Applications";
CREATE TABLE "new_JobPost" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "flags" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "JobPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_JobPost" ("address", "company", "description", "experience", "id", "salary", "title", "userId") SELECT "address", "company", "description", "experience", "id", "salary", "title", "userId" FROM "JobPost";
DROP TABLE "JobPost";
ALTER TABLE "new_JobPost" RENAME TO "JobPost";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "isHR" BOOLEAN NOT NULL,
    "resumeUrl" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "isValid" BOOLEAN NOT NULL,
    "otp" INTEGER NOT NULL
);
INSERT INTO "new_User" ("address", "company", "email", "experience", "id", "isHR", "isValid", "name", "otp", "password") SELECT "address", "company", "email", "experience", "id", "isHR", "isValid", "name", "otp", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
