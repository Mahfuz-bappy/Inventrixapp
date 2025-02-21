import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Chart, { ChartData, ChartOptions } from 'chart.js/auto';

@Component({
  selector: 'app-clientdashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clientdashboard.component.html',
  styleUrl: './clientdashboard.component.css'
})
export class ClientdashboardComponent implements AfterViewInit {

  @ViewChild('myLineChart') lineChartCanvas!: ElementRef<HTMLCanvasElement>;
  lineChart: any;

  @ViewChild('myRadarChart') radarChartCanvas!: ElementRef<HTMLCanvasElement>;
  radarChart: any;


  ngAfterViewInit() {
    this.renderLineChart();
    this.renderRadarChart();
  }

  renderLineChart() {
    const ctxLine = this.lineChartCanvas.nativeElement.getContext('2d');
    if (ctxLine) {
      this.lineChart = new Chart(ctxLine, {
        type: 'line',
        data: this.lineChartData,
        options: this.lineChartOptions
      });
    } else {
      console.error('Could not get 2D rendering context for line chart');
    }
  }

  renderRadarChart() {
    const ctxRadar = this.radarChartCanvas.nativeElement.getContext('2d');
    if (ctxRadar) {
      this.radarChart = new Chart(ctxRadar, {
        type: 'radar',
        data: this.radarChartData,
        options: this.radarChartOptions
      });
    } else {
      console.error('Could not get 2D rendering context for radar chart');
    }
  }


  public lineChartData: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40, 70, 60, 85, 75, 90],
        label: 'Dataset 1',
        fill: false,
        tension: 0.4,
        borderColor: '#4C9FFE',
        backgroundColor: 'transparent'
      },
      {
        data: [28, 48, 40, 19, 96, 27, 100, 55, 65, 70, 30, 50],
        label: 'Dataset 2',
        fill: false,
        tension: 0.4,
        borderColor: '#FF6384',
        backgroundColor: 'transparent'
      },
      {
        data: [10, 20, 15, 35, 25, 40, 25, 15, 30, 45, 50, 40],
        label: 'Dataset 3',
        fill: false,
        tension: 0.4,
        borderColor: '#9966FF',
        backgroundColor: 'transparent'
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false
        }
      }
    },
    elements: {
      point: {
        radius: 0
      }
    },
    plugins: {
      legend: { display: false }
    }
  };

 

  public radarChartOptions: ChartOptions<'radar'> = {
    responsive: true,
    elements: {
      line: {
        fill: true,
        tension: 0.2,
        borderWidth: 2,
      },
      point: {
        radius: 4,
      }
    },
    scales: {
      r: {
        angleLines: {
          display: false
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        pointLabels: {
          font: {
            size: 12
          }
        },
        ticks: {
          
          stepSize: 25,
          color: 'rgba(0, 0, 0, 0.4)'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      }
    }
  };

  public radarChartData: ChartData<'radar'> = {
    labels: ['Marketing', 'Sales', 'Development', 'Design', 'IT', 'Admin'],
    datasets: [
      {
        data: [65, 59, 90, 81, 56, 55],
        label: 'Allocated Budget',
        borderColor: '#20c997',
        backgroundColor: 'rgba(32, 201, 151, 0.2)',
        pointBackgroundColor: '#20c997',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#20c997',
      },
      {
        data: [28, 48, 40, 19, 96, 27],
        label: 'Actual Spending',
        borderColor: '#0dcaf0',
        backgroundColor: 'rgba(13, 202, 240, 0.2)',
        pointBackgroundColor: '#0dcaf0',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#0dcaf0',
      }
    ]
  };


}