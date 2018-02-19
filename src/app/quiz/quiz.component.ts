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
  totQNum: number = 0;
  selectedCtgId: number = 0;
  selectedCtgMaxQNum: number = 50;
  selectedCtgTotQNum: number = 0;
  prevCtgQMaxNum: number = 0;
  prevCtgTotQNum: number = 0;

  //form elements attributes
  categorySelectDisabled: boolean = false;
  anyCategory: boolean = true;
  ErrorMsg: string = '';

  constructor(private  quizService: QuizService) {
    quizService.fetchCategories().subscribe(
      res => this.categories = res,
      (error)=>{
        this.ErrorMsg = "An error occurred: " + error;
      }
    );
    quizService.fetchNumOfQuestions().subscribe(
      res => this.numOfQtsInCtgs = res,
      (error)=>{
        this.ErrorMsg = "An error occurred: " + error;
      },
      ()=>{
        this.totQNum = this.numOfQtsInCtgs.overall.total_num_of_verified_questions;
        this.selectedCtgTotQNum = this.totQNum;
      }
    );
  }

  getCategoryId(selectedCategory) {
    this.selectedCtgId = selectedCategory.value;
    if (this.selectedCtgId == -1) {
      this.anyCategory = true;
      this.selectedCtgTotQNum = this.totQNum;
      this.selectedCtgMaxQNum = 50;
      this.numOfQts = this.selectedCtgMaxQNum;
      this.ErrorMsg = null;
    }

    let obj = this.numOfQtsInCtgs.categories;
    for (let prop in obj) {
      if (prop === selectedCategory.value.toString()) {
        this.selectedCtgTotQNum = obj[prop].total_num_of_verified_questions;
        if(this.selectedCtgTotQNum >= 50) {
          this.selectedCtgMaxQNum = 50;
          this.numOfQts = this.selectedCtgMaxQNum;
        }
        else {
          this.selectedCtgMaxQNum = this.selectedCtgTotQNum;
          this.numOfQts = this.selectedCtgMaxQNum;
        }
        this.prevCtgQMaxNum = this.selectedCtgMaxQNum;
        this.prevCtgTotQNum = this.selectedCtgTotQNum;
        this.anyCategory = false;
      }
    }
    this.ErrorMsg = null;
  }

  ngOnInit() {
  }

  startQuiz() {

    if(this.numOfQts > this.selectedCtgMaxQNum || this.numOfQts <= 0) {
      this.ErrorMsg = "Number of questions cannot be less than 1 or more than the given limit!";
    }
    else {

      let url = 'https://opentdb.com/api.php?';
      url += `amount=${this.numOfQts}`;
      if(this.selectedCtgId && !this.anyCategory){
        url += `&category=${this.selectedCtgId}`;
      }

      this.quizService.updateUrl(url);

      this.quizService.updateGameState('Quiz',false,true,false);

      this.ErrorMsg = null;
    }
  }

}
