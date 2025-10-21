// === ARTICLE ===
export interface Article {
  id: string;
  title: string;
  abstract?: string;
  authors?: string;
  created_at: Date;
  source?: string;
  source_url: string;
  content_url?: string;
  published_date?: Date;
  therapy_id: number;
  processed: boolean;
  therapy?: Therapy;
  article_classifications?: ArticleClassification[];
  citations?: Citation[];
}

// === THERAPY ===
export interface Therapy {
  id: number;
  name: string;
  image_url: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  cost_summary?: string;
  cost_amount?: number;
  cost_citation_ids?: any[]; // JSON
  num_participants?: number;
  article?: Article[];
  article_classifications?: ArticleClassification[];
  effects?: Effect[];
  therapy_info?: TherapyInfo;
}

// === THERAPY INFO ===
export interface TherapyInfo {
  therapy_id: number;
  pros?: string;
  cons?: string;
  summary?: string;
  image_url?: string;
  therapy?: Therapy;
}

// === CITATION ===
export interface Citation {
  id: number;
  quote_text?: string;
  article_id: string;
  locator?: string;
  article?: Article;
}

// === EFFECTS ===
export interface Effect {
  id: number;
  therapy_id: number;
  name: string;
  deprecated?: boolean;
  deprecated_reason?: string;
  category?: string;
  summary?: string;
  citation_ids?: any[]; // JSON
  confidence_score?: number;
  created_at?: Date;
  updated_at?: Date;
  therapy?: Therapy;
}

// === ARTICLE CLASSIFICATION ===
export interface ArticleClassification {
  id: number;
  article_id: string;
  therapy_id: number;
  sentence_text: string;
  sentence_idx: number;
  category: string;
  confidence: number;
  model_version?: string;
  processed_at: Date;
  curated?: boolean;
  article?: Article;
  therapy?: Therapy;
}

// === PROCESSING LOG ===
export interface ProcessingLog {
  id: number;
  article_id: string;
  status: string;
  error_message?: string;
  sentences_processed?: number;
  classifications_count?: number;
  started_at: Date;
  completed_at?: Date;
}
