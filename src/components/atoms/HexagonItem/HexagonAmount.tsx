import Typography from '@/components/atoms/Typography';
import React from 'react';
import './styles.css';
import { Hexagon } from '@/components/atoms/HexagonItem/HexagonSvg/HexagonSvg';

type HexagonAmountProps = {
  amount: string;
  currency: string;
  isActive: boolean;
  isPrev: boolean;
};

const HexagonAmount: React.FC<HexagonAmountProps> = ({ amount, currency, isActive, isPrev }) => {
  const textClassName = isActive ? 'current' : isPrev ? 'previous' : 'default';

  return (
    <div className="HexagonAnswerWrapper">
      <div className="HexagonContainer">
        <Hexagon variant="amount" isActive={isActive} isPrev={isPrev} />
        <div className="AmountContainer">
          <div className="TextContent">
            <Typography.text
              className={`AmountText Text_${textClassName}`}
            >{`${amount} ${currency}`}</Typography.text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HexagonAmount;
