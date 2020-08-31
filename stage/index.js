'use strict';
//stage.js
//  This will be the View

import { $, $$ } from  'cash-js';


const onBodyLoad = () => {
  console.log("--> stage.onBodyLoad()");
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


const openSaveDialog = () => {
  console.log("--> stage.openSaveDialog()" );
  console.log("<-- stage.openSaveDialog()" );
};

const showUiComponent = (where, which) => {
  console.log("--> stage.showUiCompnent(" + where + ", " + which + ")");

  if (where == which) {
    let msg = "where must not equal which: " + where + ", " + which;
    return fatalError(msg);
  }

  whichElt = document.getElementById(which);

  if (! whichElt ) {
    let msg = "NO SUCH PASSAGE MATCHING: " + which;
    return fatalError(msg);
  }

  whereElt = document.getElementById(where);
  if (! whereElt ) {
    let msg = "NO SUCH DOCUMENT ENTITY MATCHING: " + where;
    return fatalError(msg);
  }

  whereElt.innerHTML = whichElt.innerHTML;


  console.log("<-- stage.showUiCompnent(" + where + ", " + which + ")");
};

exports.onBodyLoad = onBodyLoad;
exports.showPassage = showUiComponent;
exports.openSaveDialog = openSaveDialog;
