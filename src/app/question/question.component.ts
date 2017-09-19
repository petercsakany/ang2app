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
  firstQuestion: Question;

  constructor(private quizService: QuizService) {
    quizService.fetchQuestions().subscribe(
      res => this.questions = res,
      (error)=>{console.log(error)},
      ()=>{this.firstQuestion = this.questions[0]});
  }

  show(){
    console.log(this.questions);
  }

  ngOnInit() {
  }

}
