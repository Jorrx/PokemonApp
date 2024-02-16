import React, { useEffect, useMemo, useRef, useState } from 'react'
import PokemItem from './PokemItem'
import axios from 'axios'
import PokemonService from '../service/PokemonService'
import { useQuery } from '@tanstack/react-query'
import SearchPokemon from './SearchPokemon'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { setData } from '../store/PokimonSlice'

const PokemonList = () => {
    const [limit, setLimit] = useState<number>(20)
    const [page, setPage] = useState<number>(1)
    const [url, setUrl] = useState<string>('https://pokeapi.co/api/v2/pokemon/')
    const dispatch = useAppDispatch()

    const { isPending, error, data: queryData } = useQuery({
        queryKey: [url],
        queryFn: () => PokemonService.PokimonList(url)
    })
    const { data, searchingValue , sortedMethod } = useAppSelector(state => state.PokimonSlice)

    useEffect(() => {
        if (!queryData?.length) return
        console.log(url)
        dispatch(setData(queryData))
    }, [dispatch, queryData, searchingValue, url , sortedMethod])

    const paginatedData = useMemo(() => {
        return data?.length ? data?.slice((page - 1) * limit, limit * page) : []
    }, [data, page])

    return (
        <div className='pokemons'>
            <SearchPokemon setUrl={setUrl} setPage={setPage} />
            <div className="listOfPOkimons">
                {error && error.message}
                {isPending ? 'Loading...' : ''}
                {
                    data?.length && paginatedData.map((el) => {
                        return el?.pokemon?.name ? <PokemItem
                            key={el.pokemon.name}
                            name={el.pokemon.name}
                            url={el.pokemon.url} />
                            :
                            <PokemItem
                                key={el.name}
                                name={el.name}
                                url={el.url} />
                    })
                }

            </div>
            {paginatedData?.length && <>
                <button onClick={() => {
                    setPage(page - 1)
                }} disabled={!(page - 1)}>prev</button>
                <button onClick={() => {
                    setPage(page + 1)
                }}>next</button>
            </>}
        </div >
    )
}

export default PokemonList
