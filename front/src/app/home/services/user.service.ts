import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GetUsersResponse } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(readonly http: HttpClient) { }

  getUsers() {
    return firstValueFrom(
      this.http.get<GetUsersResponse>('/api/users')
    )
  }

  getUser(id: string) {
    return firstValueFrom(
      this.http.get<GetUsersResponse>(`/api/users/${id}`)
    )
  }
}
