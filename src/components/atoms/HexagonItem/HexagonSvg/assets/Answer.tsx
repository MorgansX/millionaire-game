import React from 'react';
import { AmountProps } from '@/types';

interface AnswerProps extends AmountProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const Answer: React.FC<AnswerProps> = ({ onMouseEnter, onMouseLeave, colors }) => (
  <div className={'HexagonAnswerSvg'} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 421 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d="M404 36L421 36" stroke={colors.stroke} />
      <path d="M0 36L17 36" stroke={colors.stroke} />
      <path
        d="M39.8137 5.09773C41.9857 2.2033 45.3933 0.5 49.012 0.5H371.988C375.607 0.5 379.014 2.2033 381.186 5.09773L404.375 36L381.186 66.9023C379.014 69.7967 375.607 71.5 371.988 71.5H49.012C45.3933 71.5 41.9857 69.7967 39.8137 66.9023L16.6251 36L39.8137 5.09773Z"
        fill={colors.fill}
        stroke={colors.stroke}
      />
    </svg>
  </div>
);
