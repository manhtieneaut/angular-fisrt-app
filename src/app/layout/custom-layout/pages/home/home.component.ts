import { Component, OnInit } from '@angular/core';
import { UserApiService, User } from '../../../../core/services/api/user-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  users: User[] = [];

  constructor(private userApi: UserApiService) { }

  ngOnInit() {
    this.userApi.getUsers().subscribe(response => {
      this.users = response.data;
    });
  }
}
