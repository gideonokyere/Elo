import * as SQLite from 'expo-sqlite';
const DB = SQLite.openDatabase("elo.db");

export function createCallTable(){
    DB.transaction((tx)=>{
        //console.log('Creating table');
        tx.executeSql(`create table if not exists calls (id INTEGER PRIMARY KEY AUTOINCREMENT,name text,number varchar(15),done int,date text)`,[],(tx,res)=>{
            //console.log('DONE Creating DB');
        },(tx,error)=>console.log(error));
        //tx.executeSql('drop database calls',[]);
    });
}


export function createTodoTable(){
    DB.transaction((tx)=>{
        tx.executeSql(`create table if not exists todos (id INTEGER PRIMARY KEY AUTOINCREMENT,todo text,done int,date text);`)
    });
}

export function createGotoTable(){
    DB.transaction((tx)=>{
        tx.executeSql(`create table if not exists gotos (id INTEGER PRIMARY KEY AUTOINCREMENT,goto text,done int,date text);`)
    });
}

export function createBuyTable(){
    DB.transaction((tx)=>{
        tx.executeSql(`create table if not exists buys (id INTEGER PRIMARY KEY AUTOINCREMENT,buy text,done int,date text);`)
    })
}

export function createVisitTable(){
    DB.transaction((tx)=>{
        tx.executeSql(`create table if not exists visits (id INTEGER PRIMARY KEY AUTOINCREMENT,visit text,done int,date text);`)
    })
}

export function createStudyTable(){
    DB.transaction((tx)=>{
        tx.executeSql(`create table if not exists studys (id INTEGER PRIMARY KEY AUTOINCREMENT,study text,done int,date text);`)
    })
}

export function createProjectTable(){
    DB.transaction((tx)=>{
        tx.executeSql(`create table if not exists projects (id INTEGER PRIMARY KEY AUTOINCREMENT,project text,done int,date text);`)
    })
}

export function createDailyTable(){
    DB.transaction((tx)=>{
        tx.executeSql(`create table if not exists dailys (id INTEGER PRIMARY KEY AUTOINCREMENT,daily text,done int,date text);`)
    })
}





export default DB;