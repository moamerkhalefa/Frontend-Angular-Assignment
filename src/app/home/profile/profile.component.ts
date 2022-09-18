import { Component, OnInit } from '@angular/core';
import { AppServices } from 'src/app/shared/AppServices.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {
  userProfileData: any;
  constructor(private service: AppServices) { }
  ngOnInit(): void {
    this.service.GetUserProfile().subscribe({
      next: (res: any) => {
        this.userProfileData = res;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => console.info('complete')
    })
  }
}
