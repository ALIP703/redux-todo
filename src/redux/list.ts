import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface listItem {
  //   id: number;
  name: string;
}

export interface updatedItem {
  index: number;
  name: string;
}

const INITIAL_STATE = {
  itemList: [] as listItem[],
};

const listSlice = createSlice({
  name: "list",
  initialState: INITIAL_STATE,
  reducers: {
    addToList: (state, action: PayloadAction<listItem>) => {
      state.itemList.push({
        ...action.payload,
      });
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      if (action.payload > -1) {
        // only splice array when item is found
        state.itemList.splice(action.payload, 1); // 2nd parameter means remove one item only
      }
    },
    updateList: (state, action: PayloadAction<updatedItem>) => {
      state.itemList[action.payload.index].name = action.payload.name;
    },
  },
});

export const { addToList, deleteItem, updateList } = listSlice.actions;
export default listSlice.reducer;
