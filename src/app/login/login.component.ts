import { Component } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private httpService: HttpServiceService, private router: Router,private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
    this.form.logoutMessage = params['message'];
  });
   }

  form: any = {
    data: {},
    message: '',
    logoutMessage: '',
    inputerror: {}
  }

  signIn() {
    let self = this;
    console.log('form data== ', this.form.data);
    this.httpService.post('http://localhost:8081/Auth/login', this.form.data, function (response: any) {
      

      if (response.success == false && response.result.inputerror) {
        self.form.inputerror = response.result.inputerror;
      }

      if (response.success == false && response.result.message) {
        self.form.message = response.result.message;
      }

      if (response.success) {
        localStorage.setItem('firstName', response.result.data.firstName);
        localStorage.setItem('lastName', response.result.data.lastName);
        localStorage.setItem('roleName', response.result.data.roleName);
        localStorage.setItem('id', response.result.data.id)
        self.router.navigateByUrl('/welcome');
      }
      
    })
  }



  signUp() {
    this.router.navigateByUrl('/signup');
  }

}