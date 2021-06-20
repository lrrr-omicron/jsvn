'use strict';
//index.js
// This will be the model.

// The 'db' is just a javascript data structure.
// For now I'm just using localStorage to persist the serialized text.
//
import shared from '../shared';

let serialize = require('serialize-javascript');
const deserialize = (str) => {
  if (str === undefined) { return undefined; }
  if (str == null) { return null; }
  return eval(str);
};

const getSavesData = () => {
  if (localStorage.getItem("saves") == null ) {
    throw new Error("no saves in local storage");
  }
  return deserialize(localStorage.saves);
};

const initSavesSlots = (howMany) => {
  let saves = new Array(howMany);
  for ( let i = 0; i < howMany; i++) {
    saves[i] = null;
  }
  console.log("Saves:");
  console.log(saves);
  localStorage.setItem("saves", serialize(saves) );
};

const initSaveData = (saveIndex, saveDate) => {
  return {
    "saveIndex": saveIndex,
    "saveDate": saveDate 
  };
};


let db = null;

const getNewestSavedSlot = (saves) => {
  let slot = null;
  if (!saves) { return slot;}
  let latestDate = null;
  for (let i = 0; i < saves.length; i++ ) {
    let save = saves[i];
    if (save != null) {
      let saveDate = save.saveDate;
      if( !latestDate || latestDate < saveDate ) {
        latestDate = saveDate;
        slot = i;
      }
    }
  }
  return slot; 
};	

const init = () => {
  console.log("--> model.init()");
  // initialize local storage array of saves.
  if (localStorage.getItem("saves") == null ) {
    initSavesSlots(shared.SAVE_SLOTS);
  }
  console.log("<-- model.init()");
};
init();

const newDb = () => {
  console.log("--> model.newDb()");
  db = initSaveData(null,null);
  setCurrentPassage("welcome");
  console.log("<-- model.newDb()");
}

const load = (which) => {
  console.log("--> model.load(" + which + ")");
  if (which == null) {
    throw new RangeError("Null passed for save slot to load");
  }

  let saves = deserialize(localStorage.saves);
  if ( which in saves ) {
    db = saves[which];
  } else {
    let err = "Error invalid save index - did not exist: " + which;
    throw new RangeError(err);
  }
  console.log("<-- model.load(" + which + ")");
};

const save = (which) => {
  console.log("--> model.save(" + which + ")");
  if (which == null) {
    throw new Error("Null passed for save slot to load");
  }

  if (!localStorage.saves) {
    throw new Error("No existing saves");
  }

  // saves is ALL saves
  let saves = deserialize(localStorage.saves);
  console.log("Saving db into slot: " + which );

  db.saveIndex = which; 
  db.saveDate = new Date(); 
  saves[which] = db; 

  console.log("Slot " + which + "saved.");
  localStorage.saves = serialize(saves);
  console.log("<-- model.save(" + which + ")");
};

const getCurrentPassage = () => {
  return db.currentPassage;
};

const setCurrentPassage = (passage) => {
  db.currentPassage = passage;
};

const deleteSave = (which) => {
  console.log("--> model.deleteSave(" + which + ")");
  if (which == null) { throw new RangeError("Null passed for save slot to delete"); }

  if (!localStorage.saves) {
    throw new Error("No existing saves");
  }
  let saves = deserialize(localStorage.saves);
  console.log("Deleting save db from slot: " + which );

  saves[which] = null; 
  console.log("Deleted slot " + which + ".");
  localStorage.saves = serialize(saves);
  console.log("<-- model.deleteSave(" + which + ")");
};

exports.newDb = newDb;
exports.getNewestSavedSlot = getNewestSavedSlot;
exports.getSavesData = getSavesData;
exports.load = load;
exports.save = save;
exports.deleteSave = deleteSave;
exports.db = db; // the currently loaded game
exports.getCurrentPassage = getCurrentPassage; 
exports.setCurrentPassage = setCurrentPassage; 
