'use strict';
//stage.js
//  This will be the View

import { $, $$ } from  'cash-js';

import model from "../model";
import game from "../game";

const onBodyLoad = () => {
  console.log("--> stage.onBodyLoad()");
  try {
    game.load(null);
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
exports.showUiComponent = showUiComponent;

