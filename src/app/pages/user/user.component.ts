import { Component, inject } from '@angular/core';
import { UserStateService } from '../../services/user.service';
import { NgFor,NgIf } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [
    NgFor,
    NgIf

  ],
 templateUrl: './user.component.html'
})
export class UserComponent {
  userState = inject(UserStateService);
}
