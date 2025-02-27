import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  private apiUrl = 'http://localhost:3000/actors';

  constructor(private http: HttpClient) {}

  getActors(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getActor(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
