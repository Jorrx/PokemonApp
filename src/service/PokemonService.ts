import axios from "axios";
import { IPokemonReqListItem } from "../types/PokemonList";



class PokemonService {



    async PokimonList(url: string): Promise<IPokemonReqListItem[]> {
        const res = await axios.get(url,{
            params:{
                limit:10000
            }
        })
        if (url.includes('type')) {
            return res.data.pokemon

        }
        return res.data.results
    }
}


export default new PokemonService()