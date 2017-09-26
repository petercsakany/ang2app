import { Component, OnInit } from '@angular/core';
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

  constructor(private quizService: QuizService) {
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
  }

  ngOnInit() {
  }

}
