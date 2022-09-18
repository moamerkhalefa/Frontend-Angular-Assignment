import { Component, OnInit } from '@angular/core';
import { AppServices } from 'src/app/shared/AppServices.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styles: [
  ]
})
export class RegisterationComponent implements OnInit {
  constructor(public service: AppServices, public fb: FormBuilder, private toastr: ToastrService, private router: Router) { }
  formModel = this.fb.group({
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    Username: ['', Validators.required],
    Email: ['', Validators.required],
    Password: ['', Validators.required]
  });
  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/home');
    }
    this.formModel.reset();
  }
  onSubmit() {
    if (this.formModel.invalid) {
      this.toastr.error('Please, Enter All Missed Data !', 'Create New User');
      return
    }
    else {
      var body={
        FirstName:this.formModel.value.FirstName,
        LastName:this.formModel.value.LastName,
        Username:this.formModel.value.Username,
        Email:this.formModel.value.Email,
        Password:this.formModel.value.Password,
      }
      this.service.register(body).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.success) {
            this.formModel.reset();
            this.toastr.success(res.message, 'Create New User');
            this.router.navigateByUrl('/user/login');
          }
          else {
            this.toastr.error(res.message, 'Create New User');
          }
        },
        error: (e) => {
          console.log(e);
          this.toastr.error(e.error.message, 'Create New User');
        },
        complete: () => console.info('complete')
      })
    }
  }
}
