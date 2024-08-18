import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class TranslationService {

  private apiSaveTranslation = 'http://localhost:5000/api/save_translation';
  private apiTranslate = 'http://localhost:5000/api/translate';
  private apiGetTranslation = 'http://localhost:5000/api/get_translation';

  constructor(private http: HttpClient) { }

  translate(text: string, field: string): Observable<any> {
    return this.http.post<any>(this.apiTranslate, { text, field });
  }

  get_translation(field: string): Observable<any> {
    const params = new HttpParams().set('field', field);
    return this.http.get<any>(this.apiGetTranslation, { params });
  }

  save_translation(field: string, text: string, translation: string){
    return this.http.put<any>(this.apiSaveTranslation, 
      {
        "field": field,
        "English Text": text,
        "Translation": translation
      }
    )
  }
  
}
