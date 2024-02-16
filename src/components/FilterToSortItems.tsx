import { ExpandLess, ExpandMore } from '@mui/icons-material';
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { sortData } from '../store/PokimonSlice';

interface sortFilterItems {
    [key: string]: string
}
export const sortFilterItems: sortFilterItems = {
    lowestToHightes: 'Lowest to highest number',
    HightesToLowest: 'Highest to lowest number',
    AZ: ' A-Z',
    ZA: 'Z-A',
}

const FilterToSortItems = () => {
    const [open, setOpen] = useState(false);
    const [selectedSortType, setSelectedSortType] = useState('Lowest to highest number')
    const dispatch = useAppDispatch()

    const handleClick = () => {
        setOpen(!open);
    };

    const filterSort = (type) => {
        dispatch(sortData(type))
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }} onClick={handleClick}>
                {selectedSortType}
                {open ? <ExpandLess /> : <ExpandMore />}
            </div>
            {open && Object.keys(sortFilterItems).map((el, idx) => {
                console.log(el)
                return <div onClick={() => filterSort(el)} style={{ padding: '5px 20px' }} key={el}>
                    {sortFilterItems[el]}
                </div>
            })
            }
        </div >
    )
}

export default FilterToSortItems
