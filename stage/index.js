'use strict';
//stage.js
//  This will be the View

import { $, $$ } from  'cash-js';

import model from "../model";

const onBodyLoad = () => {
  console.log("--> stage.onBodyLoad()");
  try {
    game.load();
    showUiComponent("header-component", "header");
    showUiComponent("passage-component", "welcome");
    showUiComponent("footer-component", "footer");
  } catch (err) {
    console.log("Caught exception:");
    console.log(err);
    alert("Caught exception - see console.");
  }  
  console.log("<-- stage.onBodyLoad()");
};


const saveModalComponentId = "save-modal-component";

const openSaveModal = () => {
  console.log("--> stage.openSaveModal()" );
  showUiComponent("save-modal-component", "save");
  let saveElt = document.getElementById(saveModalComponentId);

  let saves = document.getElementById("saves");
  let savesData = model.getSavesData();
  console.log("Saves data:")
  console.log(savesData);
  for (let which = 0; which < savesData.length; which++ ) {
    let saveData = savesData[which]; // saveIndex == which
    let dispWhich = which + 1;
    let p = document.createElement("p");
    let saveButton = document.createElement("button");
    saveButton.id="save-" + which;
    saveButton.innerHTML="Save " + dispWhich;
    saveButton.onclick=function () { stage.doSave(which); };
    p.appendChild(saveButton);
    let saveDateText = getSaveDateText(saveData);
    let deleteSaveButton = document.createElement("button");
    deleteSaveButton.id="delete-save-" + which;
    deleteSaveButton.innerHTML="Delete save: " + dispWhich + " made at: " + saveDateText;
    deleteSaveButton.onclick=function () { stage.deleteSave(saveData.saveIndex); };
    if ( saveData && saveData.saveDate ) {
      deleteSaveButton.disabled = false;
    } else  {
      deleteSaveButton.disabled = true;
    }
    p.appendChild(deleteSaveButton);

    saves.appendChild(p);
    saveElt.style.display = "block";
  }
  console.log("<-- stage.openSaveModal()" );
};

const getSaveDateText = (saveData) => {
  let saveDateText = "--/--/-- --:--:--";
  let date = null;
  if (saveData) { date = saveData.saveDate; }

  if (date) {
    saveDateText = ("0" + (date.getFullYear() - 2000)).slice(-2) + '/' + 
      ("0" +  (date.getMonth() + 1 )).slice(-2) + '/' + 
      ("0" + (date.getDate() + 1)).slice(-2) + ' ' + 
      ("0" + date.getHours()).slice(-2) + ":" + 
      ("0" + date.getMinutes()).slice(-2) + ":" + 
      ("0" + date.getSeconds()).slice(-2);
  }
  return saveDateText;
};

const doSave = (which) => {
  console.log("--> stage.doSave(" + which +")" );
  model.save(which);
  // no need to update display to reflect change 
  // since next step is to close the dialog
  alert("Saved in slot: " + ( which + 1) );
  closeSaveModal();
  console.log("<-- stage.doSave("+ which + ")" );
};

const deleteSave = (which) => {
  console.log("--> stage.deleteSave(" + which +")" );
 
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
    deleteSaveButton.innerHTML="Delete save: " + dispWhich + " made at: " + getSaveDateText(null);

    model.deleteSave(which);
  }
 
  console.log("<-- stage.deleteSave("+ which + ")" );
};

const cancelSaveModal = () => {
  console.log("--> stage.cancelSaveModal()" );
  closeSaveModal();
  console.log("<-- stage.cancelSaveModal()" );
};

const closeSaveModal = () => {
  console.log("--> stage.cancelSaveModal()" );
  let saveElt = document.getElementById(saveModalComponentId);
  saveElt.style.display = 'none'; // close the dialog
  console.log("<-- stage.cancelSaveModal()" );
};


const showUiComponent = (where, which) => {
  console.log("--> stage.showUiCompnent(" + where + ", " + which + ")");

  if (where == which) {
    let msg = "where must not equal which: " + where + ", " + which;
    throw new Error(msg);
  }

  let whichElt = document.getElementById(which);

  if (! whichElt ) {
    let msg = "NO SUCH PASSAGE MATCHING: " + which;
    throw new Error(msg);
  }

  let whereElt = document.getElementById(where);
  if (! whereElt ) {
    let msg = "NO SUCH DOCUMENT ENTITY MATCHING: " + where;
    throw new Error(msg);
  }

  whereElt.innerHTML = whichElt.innerHTML;


  console.log("<-- stage.showUiCompnent(" + where + ", " + which + ")");
};

exports.onBodyLoad = onBodyLoad;
exports.showPassage = showUiComponent;
exports.openSaveModal = openSaveModal;
exports.doSave = doSave;
exports.deleteSave = deleteSave;
exports.cancelSaveModal = cancelSaveModal;
