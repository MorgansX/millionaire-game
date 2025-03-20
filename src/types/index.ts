export type TextContentProps = {
  title: string;
  navigateTo: string;
  buttonTitle: string;
  subTitle?: string;
  onButtonClick?: () => void;
};

export type RewardListProps = {
  isActive: boolean;
  visited: boolean;
  level: number;
  reward: number;
};

type QuestionOptionProps = { id: string; text: string };

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
