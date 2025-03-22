export enum HEXAGON_STATES {
  SELECTED = 'selected',
  CORRECT = 'correct',
  WRONG = 'wrong',
  HOVER = 'hover',
  INACTIVE = 'inactive',
  DEFAULT = 'default',
  PREVIOUS = 'previous',
  CURRENT = 'current',
}

const DEFAULT_COLORS = { fill: '#FFFFFF', stroke: '#D0D0D8' };
const INACTIVE_COLORS = { fill: '#FFFFFF', stroke: '#F69F53' };
const HOVER_COLORS = { fill: '#FFFFFF', stroke: '#F69F53' };
const WRONG_COLORS = { fill: '#FFF2F2', stroke: '#FC7171' };
const SELECTED_COLORS = { fill: '#FFF8F2', stroke: '#F69F53' };
const CORRECT_COLORS = { fill: '#F0FFF1', stroke: '#6FCF7A' };

const CURRENT_AMOUNT_COLORS = { fill: '#FFF', stroke: '#FF8B37' };
export const hexagonAnswerColors = {
  [HEXAGON_STATES.CORRECT]: CORRECT_COLORS,
  [HEXAGON_STATES.SELECTED]: SELECTED_COLORS,
  [HEXAGON_STATES.WRONG]: WRONG_COLORS,
  [HEXAGON_STATES.HOVER]: HOVER_COLORS,
  [HEXAGON_STATES.INACTIVE]: INACTIVE_COLORS,
  [HEXAGON_STATES.DEFAULT]: DEFAULT_COLORS,
};

export const hexagonAmountColors = {
  [HEXAGON_STATES.DEFAULT]: DEFAULT_COLORS,
  [HEXAGON_STATES.PREVIOUS]: DEFAULT_COLORS,
  [HEXAGON_STATES.CURRENT]: CURRENT_AMOUNT_COLORS,
};
