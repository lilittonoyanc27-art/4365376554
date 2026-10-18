export interface ExampleItem {
  id: string;
  spanish: string;
  armenian: string;
  note?: string;
  highlightWords?: string[];
}

export interface TableRowItem {
  id: string;
  spanish: string;
  armenian: string;
  explanation?: string;
}

export interface ComparisonItem {
  id: string;
  spanish: string;
  armenian: string;
  annotation?: string;
}

export interface DialogueLine {
  id: string;
  speaker: string;
  spanish: string;
  armenian: string;
}

export interface ReadingParagraph {
  id: string;
  spanish: string;
  armenian: string;
  sentences?: {
    spanish: string;
    armenian: string;
  }[];
}

export interface SectionData {
  id: number;
  numberStr: string;
  titleEs: string;
  titleHy: string;
  levelBadge?: string;
  formula?: string;
  descriptionHy?: string[];
  table?: {
    headers: [string, string];
    rows: TableRowItem[];
  };
  examplesTitle?: string;
  examples?: ExampleItem[];
  subsections?: {
    title: string;
    description?: string[];
    table?: {
      headers: [string, string];
      rows: TableRowItem[];
    };
    examples?: ExampleItem[];
  }[];
  comparisons?: {
    title: string;
    items: ComparisonItem[];
    notes?: string[];
  }[];
  notes?: string[];
  attentionNotes?: string[];
  grammarNotes?: string[];
  dialogue?: {
    title: string;
    context: string;
    lines: DialogueLine[];
  };
  reading?: {
    title: string;
    level: string;
    intro?: string;
    paragraphs: ReadingParagraph[];
    summaryNote?: string;
  };
}
