import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { map, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { pipe, identity } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Post } from './../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})

export class TodoPostService {
  public posts: Post[] = [];
  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  private _postSource = new BehaviorSubject(this.posts);
  public postObservableSubject = this._postSource.asObservable();

  /**
   * getExample - метод для получения всех постов
   * при получении всех постов переменной this.posts присваиваются все стартовыетпосты
   */
  public getExample() {
    return this.http.get(`${this.apiUrl}/posts`).pipe(
      map((posts: Post[]) => {
      this.posts = posts;
      return posts;
      })
    );
  }
  /**
   * getExample - метод для удаления одного поста
   * в переменную this.posts присваиваются все посты кроме удаляемого
   * и имитится событие которое распространяется на компоненту Post в которую передается новое значение this.posts
   * а также делается запрос на сервер где удаляется этот Post
   */
  public deleteExample(id): void {
    this.posts = this.posts.filter((post) => post.id !== id);
    this._postSource.next(this.posts);
    this.http.delete(`${this.apiUrl}/posts/${id}`);
  }

  /**
   * addExampl - метод для добавления одного поста
   * в переменную this.posts добавляется новый Post
   * и имитится событие которое распространяется на компоненту Post в которую передается новое значение this.posts
   * а также делается запрос на сервер где добавляется этот Post
   */
  public addExampl(post): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      })
    };
    this.posts.push(Object.assign({}, post));
    this._postSource.next(this.posts);
    this.http.post(`${this.apiUrl}/posts`, post, httpOptions);
  }

  /**
   * showCommen - метод для вывода комментариев под одним постом
   * делается запрос на сервер для получения постов
   */
  public showComment(id) {
    console.log(id);
    return this.http.get(`${this.apiUrl}/posts/${id}/comments`);
  }
}
