import { Injectable } from '@angular/core';
import { AbstractFileService } from './abstract.file.service';
import { BlogFile, BlogFileCollection } from "../../api/blog-file";
import { Observable, Subject, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { FileUploadError, FileUploadProgress } from '../../http/file-upload';

@Injectable({
  providedIn: 'root'
})
export class FileService extends AbstractFileService {

  private fileUploaded: Subject<BlogFile> = new Subject();
  private fileUploaded$ = this.fileUploaded.asObservable();

  private fileUploadProgress: Subject<FileUploadProgress> = new Subject();
  private fileUploadProgress$ = this.fileUploadProgress.asObservable();

  private fileUploadError: Subject<FileUploadError> = new Subject();
  private fileUploadError$ = this.fileUploadError.asObservable();

  getFileUploadError$(): Observable<FileUploadError> {
    return this.fileUploadError$;
  }

  getFileUploaded$(): Observable<BlogFile> {
    return this.fileUploaded$;
  }

  getFileUploadProgress$(): Observable<FileUploadProgress> {
    return this.fileUploadProgress$;
  }

  constructor(private httpClient: HttpClient) {
    super();
  }
  
  getFiles(): Observable<BlogFileCollection> {
    return this.httpClient.get("/api/v1/files") as Observable<BlogFileCollection>;
  }
  
  getFile(id: number): Observable<BlogFile> {
    throw this.httpClient.get(`/api/v1/files/${id}`) as Observable<BlogFile>;
  }
  
  uploadFile(file: File) {
    const fd = new FormData();
    fd.append('file', file, file.name);
    this.httpClient.post('/api/v1/files', fd, {reportProgress: true, observe: 'events'})
    .pipe(catchError(err => {
      return this.handleFileUploadError(err, file)
    }))
    .subscribe((event: HttpEvent<any>) => {
      event
      //console.log('DEFINING UPLOAD ');
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Upload started!');
          break;
        case HttpEventType.Response:
          const blogFile = event.body as BlogFile;
          this.fileUploaded.next(blogFile);
          break;
        case HttpEventType.UploadProgress: {
          const fileUploadProgress = new FileUploadProgress();
          fileUploadProgress.file = file;
          fileUploadProgress.percentLoaded = event['loaded'] / event['total'];
          this.fileUploadProgress.next(fileUploadProgress);
          break;
        }
      }
    });
  }

  private handleFileUploadError(error: HttpErrorResponse, file: File) {
    const uploadError = new FileUploadError();
    uploadError.file = file;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      uploadError.message = 'An error occured: ' + error.error.message;
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      uploadError.status = error.status;
      uploadError.message = error.message;
    }

    this.fileUploadError.next(uploadError);

    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
  
  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name}" of size ${file.size}.`;
  
      case HttpEventType.UploadProgress:
        // Compute and show the % done:
        const percentDone = Math.round(100 * event.loaded / event.total);
        return `File "${file.name}" is ${percentDone}% uploaded.`;
  
      case HttpEventType.Response:
        return `File "${file.name}" was completely uploaded!`;
  
      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }
}
