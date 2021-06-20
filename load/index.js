'use strict';
//load.js
//  This View for the load button

import { $, $$ } from  'cash-js';

import model from "../model";
import stage from "../stage";
import shared from "../shared";

const loadModalComponentId = "load-modal-component";
const openLoadModal = () => {
  console.log("--> load.openLoadModal()" );
  try {
    stage.showUiComponent(loadModalComponentId, "load");
    let loadElt = document.getElementById(loadModalComponentId);

    let loadableSaves = document.getElementById("loadable-saves");
    let savesData = model.getSavesData();
    console.log("Saves data:")
    console.log(savesData);
    for (let which = 0; which < savesData.length; which++ ) {
      let p = document.createElement("p");
      let loadButton = createLoadButton(which,savesData);
      p.appendChild(loadButton);
      loadableSaves.appendChild(p);
      loadElt.style.display = "block";
    }
  } catch (err) {
    console.log("Caught exception:");
    console.log(err);
    alert("Caught exception - see console.");
  }
  console.log("<-- load.openLoadModal()" );
};

const createLoadButton = (which,savesData) => {
  if (savesData == null) { throw new RangeError( "passed null saveData" ); }
  if (which == null) { throw new RangeError( "passed null which" ); }
  let saveData = savesData[which]; // saveIndex == which
  let dispWhich = which + 1;
  let loadButton = document.createElement("button");
  loadButton.id="load-" + which;
  let saveDateText = shared.getSaveDateText(saveData); // returns --/--/-- --:--:-- if null
  loadButton.innerHTML="Load save: " + dispWhich + " made at: " + saveDateText;
  loadButton.onclick=function () { 
    closeLoadModal();
    g.game.load(which);
  };
  if ( saveData && saveData.saveDate ) {
    loadButton.disabled = false;
  } else {
    loadButton.disabled = true;
  }
  return loadButton;
};

const cancelLoadModal = () => {
  console.log("--> load.cancelLoadModal()" );
  closeLoadModal();
  console.log("<-- load.cancelLoadModal()" );
};

const closeLoadModal = () => {
  console.log("--> load.closeLoadModal()" );
  let loadElt = document.getElementById(loadModalComponentId);
  loadElt.style.display = 'none'; // close the dialog
  console.log("<-- load.closeLoadModal()" );
};

const load = (which) => {
  console.log("--> load.load(" + which +")" );
  try {
    game.load(which);
    // no need to update display to reflect change 
    // since next step is to close the dialog
    alert("Loaded from slot: " + ( which + 1) );
    closeLoadModal();

  } catch (err) {
    console.log("Caught exception:");
    console.log(err);
    alert("Caught exception - see console.");
  }
  console.log("<-- load.load("+ which + ")" );
};



exports.openLoadModal = openLoadModal;
exports.cancelLoadModal = cancelLoadModal;
exports.load = load;

