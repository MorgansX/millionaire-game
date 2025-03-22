import { useState, useMemo } from 'react';
import { useHexagonState } from '@/store/useHexagonState';
import { HEXAGON_STATES, hexagonAmountColors, hexagonAnswerColors } from '@/constants/colors';

type UseHexagonProps = {
  answer?: string;
  isPrev?: boolean;
  isActive?: boolean;
};

export const useHexagon = ({ answer, isActive, isPrev }: UseHexagonProps) => {
  const [isHover, setIsHover] = useState(false);
  const state = useHexagonState(({ state }) => state);

  const { answerBorderColor, amountBorderColor } = useMemo(() => {
    const answerHexState =
      answer === state.buttonId
        ? state.state
        : isHover
          ? HEXAGON_STATES.HOVER
          : HEXAGON_STATES.DEFAULT;

    const amountHexState = isActive
      ? HEXAGON_STATES.CURRENT
      : isPrev
        ? HEXAGON_STATES.PREVIOUS
        : HEXAGON_STATES.DEFAULT;

    return {
      answerBorderColor: hexagonAnswerColors[answerHexState],
      amountBorderColor: hexagonAmountColors[amountHexState],
    };
  }, [answer, state.buttonId, state.state, isHover, isActive, isPrev]);

  const onMouseEnter = () => setIsHover(true);
  const onMouseLeave = () => setIsHover(false);

  return { answerBorderColor, amountBorderColor, onMouseEnter, onMouseLeave };
};
