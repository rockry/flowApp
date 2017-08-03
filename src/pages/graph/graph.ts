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
  chartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  
  chartLabels: string[] = []; //X-axis, date
  chartType: string = 'line'; //line, bar, radar, pie, polarArea, doughnut
  chartLegend: boolean = true;
  
  chartData: any[] = [
    { data: [], label: 'Time of Flow' },
    { data: [], label: 'Time of interrupted' }
  ];
  
  thisMonth : any;
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad Graph');
  }
  
  constructor(public navCtrl: NavController, private dbservice:dbService) {
    var date = new Date();
    this.thisMonth = date.getFullYear() + '/' + (date.getMonth()+1);
    
    dbservice.queryTimeData(this.thisMonth).then((results) => {
      console.log( this.thisMonth, ', timeData : ', results);
      for(let i = 0; i < results.length; i++) {
        if(results[i] && results[i].hasOwnProperty('todayFlowTime')) {
          this.chartLabels.push(results[i].name);
          this.chartData[0].data.push(results[i].timeData.todayFlowTime);
          this.chartData[1].data.push(results[i].timeData.todayPauseTime);
        }
      }
    });
  }
}