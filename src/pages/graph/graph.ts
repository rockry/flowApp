import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { dbService } from '../../services/dbService/db.service';

/**
* Generated class for the Graph page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@IonicPage()
@Component({
    selector: 'page-graph',
    templateUrl: 'graph.html'
})
export class GraphPage {
    @ViewChild(BaseChartDirective) chart: BaseChartDirective;
    public static readonly TAG: string = "GraphPage";
    
    chartType: string = 'line'; //line, bar, radar, pie, polarArea, doughnut
    chartLegend: boolean = true;
    chartColors: Array<any> = [
        { // skyblue
            backgroundColor: 'rgba(59,158,213,0.2)',
            borderColor: 'rgba(59,158,213,1)',
            pointBackgroundColor: 'rgba(59,158,213,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(59,158,213,0.8)'
        },
        { // pink
            backgroundColor: 'rgba(228,102,142,0.2)',
            borderColor: 'rgba(228,102,142,1)',
            pointBackgroundColor: 'rgba(228,102,142,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(228,102,142,1)'
        }
    ];
    chartOptions: any = {
        scaleShowVerticalLines: true,
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: value => {
                        if(value > 1) {
                            let hour = "", minute = "", second = "";
                            hour += value/3600>>0;
                            hour = hour.length < 2 ? "0".concat(hour) : hour;
                            value = value%3600;
                            minute += value/60>>0;
                            minute = minute.length < 2 ? "0".concat(minute) : minute;
                            second += value%60;
                            second = (second.length < 2 ? "0" : "") + second;
                            return hour + ":" + minute +":"+ second;    
                        }
                    }
                }
            }]
        }
    };
    chartLabels: string[]; //X-axis, date
    chartData: any[];
    
    queryDate : any;
    date : any;
    thisYear : number;
    thisMonth : number;
    
    ionViewDidLoad() {
        console.log('ionViewDidLoad Graph');
    }
    
    constructor(public navCtrl: NavController, private dbservice:dbService) {
        this.date = new Date();
        //this.initialize();
    }
    
    private initialize() {
        this.chartLabels = []; //X-axis, date
        this.chartData = [
            { data: [], label: 'Time of Flow' },
            { data: [], label: 'Time of interrupted' }
        ];
        this.thisYear = this.date.getFullYear();
        this.thisMonth = (this.date.getMonth()+1);
        this.queryDate = this.thisYear + '/' + this.thisMonth;
        
        this.dbservice.queryTimeData(this.queryDate).then((results) => {
            console.log(GraphPage.TAG, this.queryDate, ', timeData : ', results);
            for(let i = 0; i < results.length; i++) {
                if(results[i] && results[i].hasOwnProperty('timeData')) {
                    this.chartLabels.push(results[i].name);
                    this.chartData[0].data.push(results[i].timeData.todayFlowTime);
                    this.chartData[1].data.push(results[i].timeData.todayPauseTime);
                }
            }
        });
        
        setTimeout(() => {
            if (this.chart && this.chart.chart && this.chart.chart.config) {
                this.chart.chart.config.data.labels = this.chartLabels;
                this.chart.chart.config.data.datasets[0].data = this.chartData[0].data;
                this.chart.chart.config.data.datasets[1].data = this.chartData[1].data;
                this.chart.chart.config.data.options = this.chartOptions;
                this.chart.chart.update();
            }
        });
    }
    
    ngOnInit(){
        this.initialize();
        // dummy Data
        // (()=>{
        //     let data = [{name:"2017/8/1", timeData:{todayFlowTime:100, todayPauseTime:20}},
        //     {name:"2017/8/2", timeData:{todayFlowTime:120, todayPauseTime:120}},
        //     {name:"2017/8/3", timeData:{todayFlowTime:130, todayPauseTime:50}},
        //     {name:"2017/8/4", timeData:{todayFlowTime:110, todayPauseTime:120}},
        //     {name:"2017/8/5", timeData:{todayFlowTime:70, todayPauseTime:130}},
        //     {name:"2017/8/6", timeData:{todayFlowTime:120, todayPauseTime:120}},
        //     {name:"2017/8/7", timeData:{todayFlowTime:120, todayPauseTime:120}},
        //     {name:"2017/8/8", timeData:{todayFlowTime:120, todayPauseTime:120}},
        //     {name:"2017/8/9", timeData:{todayFlowTime:120, todayPauseTime:120}},
        //     {name:"2017/8/10", timeData:{todayFlowTime:120, todayPauseTime:120}}];
        //     for(let i = 0; i < data.length; i++) {
        //         this.chartLabels.push(data[i].name);
        //         this.chartData[0].data.push(data[i].timeData.todayFlowTime);
        //         this.chartData[1].data.push(data[i].timeData.todayPauseTime);
        //     }
        // })();
    }
    
    public chartClicked(e: any): void {
        console.log(e);
    }
    public previousMonth() {
        this.date.setMonth(this.thisMonth-2);
        this.thisYear = this.date.getFullYear();
        this.thisMonth = (this.date.getMonth()+1);
        this.queryDate = this.thisYear + '/' + this.thisMonth;
        this.initialize();
    }
    
    public forwardMonth() {
        this.date.setMonth(this.thisMonth);
        this.thisYear = this.date.getFullYear();
        this.thisMonth = (this.date.getMonth()+1);
        this.queryDate = this.thisYear + '/' + this.thisMonth;
        this.initialize();
    }
    
    public clearDB() {
        this.dbservice.clearAll().then(()=>{
            this.navCtrl.pop();
        });
    }
}