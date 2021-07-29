import { Component, OnInit } from '@angular/core';
import { Chart, registerables, Point, Interaction, ChartEvent, TooltipItem, ChartItem, ScatterDataPoint, ChartConfiguration, Scale } from 'chart.js';
import colorLib from '@kurkle/color';
import { DateTime } from 'luxon';
import { valueOrDefault } from '../../../node_modules/chart.js/helpers/helpers.esm';
import { Action } from 'rxjs/internal/scheduler/Action';
import { timer } from 'rxjs';
// import zoomPlugin from 'chartjs-plugin-zoom';

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
  
}
  ngOnInit(): void {
    this.chartitem = document.getElementById("scattered_chart")as ChartItem ;
    Chart.register(...registerables);
    // Chart.register(zoomPlugin);

    this.loadChart();
    setInterval(() => {
      this.updateChartData();
      this.chart.update();
    },
      30000);
  }

  
  loadChart() {
    this.chart = new Chart(this.chartitem, {
      type: 'scatter',
      
      data: {
        datasets: [
          {
            label: 'Dataset',
            data: this.points(this.NUMBER_CFG),
            fill: false,
            borderColor: this.CHART_COLORS.red,
            backgroundColor: this.transparentize(this.CHART_COLORS.red, 1),
            pointHoverRadius: 7,
            pointHitRadius: 4,
            //hit:120,
            pointStyle: 'star',
            pointHoverBackgroundColor: 'blue',
            
          },
        ]
      },
      
      options: {
        onClick: (ev)=>this.clickEventHandler(ev,this.chart),
        // oncontextmenu:(ev:MouseEvent)=>this.contextmenuEventHandler(ev,this.chart),
        onContextMenu: (ev:any)=>{console.log("brigal");
        },
        responsive: true,
        plugins: {
          autocolors: false,
          // annotation: {
          //   annotations: {
          //     line1: {
          //       type: 'line',
          //       yMin: 60,
          //       yMax: 60,
          
          //       borderColor: 'rgb(255, 99, 132)',
          //       borderWidth: 2,
          //     } 
          //   }
          // },

          // zoom: {
          //   zoom: {
          //     wheel: {
          //       enabled: true,
          //     },
          //     pinch: {
          //       enabled: true
          //     },
          //     mode: 'xy',
          //   }
          // }, 
          tooltip: {
            usePointStyle: true,
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
            ticks: {
              stepSize: 20
            }
          },
          y: {
            min: 0,
            max: 100,
            ticks: {
              // Include a dollar sign in the ticks
              callback: (value:number, index, values) => {
                var ticks = [10 , 40 , 50 , 100];
                if(ticks.includes(value )) {
                  return value;
                }
                return "";
              }
            }
          },
          z: {
            min: 0,
            max: 100,
            position: "right",
            ticks: {
              fontColor:'#fff'
            },
          }
        },
        animation: {
          backgroundColor: {
            type: "color",
            from: "red",
            to: "green",
            duration: 700,
            loop: true,
          }
        }
      },
    }as ChartConfiguration);
    

  }

  updateChartData() {
    this.chart.data.datasets[0].data = this.points(this.NUMBER_CFG) as [];
  }

  getPointRepresantationOnhHover(x:ChartEvent): string {
    return "ang" + x.x + "fre" + x.y;
  }

  clickEventHandler(ev:ChartEvent,chart2:any){
    console.log(ev.type)
    var CHART=chart2 as Chart
    var temp=CHART.getActiveElements();
    if( temp[0]!==undefined){
     // console.log(`${ev.x} and ${ev.y}`);
      console.log(temp[0].element.x+"   "+temp[0].element.y)
      //CHART.data.datasets[0].indexAxis.
      
      this.chart.data
      this.chart.update();
    }
    else
     console.log("igal");
  }
  contextmenuEventHandler(ev:MouseEvent,chart2:any){
    console.log("brigal");

  }


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




    
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


class MyScale extends Scale {
  /* extensions ... */
}