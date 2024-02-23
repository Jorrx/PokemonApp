import axios from "axios";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { FC, useEffect, useState } from "react";
import { fetchPokemonItem, fetchPokemonItemSpecies } from "../../store/ActionCreators";
import MyLoader from "../UI/MyLoader";
import PokemonListItemContent from "../PokemonListItem/PokemonListItemContent";
import "./PokemonItemInfo.css";
import PokemonItemImg from "../PokemonListItem/PokemonItemImg";

interface IPokeomonItemProps {
    name: string;
}

const PokemonItemInfo: FC<IPokeomonItemProps> = ({ name }) => {
    const [pokemonInfo, setPokemonInfo] = useState({
        height: "",
        weight: 0,
    });
    const { data, PokemonSpecies,evolutionChainItems, isLoading } = useAppSelector((state) => state.PokemonItemSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!data) {
            dispatch(fetchPokemonItem(name.toLocaleLowerCase()));
        }
        if (!PokemonSpecies) {
            dispatch(fetchPokemonItemSpecies(name.toLocaleLowerCase()));
        }
        if (data) {
            const feet = (data?.height / 10) * 3.28084 + "";
            let tmp = +`${feet.split(".")[0]}.${feet.split(".")[1] * 12}`;
            console.log(tmp.toFixed(1).split(".").join(`'`));
            const height = tmp.toFixed(1).split(".").join(`'`);

            setPokemonInfo({ weight: data?.weight / 10, height });
        }
    }, [dispatch, data]);

    if (isLoading) {
        console.log("loading");
        return <MyLoader />;
    }

    console.log(PokemonSpecies?.flavor_text_entries[1]);

    return (
        <div className="PokemonPage">
            <Link to={"/"}>← Explore more Pokémon</Link>
            <div>
                <h1>
                    {data?.name} #
                    {(data?.id < 10 && `00${data.id}`) ||
                        (data?.id < 100 && `0${data.id}`) ||
                        data?.id}
                </h1>
                <div className="pokemon_item_Info">
                    <PokemonItemImg url={data?.sprites.other["official-artwork"].front_default} />
                    <div className="pokemon_item_Info_details">
                        <p>
                            {PokemonSpecies?.flavor_text_entries &&
                                PokemonSpecies?.flavor_text_entries[1]?.flavor_text.replace('' , '')}
                        </p>
                        <div>
                            <div className="pokemon_item_Info_Item">
                                <p>Height</p>
                                {data?.height &&
                                    data?.height / 10 + "m" + `(${pokemonInfo?.height})`}
                            </div>
                            <div className="pokemon_item_Info_Item">
                                <p>Weight</p>
                                {data?.height &&
                                    pokemonInfo?.weight +
                                        "kg" +
                                        `(${(pokemonInfo?.weight * 2.20462).toFixed(1)}lbs)`}
                            </div>
                            <div className="pokemon_item_Info_Item">
                                <p>Category</p>
                                {PokemonSpecies?.genera[7].genus.replace("Pokémon", "")}
                            </div>
                            <div className="pokemon_item_Info_Item">
                                <p>Types</p>
                                <PokemonListItemContent types={data?.types} />
                            </div>
                            <div className="pokemon_item_Info_Item">
                                <p>Abilities</p>

                                {data?.abilities && data.abilities[0]?.ability?.name}
                            </div>
                            <div className="pokemon_stars">
                                <p>Stars</p>

                            </div>
                        </div>
                    </div>
                </div>
                {/* {evolutionChainItems} */}
            </div>
        </div>
    );
};

export default PokemonItemInfo;
