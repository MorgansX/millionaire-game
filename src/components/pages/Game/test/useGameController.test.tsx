import { renderHook, act } from '@testing-library/react';
import { useGameController } from '../useGameController';
import { useRouter } from 'next/navigation';
import { useHexagonState } from '@/store/useHexagonState';
import { useAmountState } from '@/store/useAmountState';
import GameConfigModule from '@/utils/GameConfig';
import { delayedCb } from '@/utils';
import { QuestionProps } from '@/types';
import { ROUTES } from '@/constants/routes';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/store/useHexagonState', () => ({
  useHexagonState: jest.fn(),
}));

jest.mock('@/store/useAmountState', () => ({
  useAmountState: jest.fn(),
}));

jest.mock('@/constants/routes', () => ({
  ROUTES: {
    SUMMARY: '/summary',
  },
}));

jest.mock('@/utils', () => ({
  delayedCb: jest.fn((cb: () => void) => {
    cb();
    return jest.fn();
  }),
}));

jest.mock('@/utils/GameConfig', () => {
  return {
    __esModule: true,
    default: {
      getInstance: jest.fn(),
    },
  };
});

const mockQuestions: QuestionProps[] = [
  {
    id: 1,
    level: 1,
    text: 'Test Question 1',
    category: 'Test',
    difficulty: 'easy',
    options: [
      { id: 'A', text: 'Option A' },
      { id: 'B', text: 'Option B' },
      { id: 'C', text: 'Option C' },
      { id: 'D', text: 'Option D' },
    ],
    correctOptions: ['A'],
    explanation: 'Test explanation 1',
  },
  {
    id: 2,
    level: 2,
    text: 'Test Question 2',
    category: 'Test',
    difficulty: 'medium',
    options: [
      { id: 'A', text: 'Option A' },
      { id: 'B', text: 'Option B' },
      { id: 'C', text: 'Option C' },
      { id: 'D', text: 'Option D' },
    ],
    correctOptions: ['B'],
    explanation: 'Test explanation 2',
  },
  {
    id: 3,
    level: 3,
    text: 'Test Question 3',
    category: 'Test',
    difficulty: 'hard',
    options: [
      { id: 'A', text: 'Option A' },
      { id: 'B', text: 'Option B' },
      { id: 'C', text: 'Option C' },
      { id: 'D', text: 'Option D' },
    ],
    correctOptions: ['C', 'D'],
    explanation: 'Test explanation 3',
  },
];

const mockQuestionLevels = [
  { level: 1, reward: 100 },
  { level: 2, reward: 200 },
  { level: 3, reward: 300 },
];

