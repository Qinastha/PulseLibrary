interface useTrimProps {
    title: string;
    viewportWidth: number;
    charWidthVW: number;
}

const useTrim = ({title, viewportWidth, charWidthVW}: useTrimProps) => {
    const maxChars = Math.floor((viewportWidth * 0.18) / charWidthVW);
    return title.length > maxChars ? title.slice(0, maxChars) + "..." : title;
};

export default useTrim