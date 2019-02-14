import { Injectable } from '@angular/core';
import { pipe, identity } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Post } from './../interfaces/post.interface';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditPostService {
  public currentPost = {};
  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  private _postSource = new BehaviorSubject(this.currentPost);
  public postObservableSubject = this._postSource.asObservable();

  /**
   * editCurrentPost - метод в котором событие изменения значения перемнной currentPost
   * распространяется на компоненту Form и она получает данные редактируемого поста
   */
  editCurrentPost() {
    this._postSource.next(this.currentPost);
  }
  /**
   * /todoCancel - метод вызывается при клике на кнопку Cancel для отмены редактирования поста
   * редактируемому посту присваевается пустой объект и изменение значения this.currentPost рапсространяется на 
   * компоненту form которой переадется новое значение пустой this.currentPost
   */
  todoCancel() {
    this.currentPost = {};
    this._postSource.next(this.currentPost);
  }
  /**
   * addEditedPost - метод вызывается при клике на кнопку Submit для отпарвки на сервер запроса PUT
   * для изменения редактируемого Поста.
   */
  addEditedPost(id, editedPost): Observable<Post> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      })
    };
    return this.http.put<Post>(`${this.apiUrl}/posts/${id}`, editedPost, httpOptions);
  }
}
