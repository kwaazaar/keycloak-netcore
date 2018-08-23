
import { Component, Inject, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit {
    public forecasts: WeatherForecast[];

    constructor(
        private http: Http,
        @Inject('BASE_URL') private baseUrl: string,
        private oauthService: OAuthService) { }

    ngOnInit(): void {
        const headers = new Headers({
            'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
        });

        this.http.get(this.baseUrl + 'api/SampleData/WeatherForecasts',
            { headers: headers })
            .subscribe(result => {
                this.forecasts = result.json() as WeatherForecast[];
            }, error => console.error(error));
    }
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
/*

import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<WeatherForecast[]>(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }
}

interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
*/