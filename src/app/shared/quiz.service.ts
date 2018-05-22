import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Category} from './category.model';
import {Question} from './question.model';

@Injectable()
export class QuizService {

  get numOfQuestions(): number {
    return this._numOfQuestions;
  }

  get score(): number {
    return this._score;
  }

  set score(value: number) {
    this._score = value;
  }

  constructor(private http: Http) {}

  private gameState = {
    caption: 'Setup Quiz',
    setup: true,
    start: false,
    finish: false,
  };

  private queryUrl: string;

  private _score: number;

  private _numOfQuestions: number;

  static shuffleAnswers(answers: Array<string>): Array<string> {
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = answers[i];
      answers[i] = answers[j];
      answers[j] = temp;
    }
    return answers;
  }


  updateUrl(url): void {
    this.queryUrl = url;
  }

  getGameState(): {caption: string, setup: boolean, start: boolean, finish: boolean} {
    return this.gameState;
  }

  updateGameState(caption: string, setup: boolean, start: boolean, finish: boolean): void {
    this.gameState.caption = caption;
    this.gameState.setup = setup;
    this.gameState.start = start;
    this.gameState.finish = finish;
  }

  fetchCategories() {
    return this.http.get('https://opentdb.com/api_category.php')
      .map( (res) => res.json())
      .map(data => {
        const categories = data.trivia_categories;
        const result: Array<Category> = [];
        if (categories) {
          categories.forEach((cat) => {
            result.push(
              new Category(cat.id, cat.name));
          });
        }
        return result;
      });
  }

  fetchQuestions() {
    return this.http.get(this.queryUrl)
      .map( (res) => res.json())
      .map(data => {
        const questions = data.results;
        const result: Array<Question> = [];
        if (questions) {
          this._numOfQuestions = questions.length;
          questions.forEach((qst) => {
            const question = new Question(qst.question, qst.incorrect_answers, qst.correct_answer);
            question.answers.push(question.correctAnswer);
            question.answers = QuizService.shuffleAnswers(question.answers);
            result.push(question);
          });
        }
        return result;
      }) ;
  }

  fetchNumOfQuestions() {
    return this.http.get('https://opentdb.com/api_count_global.php')
      .map( (res) => res.json())
      .map(data => {
        return data;
      });
  }

}
