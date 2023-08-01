import { PostsService } from './../../../services/posts.service';
import { Component, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PoNotificationService,
  PoRadioGroupOption,
} from '@po-ui/ng-components';
import { PoPageDynamicEditLiterals } from '@po-ui/ng-templates';
import { Post } from 'src/app/model/postModel';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent {
  @ViewChild('reactiveForm', { static: true })
  title: string = 'Cadastrar postagem';
  reactiveForm: any;
  idPost = this.route.snapshot.params['id'];
  action: string = '';

  readonly radioGroupOptions: Array<PoRadioGroupOption> = [
    { label: 'Sim', value: 'true' },
    { label: 'Não', value: 'false' },
  ];

  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private postForm: PostsService,
    public poNotification: PoNotificationService,
    private router: Router
  ) {
    this.createReactiveForm();
  }

  private setFormValue() {
    this.postForm.getPost(this.idPost).subscribe((post: Post) => {
      this.reactiveForm.get('title').setValue(post.title);
      this.reactiveForm.body = this.reactiveForm
        .get('body')
        .setValue(post.body);
      this.reactiveForm.active = this.reactiveForm
        .get('active')
        .setValue(post.active);
    });
  }

  createReactiveForm() {
    this.reactiveForm = this.fb.group({
      title: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ]),
      ],
      body: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      active: ['false', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    if (this.idPost) {
      this.setFormValue();
    }
  }

  saveForm() {
    this.postForm.createPost(this.reactiveForm.value).subscribe({
      next: () => {
        this.poNotification.success('Postagem cadastrado com Sucesso!');
        this.router.navigate(['/posts']);
      },
      error: (error: string) => {
        this.poNotification.success(`Error: ${error}`);
      },
    });
  }

  editPost() {
    this.postForm.updatePost(this.idPost, this.reactiveForm.value).subscribe({
      next: () => {
        this.poNotification.success('Editado com Sucesso!');
        this.router.navigate(['/posts']);
      },
      error: (error: string) => {
        this.poNotification.success(`Error: ${error}`);
      },
    });
  }

  back() {
    this.router.navigate(['posts']);
  }
}
