import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import { QuizComponent } from './quiz/quiz.component';
import {QuizService} from "./shared/quiz.service";
import { QuestionComponent } from './question/question.component';
import { DecodeHtmlStringPipe } from './shared/decode-html-string.pipe';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    QuestionComponent,
    DecodeHtmlStringPipe,
    ResultComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [QuizService],
  bootstrap: [AppComponent]
})
export class AppModule { }
