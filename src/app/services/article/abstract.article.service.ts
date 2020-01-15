import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleCollection, Article } from '../../api/article';
import { ArticleInfo } from '../../api/article-info';
import { ArticlePage } from '../../api/article-page';

/**
 * Abstract class for article services
 *
 * Defines the necessary functions all article services shall adhere to
 */
@Injectable()
export abstract class AbstractArticleService {
    abstract getArticles(): Observable<ArticleCollection>;
    abstract getCompleteArticles(): Observable<ArticleCollection>;
    abstract getArticle(id: string): Observable<Article>;
    abstract createArticle(article: Article): Observable<Article>;
    abstract editArticle(article: Article): Observable<Article>;
    abstract getArticleInfo(): Observable<ArticleInfo>;
    abstract deleteArticle(article: Article): Observable<boolean>;
    abstract getArticlePage(pageNumber: number): Observable<ArticlePage>;
    abstract getRandomFeaturedArticle(): Observable<Article>;
}
