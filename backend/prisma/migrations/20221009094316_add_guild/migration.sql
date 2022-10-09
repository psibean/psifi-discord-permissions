-- CreateTable
CREATE TABLE "Guild" (
    "id" VARCHAR(128) NOT NULL,
    "ownerOnly" BOOLEAN NOT NULL DEFAULT true,
    "role" VARCHAR(128),

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);
