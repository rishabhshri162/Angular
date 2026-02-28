import { Component } from '@angular/core';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent {
  endpoint = 'http://localhost:8081/Role/save';

  constructor(private httpService: HttpServiceService) {}

  form: any = {
    data: {},
    message: '',
    inputerror: {},
  };

  saveRole() {
   
    let self = this;

    this.httpService.post(
      this.endpoint,
      this.form.data,
      function (response: any) {
       
        if (response.success == false && response.result.inputerror) {
          self.form.inputerror = response.result.inputerror;
        }

        self.form.message = response.result.message;
      },
    );
  }
}
