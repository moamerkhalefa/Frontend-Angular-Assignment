import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
import { AppServices } from 'src/app/shared/AppServices.service';
import { Employees } from 'src/app/shared/employees.model';

@Component({
  selector: 'app-newEmployee',
  templateUrl: './newEmployee.component.html',
  styles: [
  ]
})
export class newEmployee implements OnInit {

  constructor(public service: AppServices,private toastr:ToastrService,private router:Router) { }
  formData:Employees=new Employees();
  ngOnInit(): void {
    this.formData=Object.assign({}, this.service.editFormData);
    this.service.editFormData=new Employees();
  }
  onSubmitEmpData(form:NgForm){
    if(this.formData.employeeId==0){
      this.submitNewEmpData(form);
    }
    else if(this.formData.employeeId>0){
      this.submitEditEmpData(form);
    }
  }
  submitEditEmpData(form:NgForm){
    this.service.UpdateEmployee(this.formData).subscribe({
      next: (res: any) => {
        this.toastr.info('Employee Successfully Edit','Edit Employee');
        this.ResetEmpForm(form);
        this.router.navigateByUrl('/home/employees');
      },
      error: (e) => {
        console.log(e);
        this.toastr.error(e.error.message,'Login User');
      },
      complete: () => console.info('complete')
    });
  }
  submitNewEmpData(form:NgForm){
    this.service.AddEmployee(this.formData).subscribe({
      next: (res: any) => {
        this.toastr.success('Employee Successfully Added','Add Employee');
        this.ResetEmpForm(form);
        this.router.navigateByUrl('/home/employees');
      },
      error: (e) => {
        console.log(e);
        this.toastr.error(e.error.message,'Login User');
      },
      complete: () => console.info('complete')
    });
  }
  ResetEmpForm(form:NgForm){
    form.form.reset();
    this.formData=new Employees();
  }
}
