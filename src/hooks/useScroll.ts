import { useEffect } from "react";


export const useScroll = (func:()=>void , data:any, scrollPoginationisActive:boolean) =>{



    useEffect(() => {
        console.log(scrollPoginationisActive)
        if (!scrollPoginationisActive) {
            window.removeEventListener("scroll", func);
            return;
        }

        func()
        window.addEventListener("scroll", func);
        return () => window.removeEventListener("scroll", func);
    }, [data, scrollPoginationisActive]);
}