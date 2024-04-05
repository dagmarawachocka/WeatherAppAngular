import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {WeatherTemplateComponent} from "./components/weather-template/weather-template.component";
import {WeatherService} from "./services/weather.service";
import {PopupComponent} from "./components/popup/popup.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, WeatherTemplateComponent, PopupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [WeatherService]
})
export class AppComponent {
  title = 'weatherApp';
}

