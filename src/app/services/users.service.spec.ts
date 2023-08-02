import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { User } from '../model/userModel';
import { PoTableColumn } from '@po-ui/ng-components';

const mockData: User = {
  name: 'loren',
  username: 'loren lore',
  birthdate: '21-07-2023',
  street: 'teste',
  genre: 'male',
  state: 'loren',
  email: 'loren@loren.com.br',
  phone: '5551998361005',
  website: '',
  suite: 'casa',
  city: 'Ivoti',
  zipcode: '93900000',
};

const userId = 2;

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });

    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve user list', () => {
    const searchTerm = 'loren';

    service.getUserList(searchTerm).subscribe((users) => {
      expect(users).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${service.ApiRest}?q=${searchTerm}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should retrieve an empty user list for empty search term', () => {
    const mockUsers: User[] = [];
    const searchTerm = '';

    service.getUserList(searchTerm).subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(service.ApiRest);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should create a new user', () => {
    service.createUser(mockData).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(service.ApiRest);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockData);

    req.flush(mockData);
  });

  it('should fetch a user by ID', () => {
    service.getUser(userId).subscribe((response) => {
      expect(response).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${service.ApiRest}/${userId}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockData);
  });

  it('should update a user by ID', () => {
    service.putUser(userId, mockData).subscribe((response) => {
      // Neste caso, o endpoint de PUT geralmente retorna a mesma resposta que foi enviada (o corpo atualizado).
      expect(response).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${service.ApiRest}/${userId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockData);

    req.flush(mockData);
  });

  it('should delete a user by ID', () => {
    service.deleteUser(userId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.ApiRest}/${userId}`);
    expect(req.request.method).toBe('DELETE');

    req.flush(mockData);
  });

  it('should return the correct columns', () => {
    const columns: PoTableColumn[] = service.getColumns();

    expect(columns.length).toBe(6);
  });
});
