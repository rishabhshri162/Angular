import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router, private httpClient: HttpClient) {}

  form: any = {
    data: {},
  };

  isLogin() {
    let check = localStorage.getItem('firstName');
    if (check != null && check != undefined && check != '' && check != 'null') {
      this.form.data.firstName = check;
      this.form.data.lastName = localStorage.getItem('lastName');
      this.form.data.roleName = localStorage.getItem('roleName');
      this.form.data.id = localStorage.getItem('id');

      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.clear();
    this.httpClient.post('http://localhost:8080/Auth/logout', {}).subscribe((res: any) => {
      console.log("logout res: ", res)
    })
    this.router.navigateByUrl('/login?message=User logged out successfully');
  }
}
