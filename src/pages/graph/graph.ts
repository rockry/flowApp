import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
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
    templateUrl: 'graph.html',
})
export class GraphPage {
    public static readonly TAG: string = "GraphPage";

    chartOptions: any = {
        scaleShowVerticalLines: true,
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: value => {
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
            }]
        }
    };
    
    chartType: string = 'line'; //line, bar, radar, pie, polarArea, doughnut
    chartLegend: boolean = true;
    
    chartLabels: string[] = []; //X-axis, date
    chartData: any[] = [
        { data: [], label: 'Time of Flow' },
        { data: [], label: 'Time of interrupted' }
    ];
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
    
    thisMonth : any;
    
    ionViewDidLoad() {
        console.log('ionViewDidLoad Graph');
    }
    public chartClicked(e: any): void {
        console.log(e);
    }
    
    constructor(public navCtrl: NavController, private dbservice:dbService) {
        var date = new Date();
        this.thisMonth = date.getFullYear() + '/' + (date.getMonth()+1);
        
        dbservice.queryTimeData(this.thisMonth).then((results) => {
            console.log(GraphPage.TAG, this.thisMonth, ', timeData : ', results);
            for(let i = 0; i < results.length; i++) {
                if(results[i] && results[i].hasOwnProperty('timeData')) {
                    this.chartLabels.push(results[i].name);
                    this.chartData[0].data.push(results[i].timeData.todayFlowTime);
                    this.chartData[1].data.push(results[i].timeData.todayPauseTime);
                }
            }
        });
        
        //dummy Data
        // (()=>{
        //     let data = [{name:"2017/8/1", timeData:{todayFlowTime:100, todayPauseTime:20}},
        //     {name:"2017/8/2", timeData:{todayFlowTime:120, todayPauseTime:120}},
        //     {name:"2017/8/3", timeData:{todayFlowTime:130, todayPauseTime:50}},
        //     {name:"2017/8/4", timeData:{todayFlowTime:110, todayPauseTime:120}},
        //     {name:"2017/8/5", timeData:{todayFlowTime:70, todayPauseTime:130}}];
        //     for(let i = 0; i < data.length; i++) {
        //         this.chartLabels.push(data[i].name);
        //         this.chartData[0].data.push(data[i].timeData.todayFlowTime);
        //         this.chartData[1].data.push(data[i].timeData.todayPauseTime);
        //     }
        // })();
    }
}