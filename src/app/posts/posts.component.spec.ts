import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsComponent } from './posts.component';
import {
  PoPageDynamicTableActions,
  PoPageDynamicTableField,
  PoTemplatesModule,
} from '@po-ui/ng-templates';
import { environment } from 'src/environments/environment';
import { PoDynamicModule, PoModalModule, PoModule } from '@po-ui/ng-components';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PoModalModule,
        HttpClientTestingModule,
        PoDynamicModule,
        PoModule,
      ],
      declarations: [PostsComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set apiUrl to the correct value from environment', () => {
    expect(component.apiUrl).toEqual(`${environment.apiURL}/posts`);
  });

  it('should have the correct fieldsColumn array', () => {
    const expectedFields: PoPageDynamicTableField[] = [
      { property: 'id', visible: false },
      { property: 'title', label: 'Titulo' },
      { property: 'body', label: 'Descrição' },
      { property: 'active', label: 'Publicado' },
    ];

    expect(component.fieldsColumn).toEqual(expectedFields);
  });

  it('should have the correct actions object', () => {
    const expectedActions: PoPageDynamicTableActions = {
      new: '/posts/create',
      remove: true,
      removeAll: false,
    };

    expect(component.actions).toEqual(expectedActions);
  });
});
