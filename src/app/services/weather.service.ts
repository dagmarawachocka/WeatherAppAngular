import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {WeatherData} from "../weather-data";

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  apiKey: string = ''; //register at https://openweathermap.org/ and provide your api key here

  constructor(private http: HttpClient) {
  }

  getWeatherData(lat: number, lon: number): Observable<any> {
    return this.http.get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`)
  }

  getLocationData(city: string): Observable<any> {
    return this.http.get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`)
  }

  getCountryName(countryCode: string) {
    return this.http.get<any>(`https://restcountries.com/v3.1/alpha/${countryCode}`).pipe(map(response => response[0]?.name?.common || countryCode))
  }

}





