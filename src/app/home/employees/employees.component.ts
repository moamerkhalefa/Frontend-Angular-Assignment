import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppServices } from 'src/app/shared/AppServices.service';
import { Employees } from 'src/app/shared/employees.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styles: [
  ]
})
export class EmployeesComponent implements OnInit {
  Emplist: Employees[] = [];
  constructor(public service: AppServices, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.GetEmployees().subscribe({
      next: (res: any) => {
        this.Emplist = res;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => console.info('complete')
    });
  }
  onEditEmployee(EmpObj: Employees): void {
    this.service.editFormData = Object.assign({}, EmpObj);
    this.router.navigateByUrl('/home/newEmployee');
  }
  onDeleteEmployee(id: number) {
    if (confirm('Are you sure to deltet this employee !')) {
      this.service.DeleteEmployee(id).subscribe({
        next: (res: any) => {
          this.toastr.success('Employee Deleted Successfully', 'Delete Employee');
          this.ngOnInit();
        },
        error: (e) => {
          console.log(e);
          this.toastr.error(e.error.message, 'Login User');
        },
        complete: () => console.info('complete')
      });
    }
  }
}
