import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from '../model/postModel';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  ApiRest = `${environment.apiURL}/posts`;

  constructor(private http: HttpClient) {}

  createPost(body: Post) {
    return this.http.post<Post>(this.ApiRest, body);
  }

  updatePost(PostId: number, body: Post) {
    return this.http.put(`${this.ApiRest}/${PostId}`, body);
  }

  getPost(PostId: number) {
    return this.http.get<Post>(`${this.ApiRest}/${PostId}`);
  }
}
