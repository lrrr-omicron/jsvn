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
   alert("Caught Exception - see log.");
  }
  console.log("<-- stage.onBodyLoad()");
};


const loadModalComponentId = "load-modal-component";
const openLoadModal = () => {
  console.log("--> stage.openLoadModal()" );
  try {
    showUiComponent(loadModalComponentId, "load");
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
  console.log("<-- stage.openLoadModal()" );
};

const createLoadButton = (which,savesData) => {
  if (savesData == null) { throw new RangeError( "passed null saveData" ); }
  if (which == null) { throw new RangeError( "passed null which" ); }
  let saveData = savesData[which]; // saveIndex == which
  let dispWhich = which + 1;
  let loadButton = document.createElement("button");
  loadButton.id="load-" + which;
  let saveDateText = getSaveDateText(saveData); // returns --/--/-- --:--:-- if null
  loadButton.innerHTML="Load save: " + dispWhich + " made at: " + saveDateText;
  loadButton.onclick=function () { stage.doLoad(which); };
  if ( saveData && saveData.saveDate ) {
    loadButton.disabled = false;
  } else {
    loadButton.disabled = true;
  }
  return loadButton;
};

const saveModalComponentId = "save-modal-component";
const openSaveModal = () => {
  console.log("--> stage.openSaveModal()" );
  try {
    showUiComponent(saveModalComponentId, "save");
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
  console.log("<-- stage.openSaveModal()" );
};

const createSaveButton = (which) => {
  if (which == null) { throw new RangeError( "passed bull which" ); }
  let dispWhich = which + 1;
  let saveButton = document.createElement("button");
  saveButton.id="save-" + which;
  saveButton.innerHTML="Save " + dispWhich;
  saveButton.onclick=function () { stage.doSave(which); };
  return saveButton;
};

const createDeleteSaveButton = (which,savesData) => {
  if (savesData == null) { throw new RangeError( "passed null saveData" ); }
  if (which == null) { throw new RangeError( "passed null which" ); }
  let saveData = savesData[which]; // saveIndex == which
  let dispWhich = which + 1;
  let deleteSaveButton = document.createElement("button");
  deleteSaveButton.id="delete-save-" + which;
  let saveDateText = getSaveDateText(saveData); // returns --/--/-- --:--:-- if null
  deleteSaveButton.innerHTML="Delete save: " + dispWhich + " made at: " + saveDateText;
  deleteSaveButton.onclick=function () { stage.deleteSave(saveData.saveIndex); };
  if ( saveData && saveData.saveDate ) {
    deleteSaveButton.disabled = false;
  } else {
    deleteSaveButton.disabled = true;
  }
  return deleteSaveButton;	
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

const doLoad = (which) => {
  console.log("--> stage.doLoad(" + which +")" );
  try {
    model.load(which);
    // no need to update display to reflect change 
    // since next step is to close the dialog
    alert("Loaded from slot: " + ( which + 1) );
    closeLoadModal();

  } catch (err) {
    console.log("Caught exception:");
    console.log(err);
    alert("Caught exception - see console.");
  }
  console.log("<-- stage.doLoad("+ which + ")" );
};


const doSave = (which) => {
  console.log("--> stage.doSave(" + which +")" );
  try {
    model.save(which);
    // no need to update display to reflect change 
    // since next step is to close the dialog
    alert("Saved in slot: " + ( which + 1) );
    closeSaveModal();

  } catch (err) {
    console.log("Caught exception:");
    console.log(err);
    alert("Caught exception - see console.");
  }
  console.log("<-- stage.doSave("+ which + ")" );
};

const deleteSave = (which) => {
  console.log("--> stage.deleteSave(" + which +")" );

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
      deleteSaveButton.innerHTML="Delete save: " + dispWhich + " made at: " + getSaveDateText(null);

      model.deleteSave(which);
    }
 
  } catch (err) {
    console.log("Caught exception:");
    console.log(err);
    alert("Caught exception - see console.");
  }
  console.log("<-- stage.deleteSave("+ which + ")" );
};

const cancelLoadModal = () => {
  console.log("--> stage.cancelLoadModal()" );
  closeLoadModal();
  console.log("<-- stage.cancelLoadModal()" );
};

const closeLoadModal = () => {
  console.log("--> stage.closeLoadModal()" );
  let loadElt = document.getElementById(loadModalComponentId);
  loadElt.style.display = 'none'; // close the dialog
  console.log("<-- stage.closeLoadModal()" );
};

const cancelSaveModal = () => {
  console.log("--> stage.cancelSaveModal()" );
  closeSaveModal();
  console.log("<-- stage.cancelSaveModal()" );
};

const closeSaveModal = () => {
  console.log("--> stage.closeSaveModal()" );
  let saveElt = document.getElementById(saveModalComponentId);
  saveElt.style.display = 'none'; // close the dialog
  console.log("<-- stage.closeSaveModal()" );
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
exports.openLoadModal = openLoadModal;
exports.doSave = doSave;
exports.doLoad = doLoad;
exports.deleteSave = deleteSave;
exports.cancelSaveModal = cancelSaveModal;
exports.cancelLoadModal = cancelLoadModal;
