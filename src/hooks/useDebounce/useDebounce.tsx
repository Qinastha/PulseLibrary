import { useEffect, useState } from "react";

 const useDebounce = (text: string, delay: number) => {
    const [debounce, setDebounce] = useState(text);

    // Clear the timeout when the component unmounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounce(text);
        }, delay);
        return () => clearTimeout(timer);
    }, [text, delay]);
    return debounce;
};

 export default useDebounce;