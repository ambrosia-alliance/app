-- CreateTable
CREATE TABLE "article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "abstract" TEXT,
    "authors" TEXT,
    "createdat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "source" TEXT,
    "sourceurl" TEXT NOT NULL,
    "contenturl" TEXT,
    "publisheddate" TIMESTAMP(6),
    "therapyid" INTEGER NOT NULL,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "journal" VARCHAR(300),
    "year" INTEGER,
    "doi" VARCHAR(200),

    CONSTRAINT "article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "therapy" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cost_summary" TEXT,
    "cost_currency" TEXT,
    "cost_amount" DECIMAL(12,2),
    "cost_citation_ids" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "therapy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "therapy_info" (
    "therapyid" INTEGER NOT NULL,
    "pros" TEXT,
    "cons" TEXT,
    "summary" TEXT,
    "image_url" TEXT,

    CONSTRAINT "therapy_info_pkey" PRIMARY KEY ("therapyid")
);

-- CreateTable
CREATE TABLE "citations" (
    "id" SERIAL NOT NULL,
    "quote_text" TEXT,
    "article_id" TEXT NOT NULL,
    "locator" VARCHAR(200),

    CONSTRAINT "citations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_details" (
    "article_id" TEXT NOT NULL,
    "design_summary" TEXT,
    "design_citation_ids" JSONB NOT NULL DEFAULT '[]',
    "participants_total" INTEGER,
    "participants_citation_ids" JSONB NOT NULL DEFAULT '[]',
    "sex_summary" TEXT,
    "sex_citation_ids" JSONB NOT NULL DEFAULT '[]',
    "age_summary" TEXT,
    "age_citation_ids" JSONB NOT NULL DEFAULT '[]',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "article_details_pkey" PRIMARY KEY ("article_id")
);

-- CreateTable
CREATE TABLE "effects" (
    "id" SERIAL NOT NULL,
    "therapy_id" INTEGER NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "efficacy_extent_summary" TEXT,
    "efficacy_extent_citation_ids" JSONB NOT NULL DEFAULT '[]',
    "efficacy_rate_summary" TEXT,
    "efficacy_rate_citation_ids" JSONB NOT NULL DEFAULT '[]',
    "side_effect_severity_summary" TEXT,
    "side_effect_severity_citation_ids" JSONB NOT NULL DEFAULT '[]',
    "side_effect_risk_summary" TEXT,
    "side_effect_risk_citation_ids" JSONB NOT NULL DEFAULT '[]',
    "participants_total" INTEGER,
    "sex_summary" TEXT,
    "age_summary" TEXT,
    "design_summaries" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "effects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_classification" (
    "id" SERIAL NOT NULL,
    "article_id" VARCHAR(255) NOT NULL,
    "therapy_id" INTEGER NOT NULL,
    "sentence_text" TEXT NOT NULL,
    "sentence_idx" INTEGER NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "model_version" VARCHAR(100),
    "processed_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "article_classification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "processing_log" (
    "id" SERIAL NOT NULL,
    "article_id" VARCHAR(255) NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "error_message" TEXT,
    "sentences_processed" INTEGER DEFAULT 0,
    "classifications_count" INTEGER DEFAULT 0,
    "started_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(6),

    CONSTRAINT "processing_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "citations_article_id_idx" ON "citations"("article_id");

-- CreateIndex
CREATE INDEX "effects_therapy_id_idx" ON "effects"("therapy_id");

-- CreateIndex
CREATE INDEX "effects_name_idx" ON "effects"("name");

-- CreateIndex
CREATE UNIQUE INDEX "effects_therapy_id_name_key" ON "effects"("therapy_id", "name");

-- CreateIndex
CREATE INDEX "article_classification_article_id_idx" ON "article_classification"("article_id");

-- CreateIndex
CREATE INDEX "article_classification_category_idx" ON "article_classification"("category");

-- CreateIndex
CREATE INDEX "article_classification_therapy_id_idx" ON "article_classification"("therapy_id");

-- CreateIndex
CREATE INDEX "article_classification_confidence_idx" ON "article_classification"("confidence");

-- CreateIndex
CREATE INDEX "processing_log_article_id_idx" ON "processing_log"("article_id");

-- CreateIndex
CREATE INDEX "processing_log_status_idx" ON "processing_log"("status");

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_therapyid_fkey" FOREIGN KEY ("therapyid") REFERENCES "therapy"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "therapy_info" ADD CONSTRAINT "therapy_info_fk" FOREIGN KEY ("therapyid") REFERENCES "therapy"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "citations" ADD CONSTRAINT "citations_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_details" ADD CONSTRAINT "article_details_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "effects" ADD CONSTRAINT "effects_therapy_id_fkey" FOREIGN KEY ("therapy_id") REFERENCES "therapy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_classification" ADD CONSTRAINT "article_classification_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_classification" ADD CONSTRAINT "article_classification_therapy_id_fkey" FOREIGN KEY ("therapy_id") REFERENCES "therapy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
