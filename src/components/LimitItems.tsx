import React, { FC, memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setLimit, setScrollPogination } from "../store/PokimonSlice";
import Filtered from "./PokemonFilterd/Filtered";

interface limit {
    [key: string]: number;
}
export const limitOfItems: limit = {
    "10": 10,
    "20": 20,
    "50": 50,
};
interface IProp {
    handleClick: (el: string) => void;
    open: boolean;
}

const Limititems: FC<IProp> = ({ open, handleClick }) => {
    const [visible, setVisible] = useState(false);
    const dispatch = useAppDispatch();
    const { limit, scrollPoginationisActive , page } = useAppSelector((state) => state.PokimonSlice);

    console.log(limit)
    const handlesetLimit = (el) => {
        handleClick("limit");
        if (el) {
            dispatch(setLimit(el)); 
        }
    };


    useEffect(() => {
        function updateSize() {

            if (window.innerWidth <= 769 && !scrollPoginationisActive) {
                dispatch(setScrollPogination(true));
            } else if (window.innerWidth > 769 && scrollPoginationisActive) {
                dispatch(setScrollPogination(false));
            }

            if (window.innerWidth <= 1050 && visible) {
                console.log(document.documentElement.offsetWidth);
                setVisible(false);
            } else if (window.innerWidth > 1050 && !visible) {
                setVisible(true);
                console.log(document.documentElement.offsetWidth);
            }

        }
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, [visible , scrollPoginationisActive]);

    return (
        <>
            {visible ? (
                <div className="Pokemon_Items_limit">
                    <p>Show per page:</p>
                    <Filtered
                        selected={`${limit}`}
                        item={limitOfItems}
                        data={Object.keys(limitOfItems)}
                        handleSelect={handlesetLimit}
                        open={open}
                    />
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default memo(Limititems);
