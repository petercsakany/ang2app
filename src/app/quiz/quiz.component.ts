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
  numOfQts: number = 50;
  numOfQtsInCtgs: any = {};
  selectedCtgId: number = 0;
  selectedCtgMaxQNum: number = 50;
  prevCtgQMaxNum: number = 0;

  //form elements attributes
  categorySelectDisabled: boolean = false;
  anyCategory: boolean = false;
  numOfQtsError: boolean = false;

  constructor(private  quizService: QuizService) {
    quizService.fetchCategories().subscribe(res => this.categories = res);
    quizService.fetchNumOfQuestions().subscribe(res => this.numOfQtsInCtgs = res);
  }

  getCategoryId(selectedCategory) {
    this.selectedCtgId = selectedCategory.value;
    let obj = this.numOfQtsInCtgs.categories;
    for (let prop in obj) {
      if (prop === selectedCategory.value.toString() && obj[prop].total_num_of_questions < 50) {
        this.selectedCtgMaxQNum = obj[prop].total_num_of_questions;
      }
    }
  }

  anyCategoryClicked() {
    this.categorySelectDisabled = !this.categorySelectDisabled;
    if(!this.categorySelectDisabled){
      this.selectedCtgMaxQNum = this.prevCtgQMaxNum;
    }
    else {
      this.prevCtgQMaxNum = this.selectedCtgMaxQNum;
      this.selectedCtgMaxQNum = 50;
    }
  }

  ngOnInit() {
  }

  startQuiz() {

    if(this.numOfQts > this.selectedCtgMaxQNum || this.numOfQts <= 0) {
      this.numOfQtsError = true;
    }
    else {

      let url = 'https://opentdb.com/api.php?';
      url += `amount=${this.numOfQts}`;
      if(this.selectedCtgId && !this.anyCategory){
        url += `&category=${this.selectedCtgId}`;
      }

      this.quizService.updateUrl(url);
      this.numOfQtsError = false;

      this.quizService.updateGameState('Quiz',false,true,false);
    }
  }

}
