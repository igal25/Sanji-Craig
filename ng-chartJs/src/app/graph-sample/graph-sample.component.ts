import { Component, OnInit } from '@angular/core';
import { Chart, registerables, Point, Interaction, ChartEvent, TooltipItem, ChartItem, ScatterDataPoint, ChartConfiguration } from 'chart.js';
import colorLib from '@kurkle/color';
import { DateTime } from 'luxon';
//import 'chartjs-adapter-luxon';
import { valueOrDefault } from '../../../node_modules/chart.js/helpers/helpers.esm';
import { Action } from 'rxjs/internal/scheduler/Action';
//import { isUndefined } from 'util';

@Component({
  selector: 'app-graph-sample',
  templateUrl: './graph-sample.component.html',
  styleUrls: ['./graph-sample.component.css']
})
export class GraphSampleComponent implements OnInit {

  chart:Chart;
  chartitem:ChartItem
  DATA_COUNT = 1000;
  NUMBER_CFG = { count: this.DATA_COUNT, min: -180, max: 180 };


  constructor() { this.chartitem = document.getElementById("scattered_chart")as ChartItem;
  Chart.register(...registerables);
  this.chart=new Chart(this.chartitem,{type:'scatter',data:{datasets:[]},options:{}})
  // this.chart = new Chart(this.chartitem, {
  //   type: 'scatter',
    
  //   data: {
  //     datasets: [
  //       {
          
  //         label: 'Dataset',
  //         data: this.points(this.NUMBER_CFG),
  //         fill: false,
  //         borderColor: this.CHART_COLORS.red,
  //         backgroundColor: this.transparentize(this.CHART_COLORS.red, 1),
  //         pointHoverRadius: 7,
  //         pointHitRadius: 4,
  //         pointStyle: 'rect',
  //         pointHoverBackgroundColor: 'blue'
          
  //       },
  //     ]
  //   },
    
  //   options: {
      
  //     onClick:(ev)=>this.clickEventHandler(ev),
  //     responsive: true,
  //     plugins: {
        
  //       tooltip: {
          
  //         mode: 'point',
  //         enabled:true,
  //         callbacks: {
  //           label: (tooltipItem: TooltipItem<"scatter">)   => {
  //             return  ["ang: " + tooltipItem.element.x, "fre: " + tooltipItem.element.y];
  //           },
  //           footer: (tooltipItem: TooltipItem<"scatter">[])   => {
  //             return  "IGAL";
  //           }
            
  //         }
  //       },
  //       legend: {
  //       },
  //       title: {
  //         display: true,
  //         text: 'Axis Center Positioning'
  //       },
  //     },
  //     scales: {
  //       x: {
  //         min: -180,
  //         max: 180,
          
  //       },
  //       y: {
  //         min: 0,
  //         max: 100,
  //       },
  //       z: {
  //         min: 0,
  //         max: 100,
  //         position: "right"
  //       }
  //     }
  //   }
  // });  }
}
  ngOnInit(): void {
     this.chartitem = document.getElementById("scattered_chart")as ChartItem ;
     Chart.register(...registerables);
    this.loadChart();
    this.func1();
    setInterval(() => {
      this.chart.destroy();
      this.chartitem = document.getElementById("scattered_chart") as ChartItem ;
      Chart.register(...registerables);
      this.loadChart();
    },
      30000);
  }

