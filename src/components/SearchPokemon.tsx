import React, { FC, useCallback, useEffect, useState } from 'react'
import { ExpandLess, ExpandMore, } from '@mui/icons-material';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setSearchValue } from '../store/PokimonSlice';
import { IPokemonReqListItem, IPokemonReqTypedListItem } from '../types/PokemonList';
import FilterToSortItems from './FilterToSortItems';

interface IProp {
    setPage: React.Dispatch<React.SetStateAction<number>>
    setUrl: React.Dispatch<React.SetStateAction<string>>
}

const SearchPokemon: FC<IProp> = ({ setUrl, setPage }) => {
    const [open, setOpen] = useState(false);
    const [types, setTypes] = useState<IPokemonReqListItem[]>([])
    const [selectedTypes, setSelectedTypes] = useState('All Types')
    const [search, setSearch] = useState<string>('')
    const dispatch = useAppDispatch()

    useEffect(() => {
        const getTypes = async () => {
            try {
                const result = await axios.get('https://pokeapi.co/api/v2/type')
                setTypes([{ url: 'https://pokeapi.co/pokemon/', name: 'All Types' }, ...result.data?.results])
            } catch (err) {
                console.log(err)
            }
        }

        getTypes()

    }, [])


    const handleClick = () => {
        setOpen(!open);
    };

    const handleSearch = () => {
        // debugger
        dispatch(setSearchValue(search))
    }

    const selectHandler = useCallback((type: any) => {
        setSelectedTypes(type.name)
        setPage(1)
        setUrl(!(type.name === 'All Types') ? type.url : 'https://pokeapi.co/api/v2/pokemon/')

    }, [selectedTypes])



    return (
        <div className='FilterPokemons'>
            <div>
                <input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSearch(e.target.value)
                }} />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div>
                <div style={{ display: 'flex', alignItems: 'center' }} onClick={handleClick}>
                    {selectedTypes}
                    {open ? <ExpandLess /> : <ExpandMore />}
                </div>
                {open && <div style={{ display: 'flex', flexWrap: 'wrap', width: '200px', }} className='filterTypes'>
                    {types.map(type =>
                        <div key={type.name} onClick={() => selectHandler(type)} style={{ width: '35%' }}>
                            {type.name}
                        </div>)
                    }
                </div>
                }
            </div>
            <FilterToSortItems />

        </div>
    )
}

export default SearchPokemon
