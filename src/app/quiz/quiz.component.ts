import { Component, OnInit } from '@angular/core';
import {QuizService} from "../shared/quiz.service";
import {Category} from "../shared/category.model";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  categories: Array<Category>;

  constructor(private  quizService: QuizService) {
    quizService.getTasks().subscribe(res => this.categories = res);
  }

  loadCategories() {
    console.log(this.categories);
  }

  ngOnInit() {
  }

}
