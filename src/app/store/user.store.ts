// src/app/core/stores/user.store.ts
import { Injectable, signal, computed } from '@angular/core';
import { UserApiService, User } from '../services/user-api.service';

@Injectable({ providedIn: 'root' })
export class UserStore {
  private readonly _users = signal<User[]>([]);
  private readonly _loading = signal<boolean>(false);

  readonly users = computed(() => this._users());
  readonly loading = computed(() => this._loading());

  constructor(private userApi: UserApiService) {}

  fetchUsers(page = 1, limit = 10) {
    this._loading.set(true);

    this.userApi.getUsers(page, limit).subscribe({
      next: res => {
        this._users.set(res.data);
        this._loading.set(false);
      },
      error: () => {
        this._users.set([]);
        this._loading.set(false);
      }
    });
  }
}
