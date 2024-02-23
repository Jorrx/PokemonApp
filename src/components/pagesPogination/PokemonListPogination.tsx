import React, { FC, memo, useCallback, useEffect, useMemo, useState } from "react";
import { useGetPages, usePogination } from "../../hooks/usePogination";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setPage } from "../../store/PokimonSlice";
import MyBtn from "../UI/MyBtn";

interface IProp {
    lengthOfArray: number;
}
const PokemonListPogination: FC<IProp> = ({ lengthOfArray }) => {
    const { limit, page, filteredPokemonList } = useAppSelector((state) => state.PokimonSlice);
    const dispatch = useAppDispatch();
    const [pagesItems, setPagesItems] = useState<any[]>([]);

    const getAllPages = useMemo(() => {
        return usePogination(lengthOfArray, limit);
    }, [limit, lengthOfArray]);

    const pages = useMemo(() => {
        return useGetPages(getAllPages, page);
    }, [page, filteredPokemonList, lengthOfArray, limit]);

    return (
        <div className="pages">
            <div>
                <li
                    className="pages_item"
                    onClick={() => {
                        if (!(page - 1)) {
                            return;
                        } else {
                            dispatch(setPage(page - 1));
                        }
                    }}
                >
                    <MyBtn>Prev.</MyBtn>
                </li>
                {pages?.map((el) => {
                    return (
                        <li
                            key={el}
                            onClick={() => dispatch(setPage(el))}
                            className={"pages_item" + (el === page ? " active" : "")}
                        >
                            <MyBtn style={{ width: "100%", height: "100%", background: "non " }}>
                                {el}
                            </MyBtn>
                        </li>
                    );
                })}
                <li
                    className="pages_item"
                    onClick={() => {
                        if (page + 1 > getAllPages.length) {
                            return;
                        } else {
                            dispatch(setPage(page + 1));
                        }
                    }}
                >
                    <MyBtn>Next.</MyBtn>
                </li>
            </div>
        </div>
    );
};

export default memo(PokemonListPogination);
