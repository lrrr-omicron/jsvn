'use strict';
//game.js
// This will be the Controller.


import model from "../model";
import stage from "../stage";

const load = (whichSlot) => {
  console.log("--> game.load(" + whichSlot + ")");
  let slot = whichSlot;
  if (slot == null) {
    slot = model.getNewestSavedSlot();
  }
  if (slot != null) {
    model.load(slot);
    goToPassage(model.getCurrentPassage());
    console.log("<-- game.load(" + whichSlot + ")");
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

const goToPassage = (which) => {
  console.log("--> game.goToPassage("+ which + ")");
  model.setCurrentPassage(which);
  stage.showPassage('passage-component', which);
  console.log("<-- game.goToPassage(" + which + ")");
};


exports.load = load;
exports.save = save;
exports.deleteSave = deleteSave;
exports.goToPassage = goToPassage;
