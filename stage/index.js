'use strict';
//stage.js
//  This will be the View

import { $, $$ } from  'cash-js';

import model from "../model";

const onBodyLoad = () => {
  console.log("--> stage.onBodyLoad()");
  game.load();
  showUiComponent("header-component", "header");
  showUiComponent("passage-component", "welcome");
  showUiComponent("footer-component", "footer");
  console.log("<-- stage.onBodyLoad()");
};


const fatalError = (message, code) =>  {
    let msg = "FATAL ERROR";
    if ( ! ( (code == undefined) || (code == null) ) ) {
      msg += " CODE " + code;
    }
    msg += ": <<" + message + ">>";
    console.log(msg);
    alert(msg);
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
    let dispWhich = which + 1;
    let p = document.createElement("p");
    let saveButton = document.createElement("button");
    saveButton.id="save-" + which;
    saveButton.innerHTML="Save " + dispWhich;
    saveButton.onclick=function () { stage.doSave(which); };
    p.appendChild(saveButton);
    saves.appendChild(p);
    saveElt.style.display = "block";
  }
  console.log("<-- stage.openSaveModal()" );
};

const doSave = (which) => {
  console.log("--> stage.doSave(" + which +")" );
  model.save(which);
  closeSaveModal();
  console.log("<-- stage.doSave("+ which + ")" );
};

const cancelSaveModal = () => {
  console.log("--> stage.cancelSaveModal()" );
  closeSaveModal();
  console.log("<-- stage.cancelSaveModal()" );
}

const closeSaveModal = () => {
  console.log("--> stage.cancelSaveModal()" );
  let saveElt = document.getElementById(saveModalComponentId);
  saveElt.style.display = 'none'; // close the dialog
  console.log("<-- stage.cancelSaveModal()" );
}


const showUiComponent = (where, which) => {
  console.log("--> stage.showUiCompnent(" + where + ", " + which + ")");

  if (where == which) {
    let msg = "where must not equal which: " + where + ", " + which;
    return fatalError(msg);
  }

  let whichElt = document.getElementById(which);

  if (! whichElt ) {
    let msg = "NO SUCH PASSAGE MATCHING: " + which;
    return fatalError(msg);
  }

  let whereElt = document.getElementById(where);
  if (! whereElt ) {
    let msg = "NO SUCH DOCUMENT ENTITY MATCHING: " + where;
    return fatalError(msg);
  }

  whereElt.innerHTML = whichElt.innerHTML;


  console.log("<-- stage.showUiCompnent(" + where + ", " + which + ")");
};

exports.onBodyLoad = onBodyLoad;
exports.showPassage = showUiComponent;
exports.openSaveModal = openSaveModal;
exports.doSave = doSave;
exports.cancelSaveModal = cancelSaveModal;
