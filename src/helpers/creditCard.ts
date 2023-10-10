export const validator = (value: string): boolean => {

    value = String(value);

    let sum: number = 0;

    Array.from(value, Number).forEach((number, index) => {
        sum += ((value.length + index) % 2 === 0) && (number *= 2) > 9 ? number - 9 : number;
    });

    return sum !== 0 && sum % 10 === 0;

}