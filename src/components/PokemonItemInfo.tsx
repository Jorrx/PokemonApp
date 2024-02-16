import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'


const ListItemQuery = async (url: string) => await axios.get(url).then((res) => {
    return res.data
})


const PokemonItemInfo = ({ name }: string) => {

    const { isPending, error, data } = useQuery({
        queryKey: ['PokimonItemUrl', name],
        queryFn: () => ListItemQuery(`https://pokeapi.co/api/v2/ability/${name}`)
    })


    console.log(data)
    // console.log(dataPokemon)
    // data.flavor_text_entries
    return (
        <div>
            {isPending ? 'Loading...' :''
                // <>
                //     <Link to={'/'}>← Explore more Pokémon</Link>
                //     <h1>{data?.name}</h1>
                //     <div>
                //         <div>

                //         </div>
                //         <div>
                //             <p>
                //                 {data?.flavor_text_entries[0]?.flavor_text}
                //             </p>
                //             <div>

                //             </div>
                //         </div>
                //     </div>
                // </>
            }
        </div>
    )
}

export default PokemonItemInfo
