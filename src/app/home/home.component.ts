import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppServices } from '../shared/AppServices.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  logeduserData: any;
  constructor(private toastr:ToastrService,private router:Router,private service: AppServices) { }
  MenuStatus: boolean = false;
  ngOnInit(): void {
    this.MenuStatus = false;
    this.service.GetUserProfile().subscribe({
      next: (res: any) => {
        this.logeduserData = res;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => console.info('complete')
    })
  }
  onClickMenu() {
    this.MenuStatus = !this.MenuStatus;
    if (this.MenuStatus) {
      document.body.classList.add(
        'sidebar-is-reduced',
        'sidebar-is-expanded'
      );
    }
    else {
      document.body.classList.remove(
        'sidebar-is-reduced',
        'sidebar-is-expanded'
      );
    }
  }
  onClickLogout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/user/login');
    this.toastr.success('User Loged out','Logout User');
  }
}
