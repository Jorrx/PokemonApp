import axios from "axios";
import { FC, memo } from "react";
import { useQuery } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import MyLoader from "./UI/MyLoader";
import PokemonListItemContent from "./PokemonListItem/PokemonListItemContent";
import { useAppDispatch } from "../hooks/redux";
import { setPokemonItemData } from "../store/PokemonItemSlice";
import PokemonItemImg from "./PokemonListItem/PokemonItemImg";

interface iProp {
    name: string;
    url: string;
}

const ListItemQuery = async (url: string) =>
    await axios.get(url).then((res) => {
        return res.data;
    });

const PokemItem: FC<iProp> = ({ name, url }) => {
    const { isPending, error, data } = useQuery({
        queryKey: ["dataUrl", name],
        queryFn: () => ListItemQuery(url),
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleNavigate = () => {
        dispatch(setPokemonItemData(data));
        navigate("/pokemon/" + data?.name);
    };

    return (
        <li className="pokemon_Item">
            {error && "An error has occurred: " + error?.message}
            {isPending ? (
                    <MyLoader />
            ) : (
                <div>
                    <PokemonItemImg
                        url={data.sprites.other["official-artwork"].front_default}
                        onClick={handleNavigate}
                    />
                    <p className="pokemon_item_name">{data?.name}</p>
                    <p className="pokemon_item_id">
                        #
                        {(data?.id < 10 && `00${data.id}`) ||
                            (data?.id < 100 && `0${data.id}`) ||
                            data.id}
                    </p>
                    <PokemonListItemContent types={data?.types} />
                </div>
            )}
        </li>
    );
};

export default memo(PokemItem);
