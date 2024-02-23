interface IPokemonReqListItem {
    name: string;
    url: string;
}

interface IPokemonReqTypedListItem {
    pokemon: {
        name: string;
        url: string;
    };
}


export interface IPokemonStoreData {
    data:IPokemonReqTypedListItem[] | IPokemonReqListItem[] | []
}

export interface IPokemonFiltedData{
    data:IPokemonStoreData,
    sortedMethod: string,
    searchingValue: string
}