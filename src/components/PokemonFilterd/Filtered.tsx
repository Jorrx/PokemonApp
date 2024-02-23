import { FC, memo, useEffect, useRef, useState } from "react";
import FilterTypes from "../UI/FilterTypes";
import More from "../../assets/more.svg";

interface FilteredProp {
    data: any;
    item: any;
    handleSelect: (el?: string) => void;
    selected: string;
    classname?: string;
    open: boolean;
}

const Filtered: FC<FilteredProp> = ({ data, item, handleSelect, selected, classname, open }) => {
    const ref = useRef<HTMLImageElement | null>(null);

    return (
        <FilterTypes classname={open ? `active ${classname}` : `${classname}`}>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    handleSelect();
                }}
            >
                <p>{selected}</p>
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
                <div className={`Pokemon_filter_item ${classname ? classname : ""}`}>
                    {data.map((el, idx) => {
                        return (
                            <div
                                onClick={() => {
                                    handleSelect(el);
                                }}
                                key={el}
                            >
                                {item[el]}
                            </div>
                        );
                    })}
                </div>
            )}
        </FilterTypes>
    );
};

export default memo(Filtered);
