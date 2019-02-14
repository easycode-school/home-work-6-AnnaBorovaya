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
  public postInForm: Post = {
    userId: '',
    title: '',
    body: '',
    id: ''
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
      this.postInForm = currentPost;
    });
  }

  /**
   * addPost - метод который вызывается при submit формы, переьираем массив наших Postov и :
   * - если id поста который записан в Forme есть в нашем массиве Postov, то вызываем метод addEditedPost в котором:
   * делаем запрос PUT на сервер и при получении ответа в редактируемый Пост записываем отредактированный Пост
   * сбрасываем форму.
   * - если id поста не существует, то вызываем метод addExampl в котором:
   * делаем запрос POST запрос на сервер в котором наш Post добавляется в разметку и сбрасываем форму.
   */
  addPost(): void {
    if (!this.postInForm.id) {
      this.postService.addExampl(this.postInForm);
      this.form.resetForm();
      return;
    }
    if (this.postService.posts.some((item) => this.postInForm.id === item.id )) {
      this.postEditService.addEditedPost(this.postInForm.id, this.postInForm).subscribe((data) => {
        this.postService.posts[ this.postInForm.id - 1 ] = data;
        this.form.resetForm();
      });
      return;
    }
  }
}
