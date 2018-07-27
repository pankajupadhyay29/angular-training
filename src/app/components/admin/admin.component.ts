import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {Ticket} from '../../models/ticket';
import {AlertService, UserService} from '../../services';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  admin: any = {};
  tickets: Ticket;
  ticketlist: Ticket[] = [];
  loginUser: string;
  departments: string[];

  constructor(private titleService: Title,  private userService: UserService, private alertService: AlertService, private router: Router) {
    this.ticketlist = JSON.parse(localStorage.getItem('tickets'));
    this.loginUser = JSON.parse(localStorage.getItem('loginUser'));
    this.departments = this.userService.department;
  }

  searchTicket() {
    if (this.admin.department !== '0') {
      this.ticketlist = JSON.parse(localStorage.getItem('tickets')).filter((val: any) => {
        return (val.department === this.admin.department);
      });
    } else {
      this.ticketlist = JSON.parse(localStorage.getItem('tickets'));
    }
  }

  ngOnInit() {
    this.titleService.setTitle('Bug Tracker | Admin');
    if (this.loginUser == null) {
      this.router.navigate(['login']);
    }
  }

  delete(id: number) {
    this.userService.deleteTicket(id).subscribe(() => {
      this.ticketlist = JSON.parse(localStorage.getItem('tickets'));
      this.alertService.success('Ticket delete successful', true);
    });
  }


}
