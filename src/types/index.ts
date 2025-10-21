export interface Article {
  id: string;
  title: string;
  abstract?: string;
  authors?: string;
  created_at: Date;
  source?: string;
  source_url: string;
  content_url?: string;
  published_date?: string;
  therapy_id: number;
  processed: boolean;
  therapy?: Therapy;
  citations?: Citation[];
  article_details?: ArticleDetails;
  article_classifications?: ArticleClassification[];
}

export interface Therapy {
  id: number;
  name: string;
  image_url: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  cost_summary?: string;
  cost_currency?: string;
  cost_amount?: number;
  cost_citation_ids?: any[]; // JSON
  article?: Article[];
  therapy_info?: TherapyInfo;
  effects?: Effect[];
  article_classifications?: ArticleClassification[];
}

export interface TherapyInfo {
  therapy_id: number;
  pros?: string;
  cons?: string;
  summary?: string;
  image_url?: string;
  therapy?: Therapy;
}

export interface Citation {
  id: number;
  quote_text?: string;
  article_id: string;
  locator?: string;
  article?: Article;
}

export interface ArticleDetails {
  article_id: string;
  design_summary?: string;
  design_citation_ids?: any[]; // JSON
  participants_total?: number;
  participants_citation_ids?: any[]; // JSON
  sex_summary?: string;
  sex_citation_ids?: any[]; // JSON
  age_summary?: string;
  age_citation_ids?: any[]; // JSON
  created_at: Date;
  article?: Article;
}

export interface Effect {
  id: number;
  therapy_id: number;
  name: string;
  efficacy_extent_summary?: string;
  efficacy_extent_citation_ids?: any[]; // JSON
  efficacy_rate_summary?: string;
  efficacy_rate_citation_ids?: any[]; // JSON
  side_effect_severity_summary?: string;
  side_effect_severity_citation_ids?: any[]; // JSON
  side_effect_risk_summary?: string;
  side_effect_risk_citation_ids?: any[]; // JSON
  participants_total?: number;
  sex_summary?: string;
  age_summary?: string;
  design_summaries?: any[]; // JSON
  therapy?: Therapy;
}

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
  article?: Article;
  therapy?: Therapy;
}

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
