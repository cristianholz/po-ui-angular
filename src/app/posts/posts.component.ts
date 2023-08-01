import { Component } from '@angular/core';
import {
  PoPageDynamicTableActions,
  PoPageDynamicTableField,
} from '@po-ui/ng-templates';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent {
  apiUrl: string = `${environment.apiURL}/posts`;

  fieldsColumn: Array<PoPageDynamicTableField> = [
    { property: 'id', visible: false },
    { property: 'title', label: 'Titulo' },
    { property: 'body', label: 'Descrição' },
    { property: 'active', label: 'Publicado' },
  ];

  readonly actions: PoPageDynamicTableActions = {
    new: '/posts/create',
    remove: true,
    removeAll: false,
  };
}
