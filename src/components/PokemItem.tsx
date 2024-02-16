import axios from 'axios'
import { FC, memo } from 'react'
import { useQuery } from '@tanstack/react-query'
import Loader from '../assets/loader.gif'
import { useNavigate } from 'react-router-dom'

interface iProp {
    name: string,
    url: string,
}

const ListItemQuery = async (url: string) => await axios.get(url).then((res) => {
    return res.data
})

const PokemItem: FC<iProp> = ({ name, url }) => {

    const { isPending, error, data } = useQuery({
        queryKey: ['dataUrl', name],
        queryFn: () => ListItemQuery(url)
    })
    const navigate = useNavigate();

    return (
        <li>
            {error && 'An error has occurred: ' + error?.message}
            {isPending ? <img src={Loader} alt="" /> :
                <div>
                    <div style={{ width: '100%', height: '142px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data?.id}.png`} alt="Pokimon Img" onClick={() => {
                            navigate('/pokemon/' + data?.name)
                        }} width='100%' />
                    </div>
                    <div>{data?.name}</div>
                    <div>#{data?.id}</div>
                    <div>{data?.types?.map((type: any) =>
                        <span key={type.type.name} style={{ marginRight: '5px' }}>{type.type.name}</span>
                    )}</div>
                </div>
            }
        </li>
    )
}

export default memo(PokemItem)

