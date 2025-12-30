export const formatDateForInput = (dateString: string | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";

    const tzOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
}

export const formatInputToInstant = (inputValue: string): string | null => {
    if (!inputValue) return null;
    return new Date(inputValue).toISOString();
}