export const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
};

export const handleInputRound = (value: number): number => {
    return Math.round(value * 100) / 100;
}