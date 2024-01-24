import {AfterContentInit, AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {WeatherService} from "../../services/weather.service";

@Component({
  selector: 'app-popup',
  standalone: true,
    imports: [
        NgIf,
      NgClass
    ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {

  constructor(private weatherService: WeatherService) { }
  @Input() temperatureCelsius!: number;
  @Input() popupShow!: boolean;

  calculatePopupStyle() {
    if (this.temperatureCelsius > 10) {
      return {
        'warm-popup': true,
        'cold-popup': false
      };
    } else {
      return {
        'warm-popup': false,
        'cold-popup': true
      };
    }
  }

    closePopup() {
      this.popupShow = false;
    }
}
