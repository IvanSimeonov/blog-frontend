import { Component, OnInit } from '@angular/core';
import { Observable, of, fromEvent, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, filter, reduce, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ArticlePage } from './../../api/article-page';
import { ArticleService } from './../../services/article/article.service';

@Component({
  selector: 'app-rxjs-demo',
  templateUrl: './rxjs-demo.component.html',
  styleUrls: ['./rxjs-demo.component.css']
})
export class RxjsDemoComponent implements OnInit {


  ints$: Observable<number> = of(1, 2, 3, 4, 5);


  pagesSubject: Subject<number> = new Subject();
  behaviorSubject: BehaviorSubject<number> = new BehaviorSubject(null);
  replaySject: ReplaySubject<number> = new ReplaySubject();

  pagesHistory: Array<number> = [];
  pagesHistory2: Array<number> = [];


  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.ints$.pipe(
      filter(value => value > 2),
      reduce((acc, single) => acc + single, 0),
    ).subscribe((value: number) => {
      console.log('FILTERED VALUE: ' + value);
    });


    this.pagesSubject.subscribe((requestedPage: number) => {
      this.pagesHistory.push(requestedPage);
    });

    const searchBox = document.getElementById('search-box');

    const typeahead = fromEvent(searchBox, 'input').pipe(
    map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
    //filter(text => text.length > 2),
    filter(text => text.length === 1),
    debounceTime(2000),
    distinctUntilChanged(),
    switchMap((value: string) => {
      this.pagesSubject.next(+value);
      this.behaviorSubject.next(+value);
      this.replaySject.next(+value);
      return this.articleService.getArticlePage(+value);
    })
  );

    typeahead.subscribe((articlePage: ArticlePage) =>{ console.log(articlePage)});

  }

  addAnotherSimpleSubscription() {
    this.replaySject.subscribe((requestedPage: number) => {
      this.pagesHistory2.push(requestedPage);
    });
  }

  

}
