import { Component, OnInit } from '@angular/core';
import {QuizService} from "../shared/quiz.service";
import {Category} from "../shared/category.model";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  //quiz arrays and attributes
  categories: Array<Category>;
  numOfQtsInCats: any = {};
  selectedCategoryId: number = 0;
  selectedCategoryMaxNum: number = 50;
  prevCategoryMaxNum: number = 0;

  //form elements attributes
  categorySelectDisabled: boolean = false;
  anyCategory: boolean = false;

  constructor(private  quizService: QuizService) {
    quizService.fetchCategories().subscribe(res => this.categories = res);
    quizService.fetchNumOfQuestions().subscribe(res => this.numOfQtsInCats = res);
  }

  getCategoryId(selectedCategory) {
    this.selectedCategoryId = selectedCategory.value;
    let obj = this.numOfQtsInCats.categories;
    for (let prop in obj) {
      if (prop === selectedCategory.value.toString() && obj[prop].total_num_of_questions < 50) {
        this.selectedCategoryMaxNum = obj[prop].total_num_of_questions;
      }
    }
  }

  anyCategoryClicked() {
    this.categorySelectDisabled = !this.categorySelectDisabled;
    if(!this.categorySelectDisabled){
      this.selectedCategoryMaxNum = this.prevCategoryMaxNum;
    }
    else {
      this.prevCategoryMaxNum = this.selectedCategoryMaxNum;
      this.selectedCategoryMaxNum = 50;
    }
  }

  ngOnInit() {
  }

  startQuiz() {
    this.quizService.updateGameState('Quiz',false,true,false);

    let url = 'https://opentdb.com/api.php?';
    url += `amount=${this.selectedCategoryMaxNum}`;
    if(this.selectedCategoryId && !this.anyCategory){
      url += `&category=${this.selectedCategoryId}`;
    }

    this.quizService.updateUrl(url);
  }

}
