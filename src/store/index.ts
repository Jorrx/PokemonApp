import { combineReducers, configureStore } from "@reduxjs/toolkit";
import PokimonSlice from './PokimonSlice'
import PokemonItemSlice from './PokemonItemSlice'

const rootReducer = combineReducers({
    PokimonSlice,
    PokemonItemSlice,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
        
    })
}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']