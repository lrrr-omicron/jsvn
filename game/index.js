'use strict';
//game.js
// This will be the Controller.


import model from "../model";

const load = (whichSlot) => {
  console.log("--> game.load(" + whichSlot + ")");
  let slot = whichSlot;
  if (slot == null) {
    slot = model.getNewestSavedSlot();
  }
  if (slot != null) {
    model.load(slot);
    console.log("<-- game.load" + whichSlot + ")");
    return;
  }
  console.log("there were no saved games, creating new game" );
  newGame(); 
  console.log("<-- game.load" + whichSlot + ")");
};

const save = (whichSlot) => {
  console.log("--> game.save(" + whichSlot + ")");
  model.save(whichSlot);
  console.log("<-- game.save(" + whichSlot + ")");
};

const deleteSave = (whichSlot) => {
  console.log("--> game.deleteSave(" + whichSlot + ")");
  model.deleteSave(whichSlot);
  console.log("<-- game.deleteSave(" + whichSlot + ")");
};

const newGame = () => {
  console.log("--> game.newGame()");
  model.newDb();
  console.log("<-- game.newGame()");
};

exports.load = load;
exports.save = save;
exports.deleteSave = deleteSave;
