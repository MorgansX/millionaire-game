export type TextContentProps = {
  title: string;
  navigateTo: string;
  buttonTitle: string;
  subTitle?: string;
  onButtonClick?: () => void;
};

export type QuestionLevels = {
  level: number;
  reward: number;
};

export interface RewardListProps extends QuestionLevels {
  isActive: boolean;
  visited: boolean;
}

export type QuestionOptionProps = { id: string; text: string };

export type QuestionProps = {
  id: number;
  level: number;
  text: string;
  category: string;
  difficulty: string;
  options: Array<QuestionOptionProps>;
  correctOptions: Array<string>;
  explanation: string;
};

export type HexagonState = 'inactive' | 'hover' | 'selected' | 'correct' | 'wrong';

export type AmountProps = {
  colors: {
    fill: string;
    stroke: string;
  };
};
type GameSettings = {
  totalQuestions: number;
  currency: string;
};
export type GameConfigProps = {
  settings: GameSettings;
  questionLevels: QuestionLevels[];
  questions: QuestionProps[];
};
