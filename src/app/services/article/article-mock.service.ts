import { AbstractArticleService } from './abstract.article.service';
import { Article, ArticleCollection } from '../../api/article';
import { ArticlePage } from '../../api/article-page';
import { ArticleInfo } from '../../api/article-info';
import { Observable, of } from 'rxjs';

export class ArticleMockService extends AbstractArticleService {

    getRandomFeaturedArticle(): Observable<Article> {
        throw new Error('Method not implemented.');
    }
    getArticlePage(pageNumber: number): Observable<ArticlePage> {
        throw new Error('Method not implemented.');
    }

    deleteArticle(article: Article): Observable<boolean> {
        throw new Error('Method not implemented.');
    }

    constructor(private articleCollection: ArticleCollection) {
        super();
    }

    getArticles(): Observable<ArticleCollection> {
        return of(this.articleCollection);
    }

    getCompleteArticles(): Observable<ArticleCollection> {
        throw new Error('Method not implemented.');
    }

    getArticle(id: string): Observable<Article> {
        return of(this.findArticleInCollection(id));
    }

    createArticle(article: Article): Observable<Article> {
        throw new Error('Method not implemented.');
    }

    editArticle(article: Article): Observable<Article> {
        throw new Error('Method not implemented.');
    }

    public getArticleInfo(): Observable<ArticleInfo> {
        // for now just an empty articleinfo object
        return of(new ArticleInfo());
    }

    private findArticleInCollection(id: string): Article {
        return this.articleCollection.articles.find((article) => article.id === id);
    }
}
