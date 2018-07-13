import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import {Ticket} from '../../models/ticket';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  admin: any = {};
  tickets: Ticket;
  ticketlist: Ticket[] = [];


  constructor(private router: Router) {
    this.ticketlist = JSON.parse(localStorage.getItem('tickets'));
    this.loginUser = JSON.parse(localStorage.getItem('loginUser'));
    this.departments = ['HR', 'Admin', 'It', 'L&D'];
  }
  searchTicket(){
    this.ticketlist = this.ticketlist.filter(val => {
      return (val.department === this.admin.department);
    });
  }

  ngOnInit() {
    if(this.loginUser == null){
      this.router.navigate(['login']);
    }
  }


}
