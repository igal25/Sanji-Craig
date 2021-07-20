import { Component, OnInit } from '@angular/core';
import { Chart, registerables,Point } from 'chart.js';
import colorLib from '@kurkle/color';
import {DateTime} from 'luxon';
//import 'chartjs-adapter-luxon';
import {valueOrDefault} from '../../../node_modules/chart.js/helpers/helpers.esm';

@Component({
  selector: 'app-graph-sample',
  templateUrl: './graph-sample.component.html',
  styleUrls: ['./graph-sample.component.css']
})
export class GraphSampleComponent implements OnInit {

  chart: any;
  DATA_COUNT = 6;
  NUMBER_CFG = {count: this.DATA_COUNT, min: -100, max: 100};


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
            label: 'Dataset 1',
            data: this.points(this.NUMBER_CFG),
            fill: false,
            borderColor: this.CHART_COLORS.red,
            backgroundColor: this.transparentize(this.CHART_COLORS.red, 0.5),
          },
          {
            label: 'Dataset 2',
            data: this.points(this.NUMBER_CFG),
            fill: false,
            borderColor: this.CHART_COLORS.blue,
            backgroundColor: this.transparentize(this.CHART_COLORS.blue, 0.5),
          }
        ]
      },options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Axis Center Positioning'
          }
        },
        scales: {
          x: {
            min: -180,
            max: 180,
          },
          y: {
            min: 0,
            max: 100,
          }
        },

      }
    })
  }
  _seed = Date.now();

  srand(seed:any) {
      this._seed = seed;
  }

  rand(min:any, max:any) {
  min = valueOrDefault(min, 0);
  max = valueOrDefault(max, 0);
  this._seed = (this._seed * 9301 + 49297) % 233280;
  return min + (this._seed / 233280) * (max - min);
  }

  numbers(config:any) {
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
      if (this.rand(min,max) <= continuity) {
      data.push(Math.round(dfactor * value) / dfactor);
      } else {
      data.push(null);
      }
  }

  return data;
  }

  points(config:any) {
  const xs = this.numbers(config);
  const ys = this.numbers(config);
  return xs.map((x, i) => ({x, y: ys[i]}));
  }

  bubbles(config:any) {
  return this.points(config).map(pt => {
      pt = this.rand(config.rmin, config.rmax);
      return pt;
  });
  }

  labels(config:any) {
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

  months(config:any) {
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

   color(index:any) {
  return this.COLORS[index % this.COLORS.length];
  }

  transparentize(value:any, opacity:any) {
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

  namedColor(index:any) {
  return this.NAMED_COLORS[index % this.NAMED_COLORS.length];
  }

  newDate(days:any) {
  return DateTime.now().plus({days}).toJSDate();
  }

  newDateString(days:any) {
  return DateTime.now().plus({days}).toISO();
  }

  parseISODate(str:any) {
  return DateTime.fromISO(str);
  }



}
