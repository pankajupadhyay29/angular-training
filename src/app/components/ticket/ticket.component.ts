import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, UserService} from '../../services/index';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  loading = false;
  ticket: any = {};
  constructor(private router: Router, private alertService: AlertService, private userService: UserService) {
    this.loginUser = JSON.parse(localStorage.getItem('loginUser'));
    this.departments = ['HR', 'Admin', 'It', 'L&D'];
  }

  createTicket(){
    this.loading = true;
    this.userService.createTicket(this.ticket)
      .subscribe(
        data => {
          console.log(data);
          this.alertService.success('Ticket has been created successful', true);
          this.router.navigate(['dashboard']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

  ngOnInit() {
    if(this.loginUser == null){
      this.router.navigate(['login']);
    }
  }
}
