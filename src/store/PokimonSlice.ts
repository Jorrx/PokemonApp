import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IPokemonReqListItem, IPokemonReqTypedListItem } from "../types/PokemonList"
import { sortFilterItems } from "../components/FilterToSortItems"

interface IPokemonSlice {
    data: any[],
    searchingValue: string,
    sortedMethod: string
}

// const filteredData: any[] | void = data.filter(el => el?.pokemon?.name ? el.pokemon.name?.includes(value) : el.name.includes(value))


const initialState: IPokemonSlice = {
    data: [],
    searchingValue: '',
    sortedMethod: ''
}

const filterItems = (data: any[], type: string) => {
    console.log(data, type)
    return [...data].sort((firstItem, secondItem) => {
        const getSortableItemId = (item: any) => {
            if (type.length < 5) {
                return item?.pokemon?.name ? item.pokemon.name.toUpperCase() : item.name.toUpperCase();
            } else {
                const url = item?.pokemon?.url || item.url;
                return url.split('/').filter(Boolean).pop();
            }
        };

        const firstItemId = getSortableItemId(firstItem);
        const secondItemId = getSortableItemId(secondItem);

        if (type === 'AZ') {
            return firstItemId.localeCompare(secondItemId);
        } else if (type === 'ZA') {
            return secondItemId.localeCompare(firstItemId);
        } else if (type === 'lowestToHightes') {
            return firstItemId - secondItemId;
        } else {
            return secondItemId - firstItemId
        }
    })
}

export const PokimonSlice = createSlice({
    name: 'pokimons',
    initialState,
    reducers: {
        setData: (state, action) => {
            let newData = action.payload;

            if (state.searchingValue) {
                newData = newData.filter(el => el?.pokemon?.name ? el.pokemon.name?.includes(state.searchingValue) : el.name.includes(state.searchingValue));
            }

            if (sortFilterItems[state.sortedMethod]) {
                newData = filterItems(newData, state.sortedMethod);
            }

            state.data = newData;
        },
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchingValue = action.payload
        },
        sortData: (state, action: PayloadAction<string>) => {
            state.sortedMethod = action.payload
        },
    }
})


export default PokimonSlice.reducer
export const { setData, setSearchValue, sortData } = PokimonSlice.actions