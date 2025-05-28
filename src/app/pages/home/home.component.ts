import { Component, OnInit } from '@angular/core';
import { UserStore } from '../../store/user.store';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
   users!: typeof this.userStore.users;
  loading!: typeof this.userStore.loading;

  constructor(private userStore: UserStore) {
    this.users = this.userStore.users;
    this.loading = this.userStore.loading;
  }

  ngOnInit() {
    this.userStore.fetchUsers();
  }
}
