-- CreateTable
CREATE TABLE "Asha" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imageUrl" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "emailAddress" TEXT NOT NULL,
    "credits" INTEGER NOT NULL DEFAULT 2000,

    CONSTRAINT "Asha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imageUrl" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "patient" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Asha_emailAddress_key" ON "Asha"("emailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_patient_fkey" FOREIGN KEY ("patient") REFERENCES "Asha"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
