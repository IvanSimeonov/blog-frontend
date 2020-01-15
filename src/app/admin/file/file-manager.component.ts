import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { BlogFile, BlogFileCollection } from './../../api/blog-file';
import { ActivatedRoute } from '@angular/router';
import { AbstractFileService } from './../../services/file/abstract.file.service';
import { Subscription } from 'rxjs';
import { FilePage } from '../../api/file-page';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit , OnDestroy {
  @Input() selectable = false;

  blogFiles: Array<BlogFile>;
  id: string;
  subscriptions: Array<Subscription> = [];
  idToDelete: number;
  timer: number;
  // tslint:disable-next-line: comment-format
  //blogFilePage: FilePage;
  // blogFile: BlogFile;
  currentPage = 0;
  totalPages = 0;



  constructor(private activatedRoute: ActivatedRoute, private fileService: AbstractFileService) {
    console.log('TEST');
   }

  ngOnInit() {



    // this.subscriptions.push(this.fileService.getFiles().subscribe(blogFile => {
    //   this.blogFile = this.blogFile;
    // }));

    this.subscriptions.push(
      this.activatedRoute.data.subscribe(data  => {
        if (data.filePage) {
          const page = data.filePage as FilePage;
          this.blogFiles = page.blogFiles;
          this.currentPage = page.pageNumber;
          this.totalPages = page.totalPages;
        }
      })
    );


    this.fileService.getFileUploaded$().subscribe(newFile => {
      this.blogFiles.unshift(newFile);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  selectItem(file: BlogFile) {
    this.fileService.selectFile(this.id, file);
  }

  onTrashClick(id: string) {
    this.idToDelete = +id;
    this.timer = window.setTimeout(() => {
      this.disableTimer();
    }, 2000);
  }

  private disableTimer() {
    this.idToDelete = null;
    window.clearTimeout(this.timer);
    this.timer = null;
  }

  deleteFile(file: BlogFile) {
    this.fileService.deleteFile(file).subscribe(status => {
      // this.disableTimer();
      if (status) {
        console.log('FILE DELETED', file);
        let indexToDelete = -1;
        this.blogFiles.find((value: BlogFile, index: number) => {
          if (value.id === file.id) {
            indexToDelete = index;
            return true;
          }
          return false;
        });

        if (indexToDelete > -1) {
          console.log('BEFORE DELETE', this.blogFiles);
          this.blogFiles.splice(indexToDelete, 1);
          console.log('AFTER DELETE', this.blogFiles);
        }
      }
    });
  }

  onClickPage(page: number) {
    this.fileService.getFilePage(page).subscribe(blogFilePage => {
      this.blogFiles = blogFilePage.blogFiles;
      this.currentPage = blogFilePage.pageNumber;
    });
  }
}
