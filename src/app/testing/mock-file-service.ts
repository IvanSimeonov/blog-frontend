import { AbstractFileService } from '../services/file/abstract.file.service';
import { BlogFile, BlogFileCollection } from './../api/blog-file';
import { of, Observable } from 'rxjs';
import { FileUploadProgress, FileUploadError } from '../http/file-upload';
import { FilePage } from '../api/file-page';
export class MockFileService extends AbstractFileService {



    private fileCollection: BlogFileCollection;

    constructor(collection: BlogFileCollection) {
        super();

        if (!collection) {
            collection = new BlogFileCollection();
        }

        if (!collection.blogFiles) {
            const dummyFile = new BlogFile();
            dummyFile.id = 4;
            dummyFile.name = 'TEST';
            dummyFile.contentType = 'text/plain';
            dummyFile.size = 12312;
            collection.blogFiles = [dummyFile];
        }
        this.fileCollection = collection;
    }

    getFilePage(pageNumber: number): Observable<FilePage> {
        throw new Error('Method not implemented.');
    }

    getFiles(): Observable<BlogFileCollection> {
        throw new Error('Method not implemented.');
    }
    getFile(id: number): Observable<BlogFile> {
        throw new Error('Method not implemented.');
    }
    uploadFile(file: File): void {
        throw new Error('Method not implemented.');
    }

    selectFile(id: string, blogFile: BlogFile): void {
        throw new Error('Method not implemented.');
    }

    deleteFile(blogFile: BlogFile): Observable<any> {
        return of({});
    }

    getFileUploaded$(): Observable<BlogFile> {
        return of(new BlogFile());
    }

    getFileUploadProgress$(): Observable<FileUploadProgress> {
        return null;
    }

    getFileUploadError$(): Observable<FileUploadError> {
        return null;
    }

    getFileSelected$(): Observable<{id: string, file: BlogFile}>  {
        return null;
    }

    getShowHideFileManager$(): Observable<{id: string, status: boolean}> {
        return of({id: 'TEST', status: true});
    }

    showFileManager(id: string): void {
        return;
    }
    hideFileManager(id: string): void {
        return;
    }








}
