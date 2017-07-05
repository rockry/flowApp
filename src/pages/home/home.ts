import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public static readonly CYCLE_IMG_PATH: string[] = ["assets/images/cycle_status_0.png",
  "assets/images/cycle_status_1.png",
  "assets/images/cycle_status_2.png",
  "assets/images/cycle_status_3.png",
  "assets/images/cycle_status_4.png",
  "assets/images/cycle_status_5.png",
  "assets/images/cycle_status_6.png",
  "assets/images/cycle_status_7.png",
  "assets/images/cycle_status_8.png",
  "assets/images/cycle_status_9.png"];
  currentCycleImage: string; // 화면에 표시되는 Cycle Image
  currentCycleStatus: number;
  
  public static readonly DEFAULT_BT_IMG_PATH: string = "assets/images/round_button_default.png";
  public static readonly BT_IMG_PATH: string[] = ["assets/images/round_button_default.png",
  "assets/images/round_button_blue.png",
  "assets/images/round_button_green.png",
  "assets/images/round_button_red.png"];
  currentButtonImage: string; // 화면에 표시되는 Button Image
  
  public static readonly DEFAULT_BT_TXT: string = "START";
  public static readonly BT_TXT: string[] = ["START", "몰입", "휴식", "중단"];
  buttonText: string; // 화면에 표시되는 Text
  
  public static readonly BT_STATUS_DEFAULT:number = 0;
  public static readonly BT_STATUS_FLOW:number = 1;
  public static readonly BT_STATUS_REST:number = 2;
  public static readonly BT_STATUS_PAUSE:number = 3;
  buttonStatus: number; // 0:default, 1:flow, 2:rest, 3:pause
  
  timerSettings:any;
  timerText:any;
  timeData:any;
  
  timer : any;
  pauseTimer : any;
  
  constructor(public navCtrl: NavController, public platform: Platform) {
    this.currentCycleStatus = 0;
    this.currentCycleImage = HomePage.CYCLE_IMG_PATH[0];
    this.buttonStatus = HomePage.BT_STATUS_DEFAULT;
    this.currentButtonImage = HomePage.BT_IMG_PATH[HomePage.BT_STATUS_DEFAULT];
    this.buttonText = HomePage.BT_TXT[HomePage.BT_STATUS_DEFAULT];
    this.timerSettings = {
      current : 0,
      max : 25*60,
      animation : "linearEase",
    }
    this.timerText = {
      current : "00:00",
      max : "25:00",
    }
    this.timeData = {
      todayFlowTime : 0,
      todayPauseTime : 0,
      todayFlowTimeText : "00:00",
      todayPauseTimeText : "00:00",
    }

    this.platform.registerBackButtonAction( ()=>{
      this.platform.pause;
    });
  }
  
  onButtonClick() {
    console.log('onButtonClicked');
    if(this.buttonStatus === HomePage.BT_STATUS_DEFAULT || this.buttonStatus === HomePage.BT_STATUS_PAUSE) {
      // default(첫화면)일때는 Cycle + 1
      if(this.buttonStatus === HomePage.BT_STATUS_DEFAULT) {
        this.currentCycleStatus = this.currentCycleStatus >= 9 ? 0 : this.currentCycleStatus + 1;
        this.currentCycleImage = HomePage.CYCLE_IMG_PATH[this.currentCycleStatus];
      }
      
      if(this.currentCycleStatus == 9) {
        this.buttonStatus = HomePage.BT_STATUS_REST;
        this.currentButtonImage = HomePage.BT_IMG_PATH[HomePage.BT_STATUS_REST];
        this.buttonText = HomePage.BT_TXT[HomePage.BT_STATUS_REST];
        this.timerSettings.max = 30*60;
        this.timerText.max = this.timeToText(30*60);
        clearInterval(this.pauseTimer);
        this.timer = setInterval(()=>{
          this.checkTime();
        }, 1);
      } else if(this.currentCycleStatus%2 == 1) {
        this.buttonStatus = HomePage.BT_STATUS_FLOW;
        this.currentButtonImage = HomePage.BT_IMG_PATH[HomePage.BT_STATUS_FLOW];
        this.buttonText = HomePage.BT_TXT[HomePage.BT_STATUS_FLOW];
        this.timerSettings.max = 25*60;
        this.timerText.max = this.timeToText(25*60);
        clearInterval(this.pauseTimer);
        this.timer = setInterval(()=>{
          this.checkTime();
        }, 1);
      }
    } else {
      this.buttonStatus = HomePage.BT_STATUS_PAUSE;
      this.currentButtonImage = HomePage.BT_IMG_PATH[HomePage.BT_STATUS_PAUSE];
      this.buttonText = HomePage.BT_TXT[HomePage.BT_STATUS_PAUSE];
      clearInterval(this.timer);
      this.pauseTimer = setInterval(()=>{
        this.checkPauseTime();
      }, 1000);
    }
  }
  
  /*
  Flow 또는 Rest 일 경우, 1초간격으로 current와 todayFlowTime 그 Text들을 업데이트
  */
  checkTime() {
    this.timerSettings.current++;
    this.timerText.current = this.timeToText(this.timerSettings.current);
    this.timeData.todayFlowTime++;
    this.timeData.todayFlowTimeText = this.timeToText(this.timeData.todayFlowTime);
    
    if(this.timerSettings.current >= this.timerSettings.max) {
      //timer max가 넘었으므로 0으로 셋팅(progress가 0부터 다시 시작하는 것처럼 보이기 위해서)후 text 업데이트
      this.timerSettings.max = 0;
      this.timerSettings.current = 0;
      this.timerText.current = this.timeToText(this.timerSettings.current);
      
      //cycle status와 image 업데이트
      this.currentCycleStatus = this.currentCycleStatus >= 9 ? 1 : this.currentCycleStatus + 1;
      this.currentCycleImage = HomePage.CYCLE_IMG_PATH[this.currentCycleStatus];
      
      //Flow일 경우 Rest로 status, image, text, max값, max값text 변경      
      if(this.buttonStatus === HomePage.BT_STATUS_FLOW) {
        this.buttonStatus = HomePage.BT_STATUS_REST;
        this.currentButtonImage = HomePage.BT_IMG_PATH[HomePage.BT_STATUS_REST];
        this.buttonText = HomePage.BT_TXT[HomePage.BT_STATUS_REST];
        this.timerSettings.max = 5*60;
        this.timerText.max = this.timeToText(this.timerSettings.max);
        //마지막 status는 휴식30분
      } else if(this.currentCycleStatus == 9) {
        this.buttonStatus = HomePage.BT_STATUS_REST;
        this.currentButtonImage = HomePage.BT_IMG_PATH[HomePage.BT_STATUS_REST];
        this.buttonText = HomePage.BT_TXT[HomePage.BT_STATUS_REST];
        this.timerSettings.max = 30*60;
        this.timerText.max = this.timeToText(this.timerSettings.max);
      } else {
        //Rest일 경우 Flow로 status, image, text, max값, max값text 변경
        this.buttonStatus = HomePage.BT_STATUS_FLOW;
        this.currentButtonImage = HomePage.BT_IMG_PATH[HomePage.BT_STATUS_FLOW];
        this.buttonText = HomePage.BT_TXT[HomePage.BT_STATUS_FLOW];
        this.timerSettings.max = 25*60;
        this.timerText.max = this.timeToText(this.timerSettings.max);
      }
    }
  }
  
  /*
  Pause일 경우 1초간격으로 todayPuaseTime과 Text를 업데이트.
  */
  checkPauseTime() {
    this.timeData.todayPauseTime++;
    this.timeData.todayPauseTimeText = this.timeToText(this.timeData.todayPauseTime);
  }
  
  /*
  초단위의 time값을 00:00 형식으로 전환
  */
  timeToText(time) {
    let minute = "", second = "";
    minute += time/60>>0;
    minute = minute.length < 2 ? "0".concat(minute) : minute;
    second += time%60;
    second = (second.length < 2 ? "0" : "") + second;
    return minute +":"+ second;
  }


  
}
