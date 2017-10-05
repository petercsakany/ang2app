import {Component, OnInit, QueryList, Renderer2, ViewChildren} from '@angular/core';
import {QuizService} from "../shared/quiz.service";
import {Question} from "../shared/question.model";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questions: Array<Question>;
  currentQuestion: Question;
  currentQuestionIndex: number = 0;
  currentScore: number = 0;
  answerGiven: boolean = false;

  @ViewChildren('ans') answers:QueryList<any>;

  constructor(private quizService: QuizService, private renderer: Renderer2) {
    quizService.fetchQuestions().subscribe(
      res => this.questions = res,
      (error)=>{console.log(error)},
      ()=>{
        this.currentQuestion = this.questions[this.currentQuestionIndex];
      });
  }

  nextQuestion() {
    if(this.currentQuestionIndex < this.questions.length - 1){
      this.currentQuestionIndex ++;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
    else {
      this.quizService.updateGameState('Results',false,false,true);
    }
  }

  ngOnInit() {
  }

  checkAnswer(event) {
    if (event.target.textContent === this.currentQuestion.correctAnswer) {
      this.renderer.addClass(event.target, 'list-group-item-success');
      this.currentScore ++;
      this.answerGiven = true;
      this.quizService.score = this.currentScore;
    }
    else {
      this.renderer.addClass(event.target, 'list-group-item-danger');
      this.answerGiven = true;
    }

    if (this.answerGiven) {
      this.answers.forEach(answer => {
        if (answer.nativeElement.textContent === this.currentQuestion.correctAnswer) {
          this.renderer.addClass(answer.nativeElement, 'list-group-item-success');
        }
        answer.nativeElement.disabled = true;
      });
    }
  }

}
