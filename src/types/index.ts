export type QuestionType = 'multiple-choice' | 'completion' | 'interactive';
export type ContentType = 'text' | 'picture' | 'painting' | 'texturing';

export interface Question {
  id: string;
  type: QuestionType;
  contentType: ContentType;
  question: string;
  solution: string;
  videoUrl?: string;
  options?: string[];
  correctAnswer: string;
  imageUrl?: string;
}

export interface GameState {
  lives: number;
  currentStep: number;
  mistakes: number;
  strafQuestions: number;
  isVideoRequired: boolean;
  hasViewedSolution: boolean;
  actionTaken: boolean;
  viewedSolutionSteps: number[];
 
  roundStatus: 'default' | 'red' | 'brown' | 'yellow';
}