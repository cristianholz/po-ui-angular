import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoNotificationService, PoTableAction } from '@po-ui/ng-components';
import { PoPageDynamicTableActions } from '@po-ui/ng-templates';
import { UsersService } from '../services/users.service';
import { User } from '../model/userModel';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  usersList: Array<User> = [];
  columnsTable: Array<any> = [];
  isLoading: boolean = false;
  inputSearchValue: string = '';

  actions: Array<PoTableAction> = [
    {
      action: this.updateSupplier.bind(this),
      icon: 'po-icon-edit',
      label: 'Editar',
    },
    {
      action: this.deleteSupplier.bind(this),
      icon: 'po-icon-delete',
      label: 'Excluir',
    },
  ];

  updateSupplier(row: User) {
    const { id } = row;
    this.router.navigate([`/users/edit/${id}`]);
  }

  deleteSupplier(row: User) {
    const { id } = row;
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.updateSupplierList();
        this.poNotification.success('Usuário excluido com sucesso');
      },
      error: (error) => this.poNotification.error(error),
    });
  }

  constructor(
    private userService: UsersService,
    private router: Router,
    private poNotification: PoNotificationService
  ) {}

  ngOnInit(): void {
    this.updateSupplierList();
    this.columnsTable = this.userService.getColumns();
  }

  updateSupplierList(): void {
    this.isLoading = true;
    this.userService
      .getUserList(this.inputSearchValue)
      .subscribe((response) => {
        this.usersList = response;
        this.isLoading = false;
      });
  }

  changeEvent(event: string) {
    this.inputSearchValue = event;
  }

  onClickSearchValue(): void {
    this.updateSupplierList();
  }
}
