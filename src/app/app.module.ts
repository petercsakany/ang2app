import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import { QuizComponent } from './quiz/quiz.component';
import {QuizService} from "./shared/quiz.service";
import { QuestionComponent } from './question/question.component';
import { DecodeHtmlStringPipe } from './shared/decode-html-string.pipe';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    QuestionComponent,
    DecodeHtmlStringPipe
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
