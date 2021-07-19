import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-graph-sample',
  templateUrl: './graph-sample.component.html',
  styleUrls: ['./graph-sample.component.css']
})
export class GraphSampleComponent implements OnInit {

  chart: any;


  constructor() { }

  ngOnInit(): void {
    this.chart = document.getElementById("scattered_chart");
    Chart.register(...registerables);
    this.loadChart();
  }

  loadChart() {
    new Chart(this.chart, {
      type:'scatter',
      data: {
        datasets: [
          {
            data:[]
          }
        ]
      }
    })
  }

}
