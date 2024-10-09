export const validationQueryParams = (value, defaultValeue) => {
    if(!value) return defaultValeue;
    const parsedValue = Number(value);
    if(Number.isNaN(parsedValue)) return defaultValeue;
    return parsedValue;
}
