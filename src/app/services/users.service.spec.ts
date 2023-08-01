import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { User } from '../model/userModel';

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
    const mockUsers = [
      {
        id: 1,
        name: 'John',
        username: 'Doe',
        email: 'john@example.com',
        phone: '123456789',
        birthdate: '1990-01-01',
      },
    ];
    const searchTerm = 'John';

    service.getUserList(searchTerm).subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(`${service.ApiRest}?q=${searchTerm}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
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
});
