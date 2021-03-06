import React from "react";
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('domibros.db');

const getTeams = (setTeamsFunc) => {
  db.transaction(tx => {
    tx.executeSql('Select * from teams', [], 
    (_, {rows: {_array}}) => {
      console.log(_array)
      setTeamsFunc(_array)
    })
  },
  (t, error) => { console.log("db error load teams"); console.log(error) },
  (_t, _success) => { console.log("loaded teams")})
}

const insertTeam = (teamName, successFunc) => {
  db.transaction( tx => {
      tx.executeSql( 'insert into teams (name) values (?)', [teamName] );
    },
    (t, error) => { console.log("db error insertTeam"); console.log(error);},
    (t, success) => { successFunc() }
  )
}

const updateTeam = (teamName, wins, losses) => {
  db.transaction(tx => {
    tx.executeSql('UPDATE teams SET wins = ?, losses = ? where name = ?', [wins, losses, teamName])
  },
  (t, error) => { console.log("db error insertTeam"); console.log(error);},
  (t, success) => { console.log("updated team") }
  )
}

const getMatch = (setMatch) => {
  db.transaction(tx => {
    tx.executeSql('Select * from match', [], 
    (_, {rows: {_array}}) => {
      console.log(_array)
      setMatch(_array)
    })
  },
  (t, error) => { console.log("db error load match"); console.log(error) },
  (_t, _success) => { console.log("loaded match")})
}

const insertRound = (themScore, UsScore, successFunc) => {
  db.transaction( tx => {
      tx.executeSql( 'insert into match (them, us) values (?,?)', [themScore, UsScore] );
    },
    (t, error) => { console.log("db error insertRound"); console.log(error);},
    (t, success) => { successFunc() }
  )
}

const removeRound = (id, successFunc) => {
  db.transaction( tx => {
    tx.executeSql( 'delete from match where (id) = (?)', [id] )
  },
  (t, error) => { console.log("db error removeRound"); console.log(error);},
  (t, success) => { successFunc() })
}

const cleanMatch = (setMatch) => {
  db.transaction(tx => {
    tx.executeSql('delete from match', [], 
    (_, {rows: {_array}}) => {
      setMatch(_array)
    })
  },
  (t, error) => { console.log("db error load match"); console.log(error) },
  (_t, _success) => { console.log("loaded match")})
}

const dropDatabaseTablesAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'drop table if exists teams',
      )
      tx.executeSql(
        'drop table if exists match',
      )
    }, 
    (_, error) => { console.log("db error dropping tables"); console.log(error); reject(error) },
    (_, success) => { resolve(success)})
  })
}

const setupDatabaseAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
          'create table if not exists teams (id integer primary key not null, name text, wins integer, losses integer);'
        );
        tx.executeSql(
          'create table if not exists match (id integer primary key not null, them integer, us integer)'
        )
      },
      (_, error) => { console.log("db error creating tables"); console.log(error); reject(error) },
      (_, success) => { resolve(success)}
    )
  })
}

const setupTeamsAsync = async () => {
  return new Promise((resolve, _reject) => {
    db.transaction( tx => {
        tx.executeSql( 'insert into teams (id, name, wins, losses) values (?,?,?,?), (?,?,?,?)', [1,"Us",0,0, 2,"Them",0,0] );
      },
      (t, error) => { console.log("db error insertTeams"); console.log(error); resolve() },
      (t, success) => { resolve(success)}
    )
  })
}

export const database = {
  getTeams,
  insertTeam,
  updateTeam,
  getMatch,
  insertRound,
  removeRound,
  cleanMatch,
  setupDatabaseAsync,
  setupTeamsAsync,
  dropDatabaseTablesAsync,
}