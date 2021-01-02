'use strict';
//index.js
// This will be the model.

// I'm going to just have db be a relational database with no backing or indexing or enforcement of relational-ness, or uniqueness.  Not an SQL database, just 
// a normalized database we're used to working with and which won't bite us 
// later.
// we load all the 'tables' which will be lists of javascript 'objects'.  
// we can persist the whole thing as json if we want but for now I'm just using // localStorage.

let serialize = require('serialize-javascript');
const deserialize = (str) => {return eval(str)};

const getSavesData = () => {
  if (localStorage.getItem("saves") == null ) {
    initSavesData(4); 
  }
  return deserialize(localStorage.saves);
};

const initSavesData = (howMany) => {
  let saves = new Array(howMany);
  localStorage.setItem("saves", serialize(saves) );
}

let db = {
  properties: {
    saveIndex: null,
    saveDate:  new Date()
  }
};

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
    console.log("Null passed for save slot to load");
    init();
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
    console.log(err);
    alert( "No save in slot: " + which + " starting new game." );
    init();
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
  saves[which] = db;
  console.log("Slot " + which + "saved.");
  localStorage.saves = serialize(saves);
  console.log("<-- model.save(" + which + ")");
};

exports.getSavesData = getSavesData;
exports.init = init;
exports.load = load;
exports.save = save;
exports.db = db; // the currently loaded game
