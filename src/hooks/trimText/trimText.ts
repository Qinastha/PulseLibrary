interface trimTextProps {
    title: string;
    viewportWidth: number;
    charWidthVW: number;
}

const trimText = ({title, viewportWidth, charWidthVW}: trimTextProps) => {
    const maxChars = Math.floor((viewportWidth * 0.18) / charWidthVW);
    return title.length > maxChars ? title.slice(0, maxChars) + "..." : title;
};

export default trimText