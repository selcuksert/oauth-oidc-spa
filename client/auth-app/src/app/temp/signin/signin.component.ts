import { Component, OnInit } from '@angular/core';
import { AuthV2Service } from 'src/app/core/services/auth-v2.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthV2Service, private router: Router) { }

  ngOnInit(): void {
    this.authService.completeLogin().then(user => {
      this.router.navigate(['/todos'], { replaceUrl: true });
    })
  }

}
