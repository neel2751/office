// // import { useReducer } from "react";
// "use client";

// export function reducer(state, action) {
//   switch (action.type) {
//     case "NEXT_PAGE":
//       return { ...state, page: state.page + 1 };
//     case "PREVIOUS_PAGE":
//       return { page: state.page - 1 };
//     default:
//       throw new Error("Unknown action type");
//   }
// }

export function clickReducer(state, action) {
  if (action.type === "get_data") {
    return { ...state, data: action.payload };
  } else if (action.type === "update_data") {
    return { ...state, data: action.payload };
  }
  throw Error("Unknown action type.");
}
