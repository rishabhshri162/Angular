import { Component } from '@angular/core';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  endpoint = 'http://localhost:8081/User/save';

  constructor(private httpService: HttpServiceService) {}

  form: any = {
    data: {},
    message: '',
    inputerror: {},
  };

  save() {
    let self = this;

    console.log('form data== ', this.form.data); //print form data in console

    this.httpService.post(
      this.endpoint,
      this.form.data,
      function (response: any) {
        console.log('response ====== ', response); //print response in console

        if (response.success == false && response.result.inputerror) {
          self.form.inputerror = response.result.inputerror;
        }

        self.form.message = response.result.message;
      },
    );
  }
}
