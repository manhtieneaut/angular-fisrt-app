#!/bin/bash

# Thư mục gốc auth
mkdir -p auth/components/login
mkdir -p auth/services
mkdir -p auth/guards
mkdir -p auth/models

# Tạo file mẫu login.component.ts
cat > auth/components/login/login.component.ts <<EOL
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  auth = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  login(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    this.auth.login(email, password).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
      },
      error: () => alert('Login failed'),
    });
  }
}
EOL

# Tạo file login.component.html
cat > auth/components/login/login.component.html <<EOL
<form (submit)="login(\$event)">
  <input name="email" type="email" required placeholder="Email" />
  <input name="password" type="password" required placeholder="Password" />
  <button type="submit">Login</button>
</form>
EOL

# Tạo file login.component.css (empty)
touch auth/components/login/login.component.css

# Tạo file auth.service.ts
cat > auth/services/auth.service.ts <<EOL
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
  user\$ = this._user.asObservable();

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
EOL

# Tạo file auth.guard.ts
cat > auth/guards/auth.guard.ts <<EOL
import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};
EOL

# Tạo file user.model.ts mẫu
cat > auth/models/user.model.ts <<EOL
export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
}
EOL

echo "Auth module structure created successfully!"
