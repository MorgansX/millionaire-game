'use client';
import React from 'react';
import { useHexagon } from '@/components/atoms/HexagonItem/HexagonSvg/useHexagon';
import { Answer } from '@/components/atoms/HexagonItem/HexagonSvg/assets/Answer';
import { Amount } from '@/components/atoms/HexagonItem/HexagonSvg/assets/Amount';
import '../styles.css';

type HexagonProps = {
  variant: 'answer' | 'amount';
  answer?: string;
  isActive?: boolean;
  isPrev?: boolean;
};

export const Hexagon: React.FC<HexagonProps> = ({ variant, answer = '', isPrev, isActive }) => {
  const { onMouseEnter, onMouseLeave, answerBorderColor, amountBorderColor } = useHexagon({
    answer,
    isPrev,
    isActive,
  });

  if (variant === 'answer') {
    return (
      <Answer colors={answerBorderColor} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
    );
  }

  if (variant === 'amount') {
    return <Amount colors={amountBorderColor} />;
  }
};
