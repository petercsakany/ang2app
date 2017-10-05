import { Component, OnInit } from '@angular/core';
import {QuizService} from "../shared/quiz.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  numOfQuestions: number;
  score: number = 0;

  constructor(private quizService: QuizService) {
    this.numOfQuestions = this.quizService.numOfQuestions;
    this.score = this.quizService.score;
  }

  ngOnInit() {
  }

}
