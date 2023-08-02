import { PostsService } from './posts.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

const mockData = {
  title: 'Test Post',
  body: 'This is a test post',
  active: 'false',
};

const postId = 2;

describe('PostsService', () => {
  let service: PostsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsService],
    });

    service = TestBed.inject(PostsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create post', () => {
    service.createPost(mockData).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(service.ApiRest);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockData);

    req.flush(mockData);
  });

  it('should update a post by ID', () => {
    service.updatePost(postId, mockData).subscribe((response) => {
      // Neste caso, o endpoint de PUT geralmente retorna a mesma resposta que foi enviada (o corpo atualizado).
      expect(response).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${service.ApiRest}/${postId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockData);

    req.flush(mockData);
  });

  it('should fetch a post by ID', () => {
    service.getPost(postId).subscribe((response) => {
      expect(response).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${service.ApiRest}/${postId}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockData);
  });
});
