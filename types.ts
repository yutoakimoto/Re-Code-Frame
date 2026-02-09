export type ProjectType = 'web' | 'app' | 'migration' | 'ui_ux' | 'lp' | 'ec';
export type ProjectScale = 'small' | 'medium' | 'large';

export interface EstimateOption {
  id: string;
  label: string;
  price: number;
  category: 'platform' | 'feature' | 'design' | 'maintenance';
  description?: string;
  icon?: string;
}

export interface EstimateState {
  projectType: ProjectType;
  selectedFeatures: string[]; // array of option IDs
  projectScale: ProjectScale;
  isDesignProvided: boolean; // true: provided, false: need creation
  maintenance: boolean;
}

export interface ProposalResponse {
  summary: string;
  technicalChallenges: string[];
  recommendedStack: string[];
  timelineEstimation: string;
}

export interface EstimationData {
  state: EstimateState;
  totalPrice: number;
  proposal: ProposalResponse | null;
}