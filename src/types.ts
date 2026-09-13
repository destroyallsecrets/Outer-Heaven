export interface PanelData {
  id: number;
  sectionNumber: string;
  sectionTitle: string;
  originalConcept: string;
  originalConceptSubtitle: string;
  replacementTitle: string;
  replacementConcept: string;
  prompt: string;
  doctrinalThesis: string;
  theologicalReflection: string;
  scriptureReference: string;
  scriptureContext: string;
  visualMotif: string;
  imageSrc: string;
  contrastHighlights: {
    former: string;
    renewed: string;
  };
}

export type ViewMode = 'walkthrough' | 'overview' | 'comparison' | 'prompt-sheet';
