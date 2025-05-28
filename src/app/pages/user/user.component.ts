import { Component, inject } from '@angular/core';
import { NgIf} from '@angular/common';
import { UserStateService } from '../../services/user.service';

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  imports: [
    NgIf,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ]
})
export class UserComponent {
  userState = inject(UserStateService);

  addUser(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formElements = form.elements as any;

    const newUser = {
      email: formElements['email'].value,
      username: formElements['username'].value,
      name: {
        firstname: formElements['firstname'].value,
        lastname: formElements['lastname'].value
      },
      address: {
        street: formElements['street'].value,
        city: formElements['city'].value,
        zipcode: formElements['zipcode'].value,
        country: formElements['country'].value
      },
      phone: formElements['phone'].value,
      orders: []
    };

    this.userState.addUser(newUser).subscribe(() => {
      form.reset();
    });
  }
}
