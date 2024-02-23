import { useCallback, useEffect, useMemo, useState } from "react";
import PokemItem from "./PokemItem";
import PokemonService from "../service/PokemonService";
import { useQuery } from "@tanstack/react-query";
import FilterPokemons from "./PokemonSortAndSearch/FilterPokemons";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setData, setFiltrationData, setScrollLimit } from "../store/PokimonSlice";

import MyLoader from "./UI/MyLoader";
import PokemonListPogination from "./pagesPogination/PokemonListPogination";
import { useScroll } from "../hooks/useScroll";
import PokemonList from "./PokemonList";

const Pokemons = () => {
    const [url, setUrl] = useState<string>("https://pokeapi.co/api/v2/pokemon/");
    const dispatch = useAppDispatch();

    const {
        isPending,
        error,
        data: queryData,
    } = useQuery({
        queryKey: [url],
        queryFn: () => PokemonService.PokimonList(url),
    });

    const {
        data: PokemonListData,
        filteredPokemonList,
        page,
        limit,
        scrollPoginationisActive,
    } = useAppSelector((state) => state.PokimonSlice);
    const { searchingValue, sortedMethod } = filteredPokemonList;

    const data = searchingValue || sortedMethod ? filteredPokemonList.data : PokemonListData;

    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
                document.documentElement.offsetHeight ||
            isPending
        ) {
            return;
        }
        dispatch(setScrollLimit());
    }, [data, scrollPoginationisActive]);

    useScroll(handleScroll, data, scrollPoginationisActive);

    useEffect(() => {
        if (!queryData?.length) return;
        dispatch(setData(queryData));
    }, [dispatch, queryData]);

    useEffect(() => {
        if ((searchingValue || sortedMethod) && queryData?.length) {
            dispatch(setFiltrationData(queryData));
        }
    }, [searchingValue, sortedMethod, queryData]);

    const paginatedData = useMemo(() => {
        return data?.length ? data?.slice((page - 1) * limit, limit * page) : [];
    }, [data, page, limit]);
    

    return (
        <>
            <h1>Pokédex</h1>
            <FilterPokemons setUrl={setUrl} />
            {searchingValue ? (
                <p style={{ marginTop: "10px" }}>
                    Showing matches for <i>"{searchingValue}"</i>
                </p>
            ) : (
                ""
            )}
            {error && error.message}
            {isPending ? (
                <MyLoader />
            ) : queryData?.length && data.length ? (
                <PokemonList paginatedData={paginatedData} />
            ) : (
                <p style={{ textAlign: "center", marginTop: "48px", fontWeight: "500" }}>
                    Nothing was found
                </p>
            )}
            {data.length && queryData?.length && !scrollPoginationisActive && data?.length > 10
                ? (
                      <PokemonListPogination lengthOfArray={data.length}/>
                  )
                : ""}
        </>
    );
};
export default Pokemons;
