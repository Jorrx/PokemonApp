import { createSlice } from "@reduxjs/toolkit";
import { fetchPokemonItem, fetchPokemonItemSpecies } from "./ActionCreators";

interface ISlice {
    data: any | null;
    PokemonSpecies: any | null;
    evolutionChainItems:null |any
    error: string | null;
    isLoading: boolean;
}

const initialState: ISlice = {
    data: null,
    PokemonSpecies:null,
    evolutionChainItems:null,
    error: null,
    isLoading: false,
};

export const PokemonItemSlice = createSlice({
    name: "pokimons",
    initialState,
    reducers: {
        setPokemonItemData: (state, action) => {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPokemonItem.fulfilled.type, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(fetchPokemonItem.pending.type, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchPokemonItem.rejected.type, (state, action) => {
            state.error = action;
            state.isLoading = false;
        });
        builder.addCase(fetchPokemonItemSpecies.fulfilled.type, (state, action) => {
            console.log(action.payload)
            state.PokemonSpecies = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(fetchPokemonItemSpecies.pending.type, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchPokemonItemSpecies.rejected.type, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        });
    },
});

export default PokemonItemSlice.reducer;
export const { setPokemonItemData } = PokemonItemSlice.actions;
