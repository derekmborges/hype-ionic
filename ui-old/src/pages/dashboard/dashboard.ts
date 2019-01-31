import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Chart, ChartConfiguration } from 'chart.js'

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  ytdRange: number = 1

  @ViewChild('lineCanvas') lineCanvas
  @ViewChild('lineCanvas1') lineCanvas1
  @ViewChild('lineCanvas2') lineCanvas2
  lineChart: any
  lineChart1: any
  lineChart2: any
  labels: string[]
  data: number[]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadCharts()
  }

  loadCharts() {
    let loader = this.loadingController.create({
      content: 'Loading...',
    })
    loader.present()

    this.retrieveLabelsAndData()

    let chartOptions: ChartConfiguration = {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Sales',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(Ioni0,Ioni0,Ioni0,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.data,
            spanGaps: false,
          }
        ]
      }
    }

    this.lineChart = new Chart(this.lineCanvas.nativeElement, chartOptions)
    this.lineChart1 = new Chart(this.lineCanvas1.nativeElement, chartOptions)
    this.lineChart2 = new Chart(this.lineCanvas2.nativeElement, chartOptions)

    loader.dismiss()
  }

  retrieveLabelsAndData() {
    if (this.ytdRange === 1) {
      this.labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4']
      this.data = [87, 34, 57, 12]
    } else if (this.ytdRange === 4) {
      this.labels = [
        'Week 1', 'Week 2', 'Week 3', 'Week 4',
        'Week 5', 'Week 6', 'Week 7', 'Week 8',
        'Week 9', 'Week 10', 'Week 11', 'Week 12',
        'Week 13', 'Week 14', 'Week 15', 'Week 16',
      ]
      this.data = [87, 34, 57, 12, 22, 57, 74, 37, 55, 22, 98, 75, 34, 10, 7, 45]
    } else if (this.ytdRange === 7) {
      this.labels = ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7']
      this.data = [45, 76, 12, 98, 67, 11, 71]
    } else if (this.ytdRange === 10) {
      this.labels = ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7',
        'Month 8', 'Month 9', 'Month 10']
      this.data = [45, 76, 12, 98, 67, 11, 71, 41, 55, 88]
    } else {
      this.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      this.data = [45, 76, 12, 98, 67, 11, 71, 41, 55, 88, 6, 13]
    }
  }

  rangeChanged() {
    this.retrieveLabelsAndData()
    this.lineChart.data.labels = this.labels
    this.lineChart.data.datasets[0].data = this.data
    this.lineChart.update()

    this.lineChart1.data.labels = this.labels
    this.lineChart1.data.datasets[0].data = this.data
    this.lineChart1.update()

    this.lineChart2.data.labels = this.labels
    this.lineChart2.data.datasets[0].data = this.data
    this.lineChart2.update()
  }

}
