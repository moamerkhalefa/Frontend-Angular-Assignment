import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employees } from './employees.model';
@Injectable({
  providedIn: 'root'
})
export class AppServices {
  editFormData: Employees = new Employees();
  constructor(private http: HttpClient) { }
  readonly BaseUrl = 'http://wowtlet-001-site2.htempurl.com/api';
  register(UserData: any) {
    return this.http.post(this.BaseUrl + '/Users/register', UserData);
  }
  Login(FormData: any) {
    return this.http.post(this.BaseUrl + '/Users/login', FormData);
  }
  GetUserProfile() {
    var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    return this.http.get(this.BaseUrl + '/Users/GetUserProfile', { headers: tokenHeader });
  }
  AddEmployee(FormData: Employees) {
    var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    return this.http.post(this.BaseUrl + '/Employee/AddEmployee', FormData, { headers: tokenHeader });
  }
  UpdateEmployee(FormData: Employees) {
    var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    return this.http.put(this.BaseUrl + '/Employee/UpdateEmployee/' + FormData.employeeId, FormData, { headers: tokenHeader });
  }
  DeleteEmployee(id: number) {
    var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    return this.http.delete(this.BaseUrl + '/Employee/DeleteEmployee/' + id, { headers: tokenHeader });
  }
  GetEmployees() {
    var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    return this.http.get(this.BaseUrl + '/Employee/GetEmployees', { headers: tokenHeader });
  }
}
