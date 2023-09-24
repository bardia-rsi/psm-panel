import type { Dictionary } from "@/types/Types";

export const titleCase = (v: string): string => v
    .split(" ")
    .map(w => w[0].toUpperCase() + w.slice(1))
    .join(" ");

export const countConsecutiveChars = (str: string, regex: RegExp): number => {

    // Find all substrings that match the regular expression.
    const matches: RegExpMatchArray | null = str.match(regex);

    if (!matches) {
        return 0;
    }

    // Get the length of each consecutive string
    const counts: number[] = matches.map((match) => match.length - 1);

    // Sum up the lengths of all consecutive strings
    return counts.reduce((total, count) => total + count, 0);

}

export const countRepeatedChars = (str: string): number => {

    const counts: Dictionary = {};

    for (let i: number = 0; i < str.length; i++) {
        // If the character already exists in the counts object, increment its count
        // Otherwise, add the character to the counts object with a count of 1
        counts[str[i]] ? counts[str[i]]++ : counts[str[i]] = 1;
    }

    return Object.values(counts).reduce((total, count) => total + count - 1, 0);

}