describe('useGameController', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    const setHexagonStateMock = jest.fn();
    const resetHexagonStateMock = jest.fn();
    (useHexagonState as jest.Mock).mockImplementation((selector) => {
      if (selector.toString().includes('setHexagonStateTo')) return setHexagonStateMock;
      if (selector.toString().includes('resetState')) return resetHexagonStateMock;
      return jest.fn();
    });

    const setAmountMock = jest.fn();
    (useAmountState as jest.Mock).mockImplementation(() => setAmountMock);

    const mockGameEngine = {
      getGameSettings: jest.fn().mockReturnValue({
        totalQuestions: 3,
        currency: '$',
      }),
      getQuestionLevels: jest.fn().mockReturnValue(mockQuestionLevels),
      generateRandomQuestions: jest.fn().mockReturnValue(mockQuestions),
    };
    (GameConfigModule.getInstance as jest.Mock).mockReturnValue(mockGameEngine);
  });

  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useGameController());

    expect(result.current.totalQuestions).toBe(2);
    expect(result.current.currency).toBe('$');
    expect(result.current.amountProgressList).toHaveLength(3);
    expect(result.current.amountProgressList[0].isActive).toBe(true);
    expect(result.current.currentQuestion).toEqual(mockQuestions[0]);
  });

  it('marks the correct answer and proceeds to next question', () => {
    const { result } = renderHook(() => useGameController());

    const setHexagonStateMock = useHexagonState((state) => state.setHexagonStateTo);
    const setAmountMock = useAmountState(() => {});

    act(() => {
      result.current.onAnswerClick('A');
    });

    expect(setHexagonStateMock).toHaveBeenCalledWith({ buttonId: 'A', state: 'correct' });
    expect(setAmountMock).toHaveBeenCalledWith(100); // First level reward
    expect(delayedCb).toHaveBeenCalledWith(expect.any(Function), 550);

    expect(result.current.currentQuestion).toEqual(mockQuestions[1]);
  });

  it('marks wrong answer and redirects to summary', () => {
    const { result } = renderHook(() => useGameController());
    const pushMock = useRouter().push;
    const setHexagonStateMock = useHexagonState((state) => state.setHexagonStateTo);

    act(() => {
      result.current.onAnswerClick('B');
    });

    expect(setHexagonStateMock).toHaveBeenCalledWith({ buttonId: 'B', state: 'wrong' });
    expect(delayedCb).toHaveBeenCalledWith(expect.any(Function), 1000);

    expect(pushMock).toHaveBeenCalledWith(ROUTES.SUMMARY);
  });

  it('redirects to summary when all questions are answered', () => {
    const { result } = renderHook(() => useGameController());
    const pushMock = useRouter().push;

    act(() => {
      result.current.onAnswerClick('A');
    });

    act(() => {
      result.current.onAnswerClick('B');
    });

    act(() => {
      result.current.onAnswerClick('C');
    });

    expect(pushMock).toHaveBeenCalledWith(ROUTES.SUMMARY);
  });

  it('updates amountProgressList correctly when changing questions', () => {
    const { result } = renderHook(() => useGameController());

    expect(result.current.amountProgressList[0].isActive).toBe(true);
    expect(result.current.amountProgressList[0].visited).toBe(false);

    act(() => {
      result.current.onAnswerClick('A');
    });

    expect(result.current.amountProgressList[0].isActive).toBe(false);
    expect(result.current.amountProgressList[0].visited).toBe(true);
    expect(result.current.amountProgressList[1].isActive).toBe(true);
    expect(result.current.amountProgressList[1].visited).toBe(false);
  });

  it('resets hexagon state when changing questions', () => {
    const { result } = renderHook(() => useGameController());
    const resetHexagonStateMock = useHexagonState((state) => state.resetState);

    act(() => {
      result.current.onAnswerClick('A');
    });

    expect(resetHexagonStateMock).toHaveBeenCalled();
  });

  it('handles multiple correct answers properly', () => {
    const { result } = renderHook(() => useGameController());

    act(() => {
      result.current.onAnswerClick('A');
    });

    act(() => {
      result.current.onAnswerClick('B');
    });

    const setHexagonStateMock = useHexagonState((state) => state.setHexagonStateTo);
    act(() => {
      result.current.onAnswerClick('C');
    });

    expect(setHexagonStateMock).toHaveBeenCalledWith({ buttonId: 'C', state: 'correct' });

    jest.clearAllMocks();
    const { result: newResult } = renderHook(() => useGameController());

    act(() => {
      newResult.current.onAnswerClick('A');
    });

    act(() => {
      newResult.current.onAnswerClick('B');
    });

    const newSetHexagonStateMock = useHexagonState((state) => state.setHexagonStateTo);
    act(() => {
      newResult.current.onAnswerClick('D');
    });

    expect(newSetHexagonStateMock).toHaveBeenCalledWith({ buttonId: 'D', state: 'correct' });
  });

  it('handles the case when there are no questions', () => {
    const mockGameEngine = GameConfigModule.getInstance();
    mockGameEngine.generateRandomQuestions = jest.fn().mockReturnValue([]);

    const { result } = renderHook(() => useGameController());

    expect(result.current.currentQuestion).toBeUndefined();
  });
});
