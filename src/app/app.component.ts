import {Component, OnInit} from '@angular/core';
import {QuizService} from "./shared/quiz.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  caption: string;
  gameState: {caption: string, setup: boolean, start: boolean, finish: boolean};

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.gameState = this.quizService.getGameState();
  }

}
