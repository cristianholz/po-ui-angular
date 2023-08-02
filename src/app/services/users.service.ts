import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { User } from '../model/userModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  ApiRest = `${environment.apiURL}/users`;

  constructor(private http: HttpClient) {}

  createUser(body: User) {
    return this.http.post<User>(this.ApiRest, body);
  }

  getUser(UserId: number) {
    return this.http.get<User>(`${this.ApiRest}/${UserId}`);
  }

  putUser(UserId: number, body: User) {
    return this.http.put<User>(`${this.ApiRest}/${UserId}`, body);
  }

  getUserList(term: string): Observable<any> {
    term = term.trim() || '';

    // Add safe, URL encoded search parameter if there is a search term
    const params = term ? { params: new HttpParams().set('q', term) } : {};

    return this.http.get(this.ApiRest, params);
  }

  deleteUser(UserId?: number) {
    return this.http.delete(`${this.ApiRest}/${UserId}`);
  }

  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'id', label: 'id', visible: false },
      { property: 'name', label: 'Nome' },
      { property: 'username', label: 'Sobrenome' },
      { property: 'email', label: 'E-mail' },
      { property: 'phone', label: 'Telefone', visible: true },
      { property: 'birthdate', label: 'Nascimento', type: 'date' },
    ];
  }
}
