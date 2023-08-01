import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PoMenuItem } from '@po-ui/ng-components';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  pageTitle: string = environment.title;

  constructor(private router: Router) {}

  menus: Array<PoMenuItem> = [
    { label: 'Home', link: '/' },
    {
      label: 'Usuários',
      link: 'users',
      subItems: [
        { label: 'Listar usuários', link: 'users/list' },
        { label: 'Cadastrar usuários', link: 'users/create' },
      ],
    },
    { label: 'Posts', link: '/posts' },
  ];
}
