import React, { FC } from "react";
interface IProp {
    children: React.ReactNode;
    classname: string;
}
const FilterTypes: FC<IProp> = ({ children, classname,...props }) => {
    const styles = classname ? ["Pokemon_Filter_Method", classname] : ["Pokemon_Filter_Method"];

    return <div className={styles.join(" ")} {...props}>{children}</div>;
};

export default FilterTypes;
