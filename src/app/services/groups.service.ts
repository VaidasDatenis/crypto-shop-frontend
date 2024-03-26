import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../iterfaces/product.interface";
import { GroupDto } from "../iterfaces/group.interface";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private userId = this.authService.userId();

  createGroup(groupForm: GroupDto): Observable<GroupDto> {
    const payload = groupForm;
    return this.http.post<GroupDto>(`${this.apiUrl}/groups/${this.userId}/group`, payload);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/items`);
  }
}
