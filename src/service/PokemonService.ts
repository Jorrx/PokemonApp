import axios from "axios";
import { IPokemonReqListItem } from "../types/PokemonSliceTypes";

class PokemonService {
    async PokimonList(url: string): Promise<IPokemonReqListItem[]> {
        const res = await axios.get(url, {
            params: {
                limit: 800,
            },
        });
        if (url.includes("type")) {
            return res.data.pokemon;
        }
        return res.data.results;
    }
}

export default new PokemonService();