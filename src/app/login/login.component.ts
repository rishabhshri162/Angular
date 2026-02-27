import { Component } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  endpoint = 'http://localhost:8081/Auth/login';

  constructor(
    private httpService: HttpServiceService,
    private router: Router,
  ) {}

  form: any = {
    data: {},
    message: '',
    success: true,
    inputerror: {},
  };

  signIn() {
    let self = this;

    this.httpService.post(
      this.endpoint,
      this.form.data,
      function (response: any) {
        console.log('response ====== ', response); //print response in console

        if (response.success == false && response.result.inputerror) {
          self.form.inputerror = response.result.inputerror;
        }

        self.form.message = response.result.message;

        if ((self.form.success = response.success)) {
          localStorage.setItem('firstName', response.result.data.firstName);
          localStorage.setItem('roleName', response.result.data.roleName);
          localStorage.setItem('id', response.result.data.id);
          self.router.navigateByUrl('/welcome');
        }
      },
    );
  }
}
