import { Injectable, signal, computed, effect } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../types';
import { tap, catchError } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class UserStateService {
  private http = inject(HttpClient);

  private users = signal<User[]>([]);
  private loading = signal(false);
  private page = signal(1);
  private limit = signal(10);

  readonly totalUsers = computed(() => this.users().length);
  readonly isLoading = computed(() => this.loading());
  readonly users$ = this.users.asReadonly();

  constructor() {
    effect(() => {
      this.fetchUsers(this.page(), this.limit());
    });
  }

  fetchUsers(page = 1, limit = 10) {
    this.loading.set(true);

    this.http.get<User[]>('http://localhost:3000/users').subscribe({
      next: (allUsers) => {
        const start = (page - 1) * limit;
        const pagedUsers = allUsers.slice(start, start + limit);

        this.users.set(pagedUsers);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  setPage(p: number) {
    this.page.set(p);
  }

  setLimit(l: number) {
    this.limit.set(l);
  }

  // Thêm user mới (POST)
  addUser(user: Omit<User, 'id'>) {
    this.loading.set(true);

    return this.http.post<User>('http://localhost:3000/users', user).pipe(
      tap((newUser) => {
        // Cập nhật signal users (thêm vào cuối)
        this.users.update(users => [...users, newUser]);
        this.loading.set(false);
      }),
      catchError(err => {
        this.loading.set(false);
        throw err;
      })
    );
  }

  // Xóa user theo id (DELETE)
  deleteUser(id: number) {
    this.loading.set(true);

    return this.http.delete<void>(`http://localhost:3000/users/${id}`).pipe(
      tap(() => {
        // Cập nhật signal users (lọc bỏ user bị xóa)
        this.users.update(users => users.filter(u => u.id !== id));
        this.loading.set(false);
      }),
      catchError(err => {
        this.loading.set(false);
        throw err;
      })
    );
  }
}
