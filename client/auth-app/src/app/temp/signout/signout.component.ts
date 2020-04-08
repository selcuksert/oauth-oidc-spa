import { Component, OnInit } from '@angular/core';
import { AuthV2Service } from 'src/app/core/services/auth-v2.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  constructor(private authService: AuthV2Service, private router: Router) { }

  ngOnInit(): void {
    this.authService.completeLogout().then(() => {
      this.router.navigate(['/'], {replaceUrl: true});
    })
  }

}
