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
  
  chartLabels: string[] = ['Test 1', 'Test 2', 'Test 3', 'Test 4']; //X-axis, date
  chartType: string = 'line'; //line, bar, radar, pie, polarArea, doughnut
  chartLegend: boolean = true;
  
  chartData: any[] = [
    { data: [75, 80, 45, 100], label: 'Time of Flow' },
    { data: [80, 55, 75, 95], label: 'Time of interrupted' }
  ];
  
  thisMonth : any;
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad Graph');
  }
  
  constructor(public navCtrl: NavController, private dbservice:dbService) {
    var date = new Date();
    this.thisMonth = date.getFullYear() + '-' + (date.getMonth()+1);
  }
  
}
