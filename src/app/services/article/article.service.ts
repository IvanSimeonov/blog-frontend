import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleCollection, Article } from '../../api/article';
import { Observable } from 'rxjs';
import { AbstractArticleService } from './abstract.article.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends AbstractArticleService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  public getArticles(): Observable<ArticleCollection> {
    return this.httpClient.get<ArticleCollection>("/api/v1/articles");
  }

  public getArticle(id: string): Observable<Article> {
    return this.httpClient.get<Article>(`/api/v1/articles/${id}`);
  }

  public createArticle(article: Article): Observable<Article> {
    return this.httpClient.post(`/api/v1/articles`, article) as Observable<Article>;
  }

  public editArticle(article: Article): Observable<Article> {
    return this.httpClient.put(`/api/v1/articles/${article.id}`, article) as Observable<Article>;
  }
}