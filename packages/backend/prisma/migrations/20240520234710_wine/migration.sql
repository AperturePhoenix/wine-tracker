-- CreateTable
CREATE TABLE "Wine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "year" INTEGER,
    "type" TEXT,
    "alcoholContent" DOUBLE PRECISION,
    "region" TEXT,
    "country" TEXT,
    "description" TEXT,
    "image" TEXT,

    CONSTRAINT "Wine_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wine_name_key" ON "Wine"("name");
