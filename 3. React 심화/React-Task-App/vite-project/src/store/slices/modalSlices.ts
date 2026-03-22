import { createSlice } from "@reduxjs/toolkit";

type ModalSliceState = {
  boardId: string;
  listId: string;
  task: {
    taskId: string;
    taskName: string;
    taskDescription: string;
    taskOwner: string;
  };
};

const initialState: ModalSliceState = {
  boardId: "board-0",
  listId: "list-0",
  task: {
    taskId: "task-0",
    taskName: "task 0",
    taskDescription: "task description",
    taskOwner: "John"
  }
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {}
});

export const modalReducer = modalSlice.reducer;