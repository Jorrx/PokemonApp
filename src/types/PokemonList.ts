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