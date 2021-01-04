'use strict';
//save.js
//  View for save stuff

import { $, $$ } from  'cash-js';

const SAVE_SLOTS=8;

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

exports.getSaveDateText = getSaveDateText;
exports.SAVE_SLOTS = SAVE_SLOTS;
