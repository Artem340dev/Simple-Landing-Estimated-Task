import { OrderCreateFormData } from "@/components/forms/OrderCreateForm/order_create_form_data";
import { createSlice } from "@reduxjs/toolkit";

export type HistorySliceType = {
    history: Record<string, OrderCreateFormData>
}

const initialState: HistorySliceType = {
    history: {}
}

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        setHistory: (state, action) => {
            state.history = action.payload.history;
        },
        addData: (state, action) => {
            state.history = {...state.history, [action.payload[0]]: action.payload[1]}
        }
    }
});

export const { setHistory, addData } = historySlice.actions;
export default historySlice.reducer;