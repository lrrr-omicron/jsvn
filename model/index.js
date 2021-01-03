'use strict';
//index.js
// This will be the model.

// I'm going to just have db be a relational database with no backing or indexing or enforcement of relational-ness, or uniqueness.  Not an SQL database, just 
// a normalized database we're used to working with and which won't bite us 
// later.
// we load all the 'tables' which will be lists of javascript 'objects'.  
// we can persist the whole thing as json if we want but for now I'm just using // localStorage.

let serialize = require('serialize-javascript');
const deserialize = (str) => {
  if (str === undefined) { return undefined; }
  if (str == null) { return null; }
  return eval(str);
};

let lastSaveIndexStr = localStorage.getItem("lastSaveIndex");
let lastSaveIndex = 0;
if (lastSaveIndexStr) {
  lastSaveIndex = deserialize(lastSaveIndexStr); 
  if (!lastSaveIndex) { 
    lastSaveIndex = 0;
  }
  localStorage.lastSaveIndex = serialize(lastSaveIndex);
}



const getSavesData = () => {
  if (localStorage.getItem("saves") == null ) {
    initSavesData(4); 
  }
  return deserialize(localStorage.saves);
};

const initSavesData = (howMany) => {
  let saves = new Array(howMany);
  for ( let i = 0; i < howMany; i++) {
    saves[i] = initSaveData(i, null);
  }
  console.log("Saves:");
  console.log(saves);
  localStorage.setItem("saves", serialize(saves) );
}

const initSaveData = (saveIndex, saveDate) => {
  return {
    "saveIndex": saveIndex,
    "saveDate": saveDate 
  };
};


let db = initSaveData(lastSaveIndex,new Date());

const init = () => {
  console.log("--> model.init()");
  // initialize local storage array of saves.
  if (localStorage.getItem("saves") == null ) {
    localStorage.setItem("saves", serialize([]) );
  }
  console.log("<-- model.init()");
};


const load = (which) => {
  console.log("--> model.load(" + which + ")");
  if (which == null) {
    throw new RangeError("Null passed for save slot to load");
  }

  if (!localStorage.saves) {
    console.log("No existing saves");
    init();
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
    console.log("Null passed for save slot to load");
    init();
  }

  if (!localStorage.saves) {
    console.log("No existing saves");
    init();
  }
  let saves = deserialize(localStorage.saves);
  console.log("Saving db into slot: " + which );

  db.saveIndex = which; 
  db.saveDate = new Date(); 
  saves[which] = db; 
  lastSaveIndex = which;

  console.log("Slot " + which + "saved.");
  localStorage.saves = serialize(saves);
  localStorage.lastSavedIndex = serialize(lastSaveIndex);
  console.log("<-- model.save(" + which + ")");
};

const deleteSave = (which) => {
  console.log("--> model.deleteSave(" + which + ")");
  if (which == null) { throw new RangeError("Null passed for save slot to delete"); }

  if (!localStorage.saves) {
    console.log("No existing saves");
    init();
  }
  let saves = deserialize(localStorage.saves);
  console.log("Deleting save db from slot: " + which );

  saves[which] = null; 
  if ( lastSaveIndex == which ) {
    lastSaveIndex = null;
  } 
  console.log("Deleted slot " + which + ".");
  localStorage.saves = serialize(saves);
  localStorage.lastSavedIndex = serialize(lastSaveIndex);
  console.log("<-- model.deleteSave(" + which + ")");
};


exports.getSavesData = getSavesData;
exports.init = init;
exports.load = load;
exports.save = save;
exports.deleteSave = deleteSave;
exports.db = db; // the currently loaded game
