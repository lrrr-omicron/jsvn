// main.js
'use strict';

window.g = {};

import game from "./game";
//export it to the browser.
window.g.game=game;

import stage from "./stage";
//export it to the browser.
window.g.stage=stage;

import save from "./save";
//export it to the browser.
window.g.save=save;

import load from "./load";
//export it to the browser.
window.g.load=load;

import model from "./model";
//export it to the browser.
window.g.model=model;
