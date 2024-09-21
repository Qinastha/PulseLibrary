import React, {useRef} from "react";

interface UseHideNavProps {
    onHide: () => void;
    onShow: () => void;
}

// Custom hook to handle hiding and showing navigation bar
const useHideNav = ({onHide, onShow}: UseHideNavProps) => {
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        if (touchStartX.current - touchEndX.current > 50) {
            onHide();
        }

        if (touchEndX.current - touchStartX.current > 50) {
            onShow();
        }

        touchStartX.current = 0;
        touchEndX.current = 0;
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        touchEndX.current = e.touches[0].clientX;
    };

    return {
        handleTouchStart,
        handleTouchEnd,
        handleTouchMove,
    };
};

export default useHideNav;