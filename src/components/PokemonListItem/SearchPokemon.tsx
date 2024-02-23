import React, { memo, useState } from "react";
import FilterTypes from "../UI/FilterTypes";
import { useAppDispatch } from "../../hooks/redux";
import { setSearchValue } from "../../store/PokimonSlice";
import Search from "../../assets/search.svg";

const SearchPokemon = () => {
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState<string>("");

    const handleSearch = () => {
        dispatch(setSearchValue(search));
    };

    return (
        <form action="" className="Pokemon_Filter_Method search" onSubmit={(e)=>{
            e.preventDefault()
            handleSearch()
        }}>
            <input
                type="text"
                placeholder="Search by name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSearch(e.target.value);
                }}
            />
            <button type="submit">{<img src={Search} width="18px" />}</button>
        </form>
    
    );
};

export default memo(SearchPokemon);
