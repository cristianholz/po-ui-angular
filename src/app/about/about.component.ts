import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PoBreadcrumb } from '@po-ui/ng-components';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  title = 'Cadastrar';
  idUser = this.route.snapshot.params['id'];

  constructor(private route: ActivatedRoute) {}

  pageBreadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Usuários' }],
  };

  ngOnInit(): void {
    if (this.idUser) {
      this.title = 'Alteração de Fornecedor';
    }
  }
}
