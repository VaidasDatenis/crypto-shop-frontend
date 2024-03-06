import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient);

  connect(data: { walletAddress: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/connect`, data);
  }
}
