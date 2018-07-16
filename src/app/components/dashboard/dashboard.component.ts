import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { Ticket } from '../../models/ticket';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loginUser: User;
  users: User[] = [];
  tickets: Ticket;
  ticketlist: Ticket[] = [];

  constructor(private router: Router) {
    this.loginUser = JSON.parse(localStorage.getItem('loginUser'));
    this.ticketlist = JSON.parse(localStorage.getItem('tickets'));
    console.log(this.loginUser);
    console.log(this.ticketlist);
  }
  ngOnInit() {
    if(this.loginUser == null){
      this.router.navigate(['login']);
    }

    this.ticketlist = this.ticketlist.filter(tk => {
      return (tk.department === this.loginUser.department);
    });
  }

  createTicket(){
    this.router.navigate(['ticket']);
  }

}
