import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-article-pagination',
  templateUrl: './article-pagination.component.html',
  styleUrls: ['./article-pagination.component.css']
})
export class ArticlePaginationComponent implements OnInit {


  @Input() currentPage: number;
  @Input() totalPages: number;
  @Output() pageRequested = new EventEmitter<number>();

  pages: Array<number>;

  constructor() { }

  ngOnInit() {
    this.pages = Array(this.totalPages).fill(1);
  }

  loadPage(pageNumber: number) {
    this.pageRequested.emit(pageNumber);
  }

}
