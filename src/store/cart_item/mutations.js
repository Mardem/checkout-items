/*
export function someMutation (state) {
}
*/
export const updateDrawerState = (state, opened) => {
  state.drawerState = opened;
  console.log('asd');
};

// src/store/showcase/state.js
// Always use a function to return state if you use SSR
export default function() {
  return {
    drawerState: true
  };
}
