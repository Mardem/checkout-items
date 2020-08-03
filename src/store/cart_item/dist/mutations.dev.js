"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
exports.updateDrawerState = void 0;

/*
export function someMutation (state) {
}
*/
var updateDrawerState = function updateDrawerState(state, opened) {
  state.drawerState = opened;
  console.log('asd');
}; // src/store/showcase/state.js
// Always use a function to return state if you use SSR


exports.updateDrawerState = updateDrawerState;

function _default() {
  return {
    drawerState: true
  };
}