import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createBoard = createAsyncThunk('boards/createBoard', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:9000/api/boards', payload);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Failed to create board');
    }
});

export const getBoards = createAsyncThunk('boards/getBoards', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('http://localhost:9000/api/boards');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch boards');
    }
});

const boardSlice = createSlice({
    name: 'boards',
    initialState: {
        boards: [],
        activeBoard: null,
        loading: false,
        error: null,
    },
    reducers: {
        changeActiveBoard: (state, action) => {
            state.activeBoard = state.boards.find((board) => board._id === action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createBoard.pending, (state) => {
                state.loading = true;
            })
            .addCase(createBoard.fulfilled, (state, action) => {
                state.loading = false;
                state.boards = [...state.boards, action.payload.data];
                state.activeBoard = action.payload.data;
            })
            .addCase(createBoard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getBoards.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBoards.fulfilled, (state, action) => {
                state.loading = false;
                state.boards = action.payload.items;
                state.activeBoard = action.payload.items[0] || null;
            })
            .addCase(getBoards.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { changeActiveBoard } = boardSlice.actions;
export default boardSlice.reducer;
