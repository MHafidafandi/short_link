-- CreateTable
CREATE TABLE "shortlink" (
    "id" SERIAL NOT NULL,
    "encode_url" TEXT NOT NULL,
    "long_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shortlink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shortlink_encode_url_key" ON "shortlink"("encode_url");
