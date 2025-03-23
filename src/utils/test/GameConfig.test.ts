import GameConfigModule from '@/utils/GameConfig';
import { QuestionProps } from '@/types';

jest.mock('@/constants/questionsMock.json', () => ({
  settings: {
    totalQuestions: 5,
    currency: '€',
  },
  questionLevels: [
    { level: 1, reward: 100 },
    { level: 2, reward: 200 },
    { level: 3, reward: 300 },
    { level: 4, reward: 500 },
    { level: 5, reward: 1000 },
  ],
  questions: [
    {
      id: 1,
      level: 1,
      text: 'Test question 1',
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
      text: 'Test question 2',
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
      text: 'Test question 3',
      category: 'Test',
      difficulty: 'hard',
      options: [
        { id: 'A', text: 'Option A' },
        { id: 'B', text: 'Option B' },
        { id: 'C', text: 'Option C' },
        { id: 'D', text: 'Option D' },
      ],
      correctOptions: ['C'],
      explanation: 'Test explanation 3',
    },
    {
      id: 4,
      level: 4,
      text: 'Test question 4',
      category: 'Test',
      difficulty: 'hard',
      options: [
        { id: 'A', text: 'Option A' },
        { id: 'B', text: 'Option B' },
        { id: 'C', text: 'Option C' },
        { id: 'D', text: 'Option D' },
      ],
      correctOptions: ['D'],
      explanation: 'Test explanation 4',
    },
    {
      id: 5,
      level: 5,
      text: 'Test question 5',
      category: 'Test',
      difficulty: 'very hard',
      options: [
        { id: 'A', text: 'Option A' },
        { id: 'B', text: 'Option B' },
        { id: 'C', text: 'Option C' },
        { id: 'D', text: 'Option D' },
      ],
      correctOptions: ['A', 'B'],
      explanation: 'Test explanation 5',
    },
    {
      id: 6,
      level: 6,
      text: 'Test question 6',
      category: 'Test',
      difficulty: 'very hard',
      options: [
        { id: 'A', text: 'Option A' },
        { id: 'B', text: 'Option B' },
        { id: 'C', text: 'Option C' },
        { id: 'D', text: 'Option D' },
      ],
      correctOptions: ['C', 'D'],
      explanation: 'Test explanation 6',
    },
  ],
}));

describe('GameConfigModule test', () => {
  let gameConfigModule: GameConfigModule;

  beforeEach(() => {
    jest.resetModules();
    GameConfigModule._instance = null;

    gameConfigModule = GameConfigModule.getInstance();

    jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Singleton pattern', () => {
    it('should return the same instance on multiple getInstance calls', () => {
      const instance1 = GameConfigModule.getInstance();
      const instance2 = GameConfigModule.getInstance();

      expect(instance1).toBe(instance2);
    });

    it('should not be instantiable with new', () => {
      expect(() => new GameConfigModule()).toThrow(
        'Use GameConfigModule.getInstance() instead of new',
      );
    });
  });

  describe('getGameSettings', () => {
    it('should return the correct game settings', () => {
      const settings = gameConfigModule.getGameSettings();

      expect(settings).toEqual({
        totalQuestions: 5,
        currency: '€',
      });
    });

    it('should return default settings if none exist', () => {
      gameConfigModule._config = {};

      const settings = gameConfigModule.getGameSettings();

      expect(settings).toEqual({
        totalQuestions: 0,
        currency: '$',
      });
    });
  });

  describe('getQuestionLevels', () => {
    it('should return the correct question levels', () => {
      const levels = gameConfigModule.getQuestionLevels();

      expect(levels).toHaveLength(5);
      expect(levels[0]).toEqual({ level: 1, reward: 100 });
      expect(levels[4]).toEqual({ level: 5, reward: 1000 });
    });

    it('should return an empty array if no levels exist', () => {
      gameConfigModule._config = {};

      const levels = gameConfigModule.getQuestionLevels();

      expect(levels).toEqual([]);
    });
  });

  describe('getAllQuestions', () => {
    it('should return all questions', () => {
      const questions = gameConfigModule.getAllQuestions();

      expect(questions).toHaveLength(6);
      expect(questions[0].id).toBe(1);
      expect(questions[5].id).toBe(6);
    });

    it('should return an empty array if no questions exist', () => {
      gameConfigModule._config = {};

      const questions = gameConfigModule.getAllQuestions();

      expect(questions).toEqual([]);
    });
  });

  describe('_shuffleArray', () => {
    it('should shuffle the array', () => {
      const questions = gameConfigModule.getAllQuestions();

      const shuffled = gameConfigModule._shuffleArray(questions);

      expect(shuffled).not.toEqual(questions);
      expect(shuffled).toHaveLength(questions.length);

      questions.forEach((q) => {
        expect(shuffled.find((sq) => sq.id === q.id)).toBeDefined();
      });
    });
  });

  describe('generateRandomQuestions', () => {
    it('should generate random questions based on totalQuestions setting', () => {
      //"@ts-expect-error"
      const shuffleSpy = jest.spyOn(gameConfigModule, '_shuffleArray');

      const randomQuestions = gameConfigModule.generateRandomQuestions();

      expect(shuffleSpy).toHaveBeenCalled();
      expect(randomQuestions).toHaveLength(5); // from our mock settings.totalQuestions
    });

    it('should generate specified number of random questions', () => {
      const randomQuestions = gameConfigModule.generateRandomQuestions(3);

      expect(randomQuestions).toHaveLength(3);
    });

    it('should return all questions shuffled if count >= questions length', () => {
      const randomQuestions = gameConfigModule.generateRandomQuestions(10);

      expect(randomQuestions).toHaveLength(6); // total in our mock
    });

    it('should return empty array if no questions exist', () => {
      gameConfigModule._config.questions = [];

      const randomQuestions = gameConfigModule.generateRandomQuestions();

      expect(randomQuestions).toEqual([]);
    });

    it('should warn when no questions exist', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      gameConfigModule._config.questions = [];

      gameConfigModule.generateRandomQuestions();

      expect(consoleSpy).toHaveBeenCalledWith('No questions in config');
    });
  });

  describe('getRandomQuestions', () => {
    it('should return cached random questions if available', () => {
      const testQuestions: QuestionProps[] = [
        {
          id: 99,
          level: 1,
          text: 'Cached question',
          category: 'Test',
          difficulty: 'easy',
          options: [],
          correctOptions: [],
          explanation: '',
        },
      ];

      gameConfigModule._randomQuestions = testQuestions;

      const result = gameConfigModule.getRandomQuestions();

      expect(result).toBe(testQuestions);
    });

    it('should generate new random questions if none are cached', () => {
      const generateSpy = jest.spyOn(gameConfigModule, 'generateRandomQuestions');

      gameConfigModule._randomQuestions = null;

      gameConfigModule.getRandomQuestions();

      expect(generateSpy).toHaveBeenCalled();
    });
  });
});
