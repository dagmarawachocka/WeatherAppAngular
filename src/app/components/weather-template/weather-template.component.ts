import {Component, OnInit, ViewChild} from '@angular/core';
import {WeatherService} from "../../services/weather.service";
import {AsyncPipe, DecimalPipe, NgClass, NgIf} from "@angular/common";
import {KelvinToCelsiusPipe} from "../../pipes/kelvin-to-celsius.pipe";
import {MetersToKilometersPipe} from "../../pipes/meters-to-kilometers.pipe";
import {PopupComponent} from "../popup/popup.component";
import {WeatherData} from "../../weather-data";

@Component({
  selector: 'app-weather-template',
  standalone: true,
  imports: [
    NgIf,
    KelvinToCelsiusPipe,
    DecimalPipe,
    MetersToKilometersPipe,
    NgClass,
    AsyncPipe,
    PopupComponent
  ],
  templateUrl: './weather-template.component.html',
  styleUrl: './weather-template.component.css'
})
export class WeatherTemplateComponent implements OnInit {
  @ViewChild("inputCity") inputCity!: any;
  imgPathValue?: string;
  imgAlt = "Mountain";
  lat: number = 52.22;
  lon: number = 21.01;
  temperatureCelsius!: number;
  degreeUnit: string = "°C";
  weatherData!: WeatherData;
  countryCode!: string;
  popupShow: boolean = false;
  countryName?: string = 'loading...';

  constructor(private geolocation: Geolocation, private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.getWeather();
    this.getUserLocation();
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        this.getWeather();
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  getWeather() {
    this.weatherService.getWeatherData(this.lat, this.lon).subscribe(data => {
      this.weatherData = data;
      this.temperatureCelsius = this.weatherData.main.temp - 273.15;
      this.countryCode = this.weatherData.sys.country;
      this.getCountry(this.countryCode);
    });
  }

  getCity(city: string) {
    this.weatherService.getLocationData(city).subscribe(data => {
        this.weatherData = data;
        this.temperatureCelsius = this.weatherData.main.temp - 273.15;
        this.countryCode = this.weatherData.sys.country;
        this.getCountry(this.countryCode);
      },
      error => {
        this.popupShow = true;
        console.log(this.popupShow)
        setTimeout(() => {
          this.popupShow = false;
          console.log(this.popupShow)
        }, 4000)
      })
    this.clearInput();
    this.calculateBackground();
  }

  getCountry(countryCode: string) {
    this.countryCode = countryCode;
    this.weatherService.getCountryName(this.countryCode).subscribe(name => this.countryName = name)
  }

  clearInput() {
    this.inputCity.nativeElement.value = '';
  }

  get imgPath() {
    if (this.temperatureCelsius > 10) {
      return this.imgPathValue = "assets/warm.png";
    } else {
      return this.imgPathValue = "assets/cold.png";
    }
  }

  calculateBackground(): any {
    if (this.temperatureCelsius > 10) {
      return {
        'warm-weather': true,
        'cold-weather': false
      };
    } else {
      return {
        'warm-weather': false,
        'cold-weather': true
      };
    }
  }

  addAPI() {
    this.weatherService.addApiKey();
    this.getUserLocation();
  }

  calculateButtonStyle() {
    if (this.temperatureCelsius > 10) {
      return {
        'warm-button': true,
        'cold-button': false
      };
    } else {
      return {
        'warm-button': false,
        'cold-button': true
      };
    }
  }
}
