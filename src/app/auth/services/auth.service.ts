import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

interface LoginResponse {
  token: string;
  user: any;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  private _user = new BehaviorSubject<any>(null);
  user$ = this._user.asObservable();

  private _tokenKey = 'auth_token';

  constructor() {
    const token = localStorage.getItem(this._tokenKey);
    if (token) {
      // TODO: decode token to get user info
      this._user.next({});
    }
  }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>('/api/login', { email, password }).pipe(
      tap(res => {
        localStorage.setItem(this._tokenKey, res.token);
        this._user.next(res.user);
      })
    );
  }

  logout() {
    localStorage.removeItem(this._tokenKey);
    this._user.next(null);
  }

  getToken() {
    return localStorage.getItem(this._tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
