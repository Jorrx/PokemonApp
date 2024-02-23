import React, { FC, memo, useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useAppDispatch } from "../../hooks/redux";
import { setPage, setSearchValue } from "../../store/PokimonSlice";
import { IPokemonReqListItem } from "../../types/PokemonSliceTypes";
import Limititems from "../LimitItems";
import TypedPokemonsList from "./TypedPokemonList";
import FilterTypes from "../UI/FilterTypes";
import Search from "../../assets/search.svg";
import "./PokemonSortAndSearch.css";
import FIlterSortItems from "./FIlterSortItems";
import SearchPokemon from "../PokemonListItem/SearchPokemon";

interface IProp {
    setUrl: React.Dispatch<React.SetStateAction<string>>;
}

const FilterPokemons: FC<IProp> = ({ setUrl }) => {
    const [open, setOpen] = useState({
        sort: false,
        typedFilter: false,
        limit: false,
    });
    const [types, setTypes] = useState<IPokemonReqListItem[]>([]);
    const [selectedTypes, setSelectedTypes] = useState("All Types");
    const dispatch = useAppDispatch();

    const [ memoizedTypes, memoizedSelectedTypes ] = useMemo(() => {
        return [types, selectedTypes];
    }, [selectedTypes, types]);

    const handleClick = useCallback(
        (el: string) => {
            const tmp = {
                sort: false,
                typedFilter: false,
                limit: false,
            };
            tmp[el] = !el ? false : open[el] ? false : true;

            setOpen({ ...tmp });
        },
        [open]
    );

    useEffect(() => {
        const closeSelects = () => {
           Object.keys(open).forEach((element:string) => {
            console.log(element , open[element] , open)
                if(open[element]){
                    handleClick("")
                }
            });
        };
        document.addEventListener("click", closeSelects);

        const getTypes = async () => {
            try {
                const result = await axios.get("https://pokeapi.co/api/v2/type");
                setTypes([
                    { url: "https://pokeapi.co/pokemon/", name: "All Types" },
                    ...result.data?.results,
                ]);
            } catch (err) {
                console.log(err);
            }
        };
        getTypes();
        return () => document.removeEventListener("click", closeSelects);
    }, [open]);

    const selectHandler = useCallback(
        (type?: any) => {
            handleClick("typedFilter");
            if (type) {
                setSelectedTypes(type.name);
                dispatch(setPage(1));
                setUrl(
                    !(type.name === "All Types") ? type.url : "https://pokeapi.co/api/v2/pokemon/"
                );
            }
        },
        [selectedTypes, open.typedFilter]
    );

    return (
        <div className={"FilterPokemons"}>
            <div className="Filter_Pokemons_search">
                <SearchPokemon />   

                <TypedPokemonsList
                    selectHandler={selectHandler}
                    types={memoizedTypes}
                    defaultValue={"All Types"}
                    selected={memoizedSelectedTypes}
                    open={open.typedFilter}
                />

                <FIlterSortItems handleClick={handleClick} open={open.sort} />
            </div>
            <Limititems handleClick={handleClick} open={open.limit} />
        </div>
    );
};

export default memo(FilterPokemons);
