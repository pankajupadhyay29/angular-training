import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertService, UserService} from '../../services/index';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  loading = false;
  ticket: any = {};
  loginUser: string[];
  departments: string[];
  constructor(private titleService: Title,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private alertService: AlertService,
              private userService: UserService) {
    this.loginUser = JSON.parse(localStorage.getItem('loginUser'));
    this.departments = this.userService.department;
  }

  createTicket() {
    this.loading = true;
    if (!this.ticket.id) {
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
    } else {
      console.log(this.ticket);
      this.userService.updateTicket(this.ticket)
        .subscribe(
          data => {
            console.log(data);
            this.alertService.success('Ticket has been updated successful', true);
            this.router.navigate(['dashboard']);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          }
        );
    }
  }

  ngOnInit() {
    this.titleService.setTitle('Bug Tracker | Ticket');
    if (this.loginUser == null) {
      this.router.navigate(['login']);
    }

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params.id > 0) {
        const ticketDetails = JSON.parse(localStorage.getItem('tickets')).filter((tk:any) => {
          return (tk.id == params.id);
        });
        this.ticket = ticketDetails[0];
      }
    });
  }

}
