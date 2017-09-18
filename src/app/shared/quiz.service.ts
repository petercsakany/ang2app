import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import {Category} from "./category.model";

@Injectable()
export class QuizService {

  constructor(private http: Http) {}

  getTasks() {
    return this.http.get('https://opentdb.com/api_category.php')
      .map( (res) => res.json())
      .map(data =>{
        let categories = data.trivia_categories;
        let result: Array<Category> = [];
        if (categories) {
          categories.forEach((cat) => {
            result.push(
              new Category(cat.id,cat.name));
          });
        }
        return result;
      });
  }
}
