import { Component, OnInit } from '@angular/core';
import { TodoPostService } from './../../services/todo-post.service';
import { Post } from './../../interfaces/post.interface';
import { EditPostService } from './../../services/edit-post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {
  public posts: Post[] = []; // массив текущих постов
  public currentPost;
  public isActivePost;
  public isActiveComment;
  public currentComments;

  constructor(
    public postService: TodoPostService,
    public postEditService: EditPostService
  ) { }

  /**
   * ngOnInit -  стартавоя инициализация значений. Здесь мы подписываемся на получение массивов Post
   * в postService. При получении этого массива мы записываем его стартовое значение в нашу переменную this.posts
   * которую прописываем в HTML разметке.
   * Кроме того здесь мы подписывыаемся на событие которое происходит в postService при изменении значений массива Post: 
   * удаление - добавление в котором в нашу переменную this.posts записываем текущее значение получаемое из postService
   */
  ngOnInit() {
    this.postService.getExample().subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      },
      (err) => console.log(err),
      () => console.log('Complit')
    );
    this.postService.postObservableSubject.subscribe((data: Post[]) => {
      this.posts = data;
      }
    );
  }

  /**
   * deletePost - данный метод срабатывает при клике на кнопку DELETE 
   * в данном методе  мы вызываем метод deleteExample который находится в postService
   */
  deletePost(id) {
    this.postService.deleteExample(id);
  }

  /**
   * editPost - данный метод срабатывает при клике на кнопку Edit
   * в данном методе мы записываем в перменную currentPost postEditService - редактируемый Post
   * и вызываем метод editCurrentPost из postEditService
   */
  editPost(id) {
    this.currentPost = this.postService.posts.filter((post) => post.id === id);
    this.postEditService.currentPost = this.currentPost[0];
    this.postEditService.editCurrentPost();
    this.isActivePost = this.currentPost[0].id;
  }

  /**
   * cancelPost - данный метод срабатывает при клике на кнопку Cancel
   * в данном методе мы вызываем метод todoCancelt из postEditService
   */
  cancelPost(id) {
    this.postEditService.todoCancel();
    this.isActivePost = 0;
  }

  /**
   * getComment - данный метод срабатывает при клике на кнопку Comment
   * в данном методе мы подписываемся на получение комментариев из API 
   * и в наше перменную this.currentComments (которую затем выводим вч разметке) присваиваем получаемые комментарии
   */
  getComment(id) {
    this.postService.showComment(id).subscribe(
      (comments: Object[]) => {
      this.currentComments = comments.filter((comment, index) => index < 3);
      this.isActiveComment = id;
    },
    (err) => console.log(err),
    () => console.log('Complit')
    );
  }
}
