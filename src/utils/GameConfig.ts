import gameConfig from '@/constants/questionsMock.json';
import { GameConfigProps, QuestionProps } from '@/types';

class GameConfigModule {
  private static _instance: GameConfigModule | null = null;
  private _config: GameConfigProps;
  private _randomQuestions: QuestionProps[] | null = null;

  private constructor() {
    if (GameConfigModule._instance) {
      throw new Error('Use GameConfigModule.getInstance() instead of new');
    }

    this._config = gameConfig as GameConfigProps;
  }

  public static getInstance(): GameConfigModule {
    if (!GameConfigModule._instance) {
      GameConfigModule._instance = new GameConfigModule();
    }
    return GameConfigModule._instance;
  }

  public getGameSettings(): GameConfigProps['settings'] {
    return this._config?.settings || { totalQuestions: 0, currency: '$' };
  }

  public getQuestionLevels(): GameConfigProps['questionLevels'] {
    return this._config?.questionLevels || [];
  }

  public getAllQuestions(): QuestionProps[] {
    return this._config?.questions || [];
  }

  private _shuffleArray(array: QuestionProps[]): QuestionProps[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  public generateRandomQuestions(count: number | null = null): QuestionProps[] {
    if (count === null) {
      count = this.getGameSettings().totalQuestions || 0;
    }

    const allQuestions = this.getAllQuestions();
    if (!allQuestions || allQuestions.length === 0) {
      console.warn('No questions in config');
      return [];
    }

    if (count >= allQuestions.length) {
      this._randomQuestions = this._shuffleArray(allQuestions);
      return this._randomQuestions;
    }

    this._randomQuestions = this._shuffleArray(allQuestions).slice(0, count);
    return this._randomQuestions;
  }

  public getRandomQuestions(): QuestionProps[] {
    if (!this._randomQuestions) {
      return this.generateRandomQuestions();
    }
    return this._randomQuestions;
  }
}

export default GameConfigModule;
