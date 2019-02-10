import { Injectable } from '@angular/core';
import { pipe, identity } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Post } from './../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class EditPostService {
  public currentPost = {};

  constructor() { }

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
}
