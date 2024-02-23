import { FC, memo, useCallback, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { sortData } from "../../store/PokimonSlice";
import Filtered from "../PokemonFilterd/Filtered";

interface sortFilterItems {
    [key: string]: string;
}
export const sortFilterItems: sortFilterItems = {
    lowestToHightes: "Lowest to highest number",
    HightesToLowest: "Highest to lowest number",
    AZ: " A-Z",
    ZA: "Z-A",
};

interface Iprop {
    open: boolean;
    handleClick: (el: string) => void;
}

const FilterSortItems: FC<Iprop> = ({ open, handleClick }) => {
    const [selectedSortType, setSelectedSortType] = useState("Lowest to highest number");

    const dispatch = useAppDispatch();

    const filterSort = useCallback((type?: any) => {
        handleClick("sort");
        if (type) {
            setSelectedSortType(sortFilterItems[type]);
            dispatch(sortData(type));
        }
    },[open]);

    return (
        <>
            <Filtered
                item={sortFilterItems}
                data={Object.keys(sortFilterItems)}
                handleSelect={filterSort}
                selected={selectedSortType}
                classname={"select_sort_filter"}
                open={open}
            />
        </>
    );
};

export default memo(FilterSortItems);
