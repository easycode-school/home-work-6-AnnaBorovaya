import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from './../../interfaces/post.interface';
import { TodoPostService } from './../../services/todo-post.service';
import { EditPostService } from './../../services/edit-post.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  private newPost: Post = {
    userId: '',
    title: '',
    body: ''
  };

  constructor(
    public postService: TodoPostService,
    public postEditService: EditPostService
  ) {}

  /**
   * ngOnInit - метод для стартовой инициализации переменных
   * подписываемся на событие которое происходит в postEditService при 
   * изменении значения переменной currentPost. В CallBacke объект newPost заполняется
   * значениями объекта currentPost
   */
  ngOnInit() {
    this.postEditService.postObservableSubject.subscribe((currentPost: Post) => {
      this.newPost.userId = currentPost.userId;
      this.newPost.title = currentPost.title;
      this.newPost.body = currentPost.body;
      }
    );
  }

  /**
   * addPost - метод который вызывается при submit формы
   * вызывается метод в postService, туда передается объект newPost который связан двусторонней привязкой с формой,
   * где в массив добавляется один пост, форма сбрасывается
   * @param form - object
   */
  addPost(): void {
    this.postService.addExampl(this.newPost);
    this.form.resetForm();
  }
}
