import { Injectable } from '@angular/core';

declare var require: any;
var loki = require('lokijs');


@Injectable()
export class dbService {
    db: any;                        // LokiJS database
    timeDataCollection: any;        // DB's document collection object
    
    constructor() {
        this.db = new loki('flowApp');
        this.timeDataCollection = this.db.addCollection('timeData');
    }
    
    convertDB2Array(val) {
        return Array.from(val);
    }
    
    addDocument(timeData) {
        if (!timeData.today || !timeData.todayFlowTime) {
            console.log("field is blank...");
            return;
        }
        
        this.timeDataCollection.insert({ name: timeData.today, timeData: timeData });
        
        // LokiJS is one's-based, so the final element is at <length>, not <length - 1>
        console.log("inserted document: " + this.timeDataCollection.get(length));
        console.log("robots.data.length: " + this.timeDataCollection.data.length);
    }
    
    deleteDocument($event, timeData) {
        console.log("timeData to delete: name = " + timeData.name + ", timeData = ", timeData);
        
        // $loki is the document's index in the collection
        console.log("targeting document at collection index: " + timeData.$loki);
        this.timeDataCollection.remove(timeData.$loki);
    }
    
    queryTimeData(query) : Promise<any[]> {
        let results = this.timeDataCollection.find({
            'name' : { '$contains' : [query] },
            'timeData' : { $gt: 30 }
        });
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
