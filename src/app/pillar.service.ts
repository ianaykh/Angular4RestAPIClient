import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Pillar } from './pillar';

@Injectable()
export class PillarService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private pillarsUrl = "http://localhost:41437/api/values";
    
    constructor(private http: Http) { }

    getPillars(): Promise<Pillar[]> {
        return this.http.get(this.pillarsUrl)
            .toPromise()
            .then(response => response.json() as Pillar[])
            .catch(this.handleError);
    }

    getPillar(Id: number): Promise<Pillar> {
        const url = `${this.pillarsUrl}/${Id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Pillar)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }    
}

// export class PillarComponent implements OnInit {  
//     constructor(private _httpService: Http) { }
//     apiValues: string[] = []; 
//     ngOnInit() {  
//         this._httpService.get("http://localhost:41437/api/values").subscribe(values => {  
//             this.apiValues = values.json();  
//         });  
//     }  
//   }

