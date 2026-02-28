import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

 endpoint= 'http://localhost:8081/User/search/';

  form: any = {
    list: [],
    searchParam: {},
    pageNo: 0
  }
   

  constructor(private httpService: HttpServiceService) { }

  ngOnInit(): void {
    this.search();
  }

  search() {
    let self = this;
    this.httpService.post(this.endpoint + this.form.pageNo, this.form.searchParam, function (response: any) {


      if (response.success) {
        self.form.list = response.result.data;

      }
    })
  }

}