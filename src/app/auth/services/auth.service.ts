import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, tap, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private _tokenKey = 'auth_token';

  private _user = new BehaviorSubject<any>(null);
  user$ = this._user.asObservable();

  constructor() {
    if (this.isBrowser) {
      const token = localStorage.getItem(this._tokenKey);
      if (token) {
        const user = localStorage.getItem('auth_user');
        if (user) {
          this._user.next(JSON.parse(user));
        }
      }
    }
  }
  login(email: string, password: string) {
    return this.http.get<any[]>(`http://localhost:3000/users`).pipe(
      map(users => {
        const found = users.find(user => user.email === email && user.password === password);
        if (!found) {
          throw new Error('Email hoặc mật khẩu không đúng');
        }
        return {
          token: 'fake-jwt-token',
          user: found
        };
      }),
      tap(res => {
        localStorage.setItem(this._tokenKey, res.token);
        localStorage.setItem('auth_user', JSON.stringify(res.user));
        this._user.next(res.user);
      })
    );
  }



  logout() {
    if (this.isBrowser) {
      localStorage.removeItem(this._tokenKey);
      localStorage.removeItem('auth_user');
    }
    this._user.next(null);
  }

  getToken() {
    return this.isBrowser ? localStorage.getItem(this._tokenKey) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
