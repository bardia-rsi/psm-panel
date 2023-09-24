import type { DictionaryUnion } from "@/types/Types";
import { sampleI } from "@/utils/array";
import { countConsecutiveChars, countRepeatedChars } from "@/utils/string";
import { cloneDeep, camelCase } from "lodash";

type CharTypes = "uppers" | "lowers" | "nums" | "symbols";

type Complexity = "very weak" | "weak" | "moderate" | "good" | "strong" | "unknown";

type ComplexityCamelCase = Exclude<Complexity, "very weak"> | "veryWeak";

interface Score {
    additions: {
        length: number;
        lowers: number;
        uppers: number;
        numbers: number;
        symbols: number;
    };
    deductions: {
        lettersOnly: number;
        numbersOnly: number;
        repeatedChars: number;
        consecutiveLowers: number;
        consecutiveUppers: number;
        consecutiveNumbers: number;
        consecutiveSymbols: number;
    };
}

interface Strength {
    score: number;
    details?: Score;
}

const chars: DictionaryUnion<CharTypes, string[]> = {
    uppers: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z"],
    lowers: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "x", "y", "z"],
    nums: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    symbols: ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "/", "\\", "|", "[", "]", "{", "}", "'", "\"", "`", ";", ":", "?", ".", ",", "<", ">", "~"]
};

const colors: DictionaryUnion<ComplexityCamelCase, DictionaryUnion<"bg" | "text", string>> = {
    veryWeak: { bg: "bg-red-700", text: "text-red-700" },
    weak: { bg: "bg-red-500", text: "text-red-500" },
    moderate: { bg: "bg-orange-500", text: "text-orange-500" },
    good: { bg: "bg-green-500", text: "text-green-500" },
    strong: { bg: "bg-green-700", text: "text-green-700" },
    unknown: { bg: "bg-transparent", text: "text-transparent" }
}

const generate = (length: number = 24, types: CharTypes[] = ["uppers", "lowers", "nums", "symbols"]): string => {

    if (length < 4 && length > 72) {
        return "";
    }

    const copyChars = cloneDeep(chars);
    let str = "";

    while (str.length <= length - 1) {

        const [typeIndex, type] = sampleI(types);
        const [charIndex, char] = sampleI(copyChars[type]);

        if (types.length > 1) {
            if (!chars[type].includes(str.slice(-1)) && !str.includes(char)) {

                str += char;

                copyChars[type].splice(charIndex, 1);

                if (copyChars[type].length === 0) {
                    types.splice(typeIndex, 1)
                }

            }
        } else {
            str += char;
        }
    }

    return str;
}

const strengthTester = (p: string): Strength => {

    if (p.length === 0) {
        return { score: 0 }
    }

    const charsLength = (regex: RegExp): number => p.match(regex)?.length || 0;

    const score: Score = {
        additions: {
            length: p.length * 4,
            lowers: charsLength(/[a-z]/g) === p.length ? p.length : charsLength(/[a-z]/g) * 2,
            uppers: charsLength(/[A-Z]/g) === p.length ? p.length : charsLength(/[A-Z]/g) * 2,
            numbers: charsLength(/\d/g) === p.length ? p.length : charsLength(/\d/g) * 2,
            symbols: charsLength(/[^A-Z0-9]/gi) === p.length ? p.length : charsLength(/[^A-Z0-9]/gi) * 2,
        },
        deductions: {
            lettersOnly: p.match(/[a-z]/gi)?.length === p.length ? -p.length : 0,
            numbersOnly: p.match(/\d/g)?.length === p.length ? -p.length : 0,
            repeatedChars: countRepeatedChars(p) * -2,
            consecutiveLowers: countConsecutiveChars(p, /[a-z]+/g) * -2,
            consecutiveUppers: countConsecutiveChars(p, /[A-Z]+/g) * -2,
            consecutiveNumbers: countConsecutiveChars(p, /\d+/g) * -2,
            consecutiveSymbols: countConsecutiveChars(p, /[^\da-z]+/gi) * -2
        }
    }

    const totalScore: number = Object
        .values({ ...score.additions, ...score.deductions })
        .reduce((a, b) => a + b);

    return {
        score: totalScore > 100 ? 100 : totalScore < 0 ? 0 : totalScore,
        details: score
    }

}

const complexity = (score: number): Complexity => {
    switch (true) {
        case score >= 0 && score <= 20:
            return "very weak";
        case score <= 40:
            return "weak";
        case score <= 60:
            return "moderate";
        case score <= 80:
            return "good";
        case score <= 100 || score >= 100:
            return "strong";
        default:
            return "unknown";
    }
}

const getColor = (complexity: Complexity, bg: boolean = true): string => {
    return colors[camelCase(complexity) as ComplexityCamelCase][bg ? "bg" : "text"];
}

export type { CharTypes, Complexity, ComplexityCamelCase, Strength };

export { generate, strengthTester, complexity, getColor };