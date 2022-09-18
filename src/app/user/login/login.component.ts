import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppServices } from 'src/app/shared/AppServices.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  formModel={
    Email:'',
    Password:''
  }
  constructor(public service: AppServices,private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/home');
    }
  }
  onSubmit() {
    if (this.formModel.Email=='' || this.formModel.Password=='') {
      this.toastr.error('Please, Enter Email And Passowrd !','Login User');
      return
    }
    else {
      this.service.Login(this.formModel).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.success) {
            this.toastr.success(res.message,'Login User');
            localStorage.setItem('token',res.token);
            this.router.navigateByUrl('/home');
          }
          else {
            this.toastr.error(res.message,'Login User');
          }
        },
        error: (e) => {
          console.log(e);
          this.toastr.error(e.error.message,'Login User');
        },
        complete: () => console.info('complete')
      })
    }
  }
}
