-- CreateTable
CREATE TABLE "event" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "petsAllowed" BOOLEAN NOT NULL,
    "organizer" TEXT NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);
