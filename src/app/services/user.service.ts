import { Injectable, signal, computed, effect } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, PaginatedResponse } from '../types';

@Injectable({ providedIn: 'root' })
export class UserStateService {
  private http = inject(HttpClient);

  // ✅ STATE
  private users = signal<User[]>([]);
  private loading = signal(false);
  private page = signal(1);
  private limit = signal(10);

  // ✅ COMPUTED STATE
  readonly totalUsers = computed(() => this.users().length);
  readonly isLoading = computed(() => this.loading());

  // ✅ PUBLIC READ
  readonly users$ = this.users.asReadonly();

  // ✅ EFFECT (nếu muốn auto-fetch khi page/limit thay đổi)
  constructor() {
    effect(() => {
      this.fetchUsers(this.page(), this.limit());
    });
  }

  // ✅ ACTION
  fetchUsers(page = 1, limit = 10) {
    this.loading.set(true);
    this.http.get<PaginatedResponse<User>>('https://fakeapi.net/users', {
      params: { page, limit }
    }).subscribe({
      next: (res) => {
        this.users.set(res.data);
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
}
