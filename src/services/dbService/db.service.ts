import { Injectable } from '@angular/core';

declare var require: any;
var loki = require('lokijs');


@Injectable()
export class dbService {
    db: any;                        // LokiJS database
    timeDataCollection: any;        // DB's document collection object
    
    constructor() {
        this.db = new loki('flowApp.db');
        this.timeDataCollection = this.db.getCollection('timeData');
        
        if (!this.timeDataCollection) {
            this.timeDataCollection = this.db.addCollection('timeData');
        }
    }
    
    convertDB2Array(val) {
        return Array.from(val);
    }
    
    addDocument(timeData) {
        if (timeData.today === undefined || timeData.todayFlowTime === undefined) {
            console.log("field is blank...", timeData);
            return;
        }
        
        let timeColl = this.timeDataCollection.findOne({name: timeData.today });
        if(timeColl) {
            timeColl.timeData = timeData;
            this.timeDataCollection.update(timeColl);
        } else {
            this.timeDataCollection.insert({ name: timeData.today, timeData: timeData });
        }
        
        // LokiJS is one's-based, so the final element is at <length>, not <length - 1>
        console.log("inserted document: ", this.timeDataCollection.data);
        console.log("data.length: " + this.timeDataCollection.data.length);
    }
    
    deleteDocument(timeData) {
        console.log("timeData to delete: name = " + timeData.today + ", timeData = ", timeData);
        
        // $loki is the document's index in the collection
        let timeColl = this.timeDataCollection.findOne({name: timeData.today });
        if(timeColl) {
            console.log("targeting document at collection index: " + timeColl.$loki);
            this.timeDataCollection.remove(timeColl.$loki);
        }
    }
    
    queryTimeData(query) : Promise<any[]> {
        let results = this.timeDataCollection.chain().find({
            'name' : { '$contains' : [query] },
            'timeData' : { $gt: 30 }
        }).simplesort('name').data();
        return Promise.resolve(results);
    }
    
    saveDatabase() {
        this.db.saveDatabase(function(err) {
            if (err) {
                console.log("error : " + err);
            }
            else {
                console.log("database saved.");
            }
        });
    }
}
