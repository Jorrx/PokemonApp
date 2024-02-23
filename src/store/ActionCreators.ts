import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPokemonItem = createAsyncThunk(
    "pokemon/fetchPokemonItem",
    async (pokemonName:string, thunkApi) => {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/`+pokemonName)
        return response.data
    }
);


export const fetchPokemonItemSpecies = createAsyncThunk(
    "pokemonItem/fetchPokemonItemSpecies",
    async (pokemonName:string, thunkApi) => {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/`+pokemonName)
        return response.data
    }
);