  clickEventHandler(ev:ChartEvent,chart2:any){
    var CHART=chart2 as Chart
    var temp=CHART.getActiveElements();
    //console.log(temp[0])
    if( temp[0]!==undefined){
      console.log(`${ev.x} and ${ev.y}`);
      
    }
    else
     alert("igal");
    //  clickEventHandler1(ev1:ChartEvent,linechart:any){
    //   var linechart1=linechart as Chart;
    //   var activePoints = linechart1.getActiveElements();
    //   //console.log(linechart1.getActiveElements().length)
    //   if(linechart1.getActiveElements().length>0)
    //   console.log(activePoints[0].index+1);
    // }
    // var element = this.chart.chartinstance.get(mouseEvent);
    // if (element.length > 0) {
    //   element[0]._view.backgroundColor = '#FFF';
    //   this.chart.update();
    // }
    // else 
    //   console.log("no element in `${mouseEvent.x} and ${mouseEvent.y}`");
//     var data1 = {
//       labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//       datasets: [
//           {
//               label: "Prime and Fibonacci",
//               fill: false,
//               borderColor: "green",
//               pointColor: "white",
//               pointStrokeColor: "#fff",
//               pointHighlightFill: "#fff",
//               pointHighlightStroke: "rgba(220,220,220,1)",
//               data: [12, 13, 15, 17, 111, 113, 117, 9, 3, 0]
//           },
//           {
//               label: "My Second dataset",
//               fill: false,
//               borderColor: "red",
//               pointColor: "rgba(151,187,205,1)",
//               pointStrokeColor: "#fff",
//               pointHighlightFill: "#fff",
//               pointHighlightStroke: "rgba(151,187,205,1)",
//               data: [2, 3, 5, 7, 11, 13, 17, 13, 21, 34]
//           }
//       ]
//   };
//  // var ctx:ChartItem;
//   var ctx=document.getElementById('chart1') as ChartItem;
//     var lineChart = new Chart(ctx, {
//       type: 'line',
//       data: data1,
//       options: {
//         responsive: true
//       }});
//     var activePoints = lineChart.getActiveElements();
//     console.log(activePoints);
    // if (activePoints.length) {
    //   var mouse_position = this.chart.getRelativePosition(ev, this.chart.chart);

    //   activePoints = $.grep(activePoints,function(activePoint, index) {
    //     var leftX = activePoint._model.x - 5,
    //         rightX = activePoint._model.x + 5,
    //         topY = activePoint._model.y + 5,
    //         bottomY = activePoint._model.y - 5;

    //     return mouse_position.x >= leftX && mouse_position.x <=rightX && mouse_position.y >= bottomY && mouse_position.y <= topY;
    //   });
    //   console.log(activePoints[0]);
    // }     
  }
  func1(){
    var data1 = {
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      datasets: [
          {
              label: "Prime and Fibonacci",
              fill: false,
              borderColor: "green",
              pointColor: "white",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)",
              data: [12, 13, 15, 17, 111, 113, 117, 9, 3, 0]
          },
          {
              label: "My Second dataset",
              fill: false,
              borderColor: "red",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(151,187,205,1)",
              data: [2, 3, 5, 7, 11, 13, 17, 13, 21, 34]
          }
      ]
  };
 // var ctx:ChartItem;
  var ctx=document.getElementById('chart1') as ChartItem;
  var lineChart:Chart;
   lineChart = new Chart(ctx, {
      type: 'line',
      data: data1,
      options: {
        responsive: true,
        
        onClick:(ev)=>this.clickEventHandler1(ev,lineChart)
      }});
    
  }
  clickEventHandler1(ev1:ChartEvent,linechart:any){
    var linechart1=linechart as Chart;
    var activePoints = linechart1.getActiveElements();
    //console.log(linechart1.getActiveElements().length)
    if(linechart1.getActiveElements().length>0)
    console.log(activePoints[0].index+1);
  }
  loadChart() {
    this.chart = new Chart(this.chartitem, {
      type: 'scatter',
      
      data: {
        datasets: [
          {
            
            label: 'Dataset',
            data:[[1,2], [10,3], 15, 17, 111, 113, 117, 9, 3, 0],
            //data: this.points(this.NUMBER_CFG),
            fill: false,
            borderColor: this.CHART_COLORS.red,
            backgroundColor: this.transparentize(this.CHART_COLORS.red, 1),
            pointHoverRadius: 7,
            pointHitRadius: 4,
            pointStyle: 'rect',
            pointHoverBackgroundColor: 'blue'
            
          },
        ]
      },
      
      options: {
        
        onClick:(ev)=>this.clickEventHandler(ev,this.chart),
        responsive: true,
        plugins: {
          
          tooltip: {
            
            mode: 'point',
            enabled:true,
            callbacks: {
              label: (tooltipItem: TooltipItem<"scatter">)   => {
                return  ["ang: " + tooltipItem.element.x, "fre: " + tooltipItem.element.y];
              },
              footer: (tooltipItem: TooltipItem<"scatter">[])   => {
                return  "IGAL";
              }
              
            }
          },
          legend: {
          },
          title: {
            display: true,
            text: 'Axis Center Positioning'
          },
        },
        scales: {
          x: {
            min: -180,
            max: 180,
            
          },
          y: {
            min: 0,
            max: 100,
          },
          z: {
            min: 0,
            max: 100,
            position: "right"
          }
        }
      }
    }as ChartConfiguration);
    //onclick=(x)=>this.func1(x);
    

  }

  getPointRepresantationOnhHover(x:ChartEvent): string {
    return "ang" + x.x + "fre" + x.y;
  }





    
  _seed = Date.now();

  srand(seed: any) {
    this._seed = seed;
  }

  rand(min: any, max: any) {
    min = valueOrDefault(min, 0);
    max = valueOrDefault(max, 0);
    this._seed = (this._seed * 9301 + 49297) % 233280;
    return min + (this._seed / 233280) * (max - min);
  }

  numbers(config: any) {
    var cfg = config || {};
    var min = valueOrDefault(cfg.min, 0);
    var max = valueOrDefault(cfg.max, 100);
    var from = valueOrDefault(cfg.from, []);
    var count = valueOrDefault(cfg.count, 8);
    var decimals = valueOrDefault(cfg.decimals, 8);
    var continuity = valueOrDefault(cfg.continuity, 1);
    var dfactor = Math.pow(10, decimals) || 0;
    var data = [];
    var i, value;

    for (i = 0; i < count; ++i) {
      value = (from[i] || 0) + this.rand(min, max);
      if (this.rand(min, max) <= continuity) {
        data.push(Math.round(dfactor * value) / dfactor);
      } else {
        data.push(null);
      }
    }

    return data;
  }

  points(config: any) {
    const xs = this.numbers(config);
    const ys = this.numbers(config);
    return xs.map((x, i) => ({ x, y: ys[i] }));
  }

  bubbles(config: any) {
    return this.points(config).map(pt => {
      pt = this.rand(config.rmin, config.rmax);
      return pt;
    });
  }

  labels(config: any) {
    var cfg = config || {};
    var min = cfg.min || 0;
    var max = cfg.max || 100;
    var count = cfg.count || 8;
    var step = (max - min) / count;
    var decimals = cfg.decimals || 8;
    var dfactor = Math.pow(10, decimals) || 0;
    var prefix = cfg.prefix || '';
    var values = [];
    var i;

    for (i = min; i < max; i += step) {
      values.push(prefix + Math.round(dfactor * i) / dfactor);
    }

    return values;
  }

  readonly MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  months(config: any) {
    var cfg = config || {};
    var count = cfg.count || 12;
    var section = cfg.section;
    var values = [];
    var i, value;

    for (i = 0; i < count; ++i) {
      value = this.MONTHS[Math.ceil(i) % 12];
      values.push(value.substring(0, section));
    }

    return values;
  }

  readonly COLORS = [
    '#4dc9f6',
    '#f67019',
    '#f53794',
    '#537bc4',
    '#acc236',
    '#166a8f',
    '#00a950',
    '#58595b',
    '#8549ba'
  ];

  color(index: any) {
    return this.COLORS[index % this.COLORS.length];
  }

  transparentize(value: any, opacity: any) {
    var alpha = opacity === undefined ? 0.5 : 1 - opacity;
    return colorLib(value).alpha(alpha).rgbString();
  }

  readonly CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };

  readonly NAMED_COLORS = [
    this.CHART_COLORS.red,
    this.CHART_COLORS.orange,
    this.CHART_COLORS.yellow,
    this.CHART_COLORS.green,
    this.CHART_COLORS.blue,
    this.CHART_COLORS.purple,
    this.CHART_COLORS.grey,
  ];

  namedColor(index: any) {
    return this.NAMED_COLORS[index % this.NAMED_COLORS.length];
  }

  newDate(days: any) {
    return DateTime.now().plus({ days }).toJSDate();
  }

  newDateString(days: any) {
    return DateTime.now().plus({ days }).toISO();
  }

  parseISODate(str: any) {
    return DateTime.fromISO(str);
  }



}
