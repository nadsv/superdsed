import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


import { File } from './file';
import { Executant } from './executant';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SedApiService {
    apiUrl: string;
    dataUrl: string;
    id: number;
    mainDocs: any[];
    sections: any[];
    links: any[];
    users: any[];
    executors: any[];
    changes: any[]; 
    urlDoc: string;
    urlAddDoc: string;
    urlGetDoc: string;
    urlDelDoc: string;
    urlGetLists: string;
    urlMainDocs: string;
    urlGetUsers: string;
    

    constructor(private http: Http) {
        this.apiUrl = '/supersed/api/';
        this.dataUrl = '/supersed/data/';
        this.urlDoc = 'doc.php';
        this.urlAddDoc = 'add-doc.php';
        this.urlGetDoc = 'get-doc.php';
        this.urlDelDoc = 'del-doc.php';
        this.urlGetLists = 'lists.php';
        this.urlGetUsers = 'users.php';
        this.urlMainDocs = 'main-docs.php';
        this.changes = [];
        this.links = [];
        this.users = [];
    }

    fetchData(url: string): Observable<any> {
        return this.http.get(url)
                    .map(response => response.json())
                    .catch(this.handleError);
    }

    fetchText(url: string): Observable<any> {
        return this.http.get(url)
                    .catch(this.handleError);
    }

    changeData(url: string, item?: any): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, item, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
