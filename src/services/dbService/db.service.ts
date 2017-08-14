import { Injectable, EventEmitter, Output } from '@angular/core';

declare var require: any;
const loki = require('lokijs');
const localforage = require('localforage');

@Injectable()
export class dbService {
    db: any;                        // LokiJS database
    timeDataCollection: any;        // DB's document collection object
    public static isdbLoaded : boolean;
    @Output() dbloadedEmitter = new EventEmitter();
    
    constructor() {
        this.db = new loki('flowApp.db');
        dbService.isdbLoaded = false;
        this.importAll().then((res)=>{
            if(!this.db) {
                this.db = new loki('flowApp.db');
            }
            this.timeDataCollection = this.db.getCollection('timeData');        
            if (!this.timeDataCollection) {
                this.timeDataCollection = this.db.addCollection('timeData');
            }
            dbService.isdbLoaded = true;
            this.dbloadedEmitter.emit(true);
        });
    }
    
    convertDB2Array(val) {
        return Array.from(val);
    }
    
    addDocument(timeData) {
        console.log("timeData to add: name = " + timeData.today + ", timeData = ", timeData);
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
        this.saveAll();
    }
    
    deleteDocument(timeData) {
        console.log("timeData to delete: name = " + timeData.today + ", timeData = ", timeData);
        
        // $loki is the document's index in the collection
        let timeColl = this.timeDataCollection.findOne({name: timeData.today });
        if(timeColl) {
            console.log("targeting document at collection index: " + timeColl.$loki);
            this.timeDataCollection.remove(timeColl.$loki);
        }
        this.saveAll();
    }
    
    queryTimeData(query) : Promise<any[]> {
        let results = this.timeDataCollection.chain().find({
            'name' : { '$contains' : [query] },
            'timeData' : { $gt: 30 }
        }).simplesort('name').data();
        return new Promise((resolve, reject)=> {
            if(results) {
                resolve(results);
            } else {
                reject(results);
            }
        });
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
    
    saveAll() {
        localforage.setItem('flowApp.db', JSON.stringify(this.db)).then(function (value) {
            console.log('database successfully saved');
        }).catch(function(err) {
            console.log('error while saving: ' + err);
        });
    }
    
    importAll() {
        let self = this;
        let results = localforage.getItem('flowApp.db').then(function(value) {
            console.log('the full database has been retrieved');
            self.db.loadJSON(value);
            self.timeDataCollection = self.db.getCollection('timeData');        // slight hack! we're manually reconnecting the collection variable
        }).catch(function(err) {
            console.log('error importing database: ' + err);
        });
        return Promise.resolve(results);
    }
}
