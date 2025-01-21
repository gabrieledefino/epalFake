import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private httpService: HttpClient){

    
  }
  ngOnInit(): void {
   setInterval(()=>{
    this.httpService.get('https://epalpalletsdev.westeurope.cloudapp.azure.com/api/notifications').subscribe(
      {
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.error('Error:', error);
        }
      }
    );
   }, 10000)
  }

  title = 'epalFake';
}
