import React, { FC, memo, useEffect, useRef } from "react";
import More from "../../assets/more.svg";

interface ITypedPokemonsProps {
    selectHandler: (el?: string) => void;
    types: any[];
    defaultValue: string;
    selected: any;
    open: boolean;
}

const TypedPokemonsList: FC<ITypedPokemonsProps> = ({
    selectHandler,
    types,
    defaultValue,
    selected,
    open,
}) => {
    const ref = useRef<HTMLImageElement | null>(null);


    return (
        <div
            className="Pokemon_Filter_Method"
            onClick={(e: React.EventHandler<MouseEvent>) => e.stopPropagation()}
        >
            <div
                onClick={() => {
                    selectHandler();
                }}
            >
                {selected ? selected : defaultValue}
                <img
                    src={More}
                    ref={ref}
                    style={{
                        transition: ".2s ease",
                        rotate: !open ? "90deg" : "270deg",
                        width: "13.2px",
                    }}
                />
            </div>
            {open && (
                <div className="Pokemon_filter_item pokemons_filtered_by_Types">
                    {types?.map((type) => (
                        <div
                            key={type.name}
                            onClick={() => {
                                selectHandler(type);
                            }}
                        >
                            {type.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default memo(TypedPokemonsList);
