import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PoBreadcrumb,
  PoDynamicFormField,
  PoNotificationService,
} from '@po-ui/ng-components';
import { User } from 'src/app/model/userModel';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent {
  userValues: User = {
    name: '',
    username: '',
    birthdate: '',
    genre: '',
    email: '',
    street: '',
    suite: '',
    city: '',
    state: '',
    zipcode: '',
    phone: '',
    website: '',
  };

  @Input() idUser = this.route.snapshot.params['id'];

  constructor(
    public poNotification: PoNotificationService,
    private route: ActivatedRoute,
    private userFormService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.idUser) {
      this.setFormValue();
    }
  }

  private setFormValue() {
    this.userFormService.getUser(this.idUser).subscribe((user: User) => {
      this.userValues.name = user.name;
      this.userValues.username = user.username;
      this.userValues.email = user.email;
      this.userValues.birthdate = user.birthdate;
      this.userValues.genre = user.genre;
      this.userValues.state = user.state;
      this.userValues.street = user.street;
      this.userValues.suite = user.suite;
      this.userValues.city = '2';
      this.userValues.zipcode = user.zipcode;
      this.userValues.phone = user.phone;
      this.userValues.website = user.website;
    });
  }

  fields: Array<PoDynamicFormField> = [
    {
      property: 'name',
      label: 'Nome',
      divider: 'Dados Pessoais',
      required: true,
      gridColumns: 6,
      gridSmColumns: 12,
    },
    {
      property: 'username',
      label: 'Sobrenome',
      gridColumns: 6,
      gridSmColumns: 12,
    },
    {
      property: 'genre',
      label: 'Genêro',
      gridColumns: 6,
      gridSmColumns: 12,
      options: [
        { label: 'Feminino', value: 'male' },
        { label: 'Masculino', value: 'homen' },
      ],
    },
    {
      property: 'birthdate',
      label: 'Data de nascimento',
      type: 'date',
      gridColumns: 6,
      gridSmColumns: 12,
    },
    {
      property: 'email',
      label: 'E-mail',
      type: 'email',
      gridColumns: 6,
      gridSmColumns: 12,
      required: true,
    },
    {
      property: 'street',
      label: 'Rua',
      gridColumns: 6,
      gridSmColumns: 12,
      divider: 'Endereço',
    },
    {
      property: 'suite',
      label: 'Logadouro',
      gridColumns: 6,
      gridSmColumns: 12,
    },
    {
      property: 'state',
      label: 'Cidade',
      gridColumns: 6,
      gridSmColumns: 12,
      options: [
        { state: 'Ivoti', code: 1 },
        { state: 'Dois Irmãos', code: 2 },
        { state: 'Novo Hamburgo', code: 3 },
        { state: 'Minas Gerais', code: 4 },
        { state: 'São Paulo', code: 5 },
      ],
      fieldLabel: 'state',
      fieldValue: 'code',
    },
    {
      property: 'zipcode',
      label: 'CEP',
      gridColumns: 6,
      gridSmColumns: 12,
      mask: '99999-999',
    },
    {
      divider: 'Contato',
      property: 'phone',
      label: 'Telefone',
      gridColumns: 6,
      gridSmColumns: 12,
      mask: '(99) 9 9999.9999',
    },
    {
      property: 'website',
      label: 'Site',
      gridColumns: 6,
      gridSmColumns: 12,
    },
  ];

  insertUser(): void {
    this.userFormService.createUser(this.userValues).subscribe({
      next: () => {
        this.poNotification.success('Usúario cadastrado com Sucesso!');
        this.router.navigate(['/users/list']);
      },
      error: (error: string) => {
        this.poNotification.success(`Error: ${error}`);
      },
    });
  }

  saveUser() {
    this.insertUser();
  }

  updateUser(): void {
    this.userFormService.putUser(this.idUser, this.userValues).subscribe({
      next: () => {
        this.poNotification.success('Usúario editado com Sucesso!');
        this.router.navigate(['/users/list']);
      },
      error: (error: string) => {
        this.poNotification.success(`Error: ${error}`);
      },
    });
  }
}
