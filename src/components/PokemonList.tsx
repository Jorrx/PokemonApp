import { FC, memo } from "react";
import PokemItem from "./PokemItem";
import { IPokemonStoreData } from "../types/PokemonSliceTypes";

interface IProp {
    paginatedData: IPokemonStoreData;
}
const PokemonList: FC<IProp> = ({ paginatedData }) => {
    console.log(paginatedData)
    return (
        <div className="listOfPOkimons">
            {paginatedData?.map((el) => {
                return el?.pokemon?.name ? (
                    <PokemItem key={el.pokemon.name} name={el.pokemon.name} url={el.pokemon.url} />
                ) : (
                    <PokemItem key={el.name} name={el.name} url={el.url} />
                );
            })}
        </div>
    );
};

export default memo(PokemonList);
