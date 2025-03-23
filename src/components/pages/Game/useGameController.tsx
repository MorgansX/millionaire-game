import { useEffect, useState } from 'react';
import { QuestionProps, RewardListProps } from '@/types';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { useHexagonState } from '@/store/useHexagonState';
import { delayedCb } from '@/utils';
import { useAmountState } from '@/store/useAmountState';
import GameConfigModule from '@/utils/GameConfig';

export const useGameController = () => {
  const router = useRouter();
  const gameEngine = GameConfigModule.getInstance() as GameConfigModule;
  const [questionList, setQuestionList] = useState<Array<QuestionProps>>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const setHexagonState = useHexagonState((state) => state.setHexagonStateTo);
  const resetHexagonState = useHexagonState((state) => state.resetState);
  const setAmountState = useAmountState((state) => state.setAmount);
  const currentQuestion = questionList[questionIndex];
  const gameSettings = gameEngine?.getGameSettings();
  const totalQuestions = gameSettings?.totalQuestions - 1;

  const [amountProgressList, setAmountProgressList] = useState<Array<RewardListProps>>(
    gameEngine.getQuestionLevels().map((level) => ({
      ...level,
      isActive: false,
      visited: false,
    })),
  );

  const goToSummary = () => router.push(ROUTES.SUMMARY);

  const checkAnswer = (answer: string) => {
    const correctAnswers = currentQuestion.correctOptions;
    return correctAnswers.includes(answer);
  };

  const proceedToNextQuestion = () => setQuestionIndex((prev) => prev + 1);

  const onAnswerClick = (answer: string) => {
    const isValidAnswer = checkAnswer(answer);

    if (isValidAnswer) {
      setHexagonState({ buttonId: answer, state: 'correct' });
      setAmountState(amountProgressList[questionIndex].reward);
      if (questionIndex >= totalQuestions) return goToSummary();
      return delayedCb(proceedToNextQuestion, 550);
    }

    setHexagonState({ buttonId: answer, state: 'wrong' });
    return delayedCb(goToSummary, 1000);
  };

  const onAmountValueChange = () => {
    const updatedAmountList = [...amountProgressList];

    updatedAmountList.forEach((item) => {
      item.isActive = false;
    });

    if (updatedAmountList[questionIndex]) {
      updatedAmountList[questionIndex].isActive = true;
    }

    for (let i = 0; i < questionIndex; i++) {
      const currentAmountList = updatedAmountList[i];
      if (currentAmountList) {
        currentAmountList.visited = true;
      }
    }

    setAmountProgressList(updatedAmountList);
  };

  useEffect(() => {
    const randomQuestions = gameEngine.generateRandomQuestions() as Array<QuestionProps>;
    setQuestionList(randomQuestions);
  }, []);

  useEffect(() => {
    resetHexagonState();
    onAmountValueChange();
  }, [questionIndex]);

  return {
    amountProgressList,
    currency: gameSettings?.currency,
    totalQuestions,
    currentQuestion,
    onAnswerClick,
  };
};
