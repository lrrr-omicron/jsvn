'use strict';
//save.js
//  View for save stuff

import { $, $$ } from  'cash-js';

import model from "../model";
import game from "../game";
import stage from "../stage";
import shared from "../shared";

const saveModalComponentId = "save-modal-component";
const openSaveModal = () => {
  console.log("--> save.openSaveModal()" );
  try {
    stage.showUiComponent(saveModalComponentId, "save");
    let saveElt = document.getElementById(saveModalComponentId);

    let saves = document.getElementById("saves");
    let savesData = model.getSavesData();
    console.log("Saves data:")
    console.log(savesData);
    for (let which = 0; which < savesData.length; which++ ) {
      let p = document.createElement("p");
      let saveButton = createSaveButton(which);
      p.appendChild(saveButton);
      let deleteSaveButton = createDeleteSaveButton(which,savesData);
      p.appendChild(deleteSaveButton);

      saves.appendChild(p);
      saveElt.style.display = "block";
    }
  } catch (err) {
    console.log("Caught exception:");
    console.log(err);
    alert("Caught exception - see console.");
  }
  console.log("<-- save.openSaveModal()" );
};

const createSaveButton = (which) => {
  if (which == null) { throw new RangeError( "passed bull which" ); }
  let dispWhich = which + 1;
  let saveButton = document.createElement("button");
  saveButton.id="save-" + which;
  saveButton.innerHTML="Save " + dispWhich;
  saveButton.onclick=function () { g.save.save(which); };
  return saveButton;
};

const createDeleteSaveButton = (which,savesData) => {
  if (savesData == null) { throw new RangeError( "passed null saveData" ); }
  if (which == null) { throw new RangeError( "passed null which" ); }
  let saveData = savesData[which]; // saveIndex == which
  let dispWhich = which + 1;
  let deleteSaveButton = document.createElement("button");
  deleteSaveButton.id="delete-save-" + which;
  let saveDateText = shared.getSaveDateText(saveData); // returns --/--/-- --:--:-- if null
  deleteSaveButton.innerHTML="Delete save: " + dispWhich + " made at: " + saveDateText;
  deleteSaveButton.onclick=function () { g.save.deleteSave(saveData.saveIndex); };
  if ( saveData && saveData.saveDate ) {
    deleteSaveButton.disabled = false;
  } else {
    deleteSaveButton.disabled = true;
  }
  return deleteSaveButton;	
};

const save = (which) => {
  console.log("--> save.save(" + which +")" );
  try {
    game.save(which);
    // no need to update display to reflect change 
    // since next step is to close the dialog
    alert("Saved in slot: " + ( which + 1) );
    closeSaveModal();

  } catch (err) {
    console.log("Caught exception:");
    console.log(err);
    alert("Caught exception - see console.");
  }
  console.log("<-- save.save("+ which + ")" );
};

const deleteSave = (which) => {
  console.log("--> save.deleteSave(" + which +")" );

  try {  
    let savesData = model.getSavesData();
    if (! savesData ) { 
      throw new Error("no saves data");
    }
    let saveData = savesData[which];
    if (! saveData ) {
      throw new Error("no save data for index: " + which );
    }     

    if(confirm("Are you sure you want to delete save: " + ( which + 1 + "?") ) ) {
      let deleteSaveButtonId = "delete-save-" + which;
      let deleteSaveButton = document.getElementById(deleteSaveButtonId);
      if (! deleteSaveButton) {
        throw new Error("no such delete save button in document: " + deleteSaveButtonId );
      }

      deleteSaveButton.disabled = true;
      let dispWhich = which + 1;
      deleteSaveButton.innerHTML="Delete save: " + dispWhich + " made at: " + shared.getSaveDateText(null);

      game.deleteSave(which);
    }
 
  } catch (err) {
    console.log("Caught exception:");
    console.log(err);
    alert("Caught exception - see console.");
  }
  console.log("<-- save.deleteSave("+ which + ")" );
};

const cancelSaveModal = () => {
  console.log("--> save.cancelSaveModal()" );
  closeSaveModal();
  console.log("<-- save.cancelSaveModal()" );
};

const closeSaveModal = () => {
  console.log("--> save.closeSaveModal()" );
  let saveElt = document.getElementById(saveModalComponentId);
  saveElt.style.display = 'none'; // close the dialog
  console.log("<-- save.closeSaveModal()" );
};


exports.openSaveModal = openSaveModal;
exports.save = save;
exports.deleteSave = deleteSave;
exports.cancelSaveModal = cancelSaveModal;
