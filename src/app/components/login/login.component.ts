import { Component, OnInit,  } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute} from '@angular/router';

import { AlertService} from '../../services/alert.service';
import { AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  heading: string = 'Login';
  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {}

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          let redirect = (data.role === 'Admin') ? 'admin' : 'dashboard';
          this.router.navigate([redirect]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
  ngOnInit() {
    this.titleService.setTitle('Bug Tracker | My awesome app');
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
}
