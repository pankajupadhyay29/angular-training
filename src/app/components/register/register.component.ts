import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, UserService} from '../../services/index';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  loading = false;
  model: any = {};
  departments: string[];
  role : string[];
  constructor(private router: Router, private alertService: AlertService, private userService: UserService) {
    this.departments = this.userService.department;
    this.role = this.userService.role;
  }

  register() {
    this.loading = true;
    this.userService.create(this.model)
      .subscribe(
        data => {
          console.log(data);
          this.alertService.success('Registration successful', true);
          this.router.navigate(['login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
        );
  }
}
