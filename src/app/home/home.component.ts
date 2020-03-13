import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpResponse } from '@angular/common/http';
import { retry, catchError, tap } from 'rxjs/operators';

// import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public firstPage() {
    this.products = [];
    this.apiService.sendGetRequestToUrl(this.apiService.first).pipe().subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.products = res.body;
    })
  }
  public previousPage() {

    if (this.apiService.prev !== undefined && this.apiService.prev !== '') {
      this.products = [];
      this.apiService.sendGetRequestToUrl(this.apiService.prev).pipe().subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      })
    }

  }
  public nextPage() {
    if (this.apiService.next !== undefined && this.apiService.next !== '') {
      this.products = [];
      this.apiService.sendGetRequestToUrl(this.apiService.next).pipe().subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      })
    }
  }
  public lastPage() {
    this.products = [];
    this.apiService.sendGetRequestToUrl(this.apiService.last).pipe().subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.products = res.body;
    })
  }



  products = [];
  constructor(private apiService: ApiService) { }
  ngOnInit() {
    // takeUntil(this.destroy$)
    this.apiService.sendGetRequest().pipe().subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.products = res.body;
    })
  }

}
