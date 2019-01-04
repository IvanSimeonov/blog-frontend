import { Component, OnInit } from '@angular/core';
import { ActuatorService } from '../actuator/actuator.service';

@Component({
  selector: 'app-global-stats',
  templateUrl: './global-stats.component.html',
  styleUrls: ['./global-stats.component.css']
})
export class GlobalStatsComponent implements OnInit {

  totalRequests: number;
  totalTimeSeconds: number;

  constructor(private actuatorService: ActuatorService) { }

  ngOnInit() {
    this.actuatorService.getTotalApiRequests().subscribe(jsonData => {
      this.totalRequests = jsonData.measurements[0].value;
      this.totalTimeSeconds = jsonData.measurements[1].value;
    });
  }

}